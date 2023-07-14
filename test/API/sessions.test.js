import supertest from "supertest";
import chai from "chai"
const expect = chai.expect

const httpClient = supertest('http://localhost:8080')

const mockUser = {
    first_name : "mocha1234",
    last_name : "mocha1234",
    email : "mocha1234@mocha1234.com",
    age : 10,
    password : "mocha1234"
}

describe.only("Api rest", ()=>{
    describe("/api/users/", ()=>{
        describe("POST - GET de usuarios", ()=>{
            describe("Enviando los datos correctamente, intentar registrar un nuevo usuario y quedar logueado", ()=>{
                it("Retorna cookie con token", async ()=>{
                    const response = await httpClient.post("/api/users/").send(mockUser)           
                    const cookie = response.headers["set-cookie"][0]
                    const authCookie = {
                        key : cookie.split("=")[0],
                        value: cookie.split("=")[1].split(";")[0]
                    }
                    expect(authCookie.key).to.be.equal("authToken")
                    expect(authCookie.value).to.be.ok
                })
            })
            describe("Enviando los datos con un usuario que ya existe, intentar crear un nuevo usuario ", ()=>{
                 it("Retorna error de usuario existente", async ()=>{
                     // Esta linea esta duplicada para que el usuario se creee y luego intente crearse de nuevo con los mismos datos!
                    const response1 = await httpClient.post("/api/users/").send(mockUser) 
                    const response2 = await httpClient.post("/api/users/").send(mockUser) 
                    expect(response2.statusCode).to.be.equal(409)
                    expect(response2.text).to.be.equal('{"errorMessage":"Error de registro, usuario YA EXISTE"}')
                 })
            })
            describe("Enviando los datos correctamente, intentar registrar un nuevo usuario, quedo logueado y permite ver los productos", ()=>{
                it("Retorna un payload de productos", async ()=>{
                   const response1 = await httpClient.post("/api/users/").send(mockUser) 
                   const cookie = response1.headers["set-cookie"][0]
                   const authCookie = {
                       key : cookie.split("=")[0],
                       value: cookie.split("=")[1].split(";")[0]
                   }
                   const response2 = await httpClient.get("/api/products").set("Cookie", [`${authCookie.key}=${authCookie.value}`])
                   expect(response2["_body"]).to.have.property("payload")
                })
            })
            describe("Enviando los datos correctamente, intentar registrar un nuevo usuario, quedo logueado y puedo ver el usuario actual", ()=>{
                it("Retorna current user", async ()=>{
                    const response1 = await httpClient.post("/api/users/").send(mockUser) 
                    const cookie = response1.headers["set-cookie"][0]
                    const authCookie = {
                        key : cookie.split("=")[0],
                        value: cookie.split("=")[1].split(";")[0]
                    }
                    const response2 = await httpClient.get("/api/session/current").set("Cookie", [`${authCookie.key}=${authCookie.value}`])
                    expect(response2.statusCode).to.be.equal(200)
                    expect(response2.text).to.have.string(`${mockUser.email}`)
                    expect(response2.text).to.have.string(`${mockUser.first_name}`)
                })
            })
        })
    })
})