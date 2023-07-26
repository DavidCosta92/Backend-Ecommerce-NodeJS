import supertest from "supertest";
import chai from "chai"

const expect = chai.expect

const httpClient = supertest('http://localhost:8080')

describe.only("Upload images", ()=>{
    describe("api/users/:uid/documents/product", ()=>{
        describe("POST - GET", ()=>{
            describe("Subir imagen de producto, estando logueado", ()=>{
                it("Retorna productos", async ()=>{                       
                    const filename = "fotoPrueba.png"
                    const path =  `./test/resources/${filename}`       
                    const resp = await httpClient.post(`/api/users/${loguedUser.body._id}/documents/product`).set("Cookie", [`${authCookie.key}=${authCookie.value}`]).attach('productPhoto', path)                
                    expect(resp.status).to.be.equal(201)
                })
            })
            describe("Subir imagen de producto, sin estar logueado", ()=>{
                it("Retorna productos", async ()=>{                       
                    const filename = "fotoPrueba.png"
                    const path =  `./test/resources/${filename}`       
                    const resp = await httpClient.post(`/api/users/${loguedUser.body._id}/documents/product`).attach('productPhoto', path)               
                    expect(resp.body.errorMessage).to.be.equal("Debes estar logueado para ver el recurso")
                    expect(resp.status).to.be.equal(401)
                })
            })
        })
    })
})

// MOCKS PARA TEST login previo de usuario para realizar test
const mockUser = {
    first_name : "mocha1234",
    last_name : "mocha1234",
    email : "mocha1234@mocha1234.com",
    age : 10,
    password : "mocha1234"
}
const register = await httpClient.post("/api/users/").send(mockUser) 
const cookie = register.headers["set-cookie"][0]
const authCookie = {
    key : cookie.split("=")[0],
    value: cookie.split("=")[1].split(";")[0]
}
const loguedUser = await httpClient.get("/api/session/current").set("Cookie", [`${authCookie.key}=${authCookie.value}`])      
