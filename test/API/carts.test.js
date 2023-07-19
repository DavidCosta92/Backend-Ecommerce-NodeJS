import supertest from "supertest";
import chai from "chai"
import assert from 'node:assert'
import { AuthorizationError } from "../../src/models/errors/authorization.error.js";
import { AuthenticationError } from "../../src/models/errors/authentication.error.js";
const expect = chai.expect

const httpClient = supertest('http://localhost:8080')

// MOCKS PARA TEST

const productDataTest = { 
    title: "productTestMocha",
    description: "soy un prod",
    code: "productTestMocha",
    price: 50,
    status: true,
    stock: 99,
    category: "varios",
    owner: "davidcst2991@gmail.com",
    thumbnails: [""]        
}

// login previo de usuario para realizar test
const mockUser = {
    first_name : "mocha1234",
    last_name : "mocha1234",
    email : "mocha1234@mocha1234.com",
    age : 10,
    password : "mocha1234"
}
const response1 = await httpClient.post("/api/users/").send(mockUser) 
const cookie = response1.headers["set-cookie"][0]
const authCookie = {
    key : cookie.split("=")[0],
    value: cookie.split("=")[1].split(";")[0]
}
const mockUserAdmin = {
    first_name : "mocha1234",
    last_name : "mocha1234",
    email : "adminCoder@coder.com",
    age : 10,
    password : "adminCod3r123"
}
const response1Admin = await httpClient.post("/api/users/").send(mockUserAdmin) 
const cookieAdmin = response1Admin.headers["set-cookie"][0]
const authCookieAdmin = {
    key : cookieAdmin.split("=")[0],
    value: cookieAdmin.split("=")[1].split(";")[0]
}
// login previo de usuario para realizar test
describe.only("Api rest", ()=>{
    describe("api/carts/", ()=>{
        describe("GET", ()=>{
            describe("Obtener todos las carts, sin estar logueado", ()=>{
               it("Retorna error de credenciales, debe estar logueado, response status Unauthorized Cod:401", async ()=>{
                    const resp = await httpClient.get("/api/carts/")
                    expect(resp.status).to.be.equal(401)                    
                    assert.rejects(async ()=>{
                        await httpClient.get("/api/carts").set("Cookie", [`${authCookie.key}=${authCookie.value}`]) ,
                        AuthenticationError
                    })
               })
            })
            describe("Obtener todos las carts, estando logueado como usuario regular", ()=>{
                it("Retorna error de credenciales, debe ser administrador, response stautus forbidden Cod:403", async ()=>{                              
                    const resp = await httpClient.get("/api/carts").set("Cookie", [`${authCookie.key}=${authCookie.value}`])    
                    expect(resp.status).to.be.equal(403)
                    assert.rejects(async ()=>{
                        await httpClient.get("/api/carts").set("Cookie", [`${authCookie.key}=${authCookie.value}`]) ,
                        AuthorizationError
                    })
                })
            })
            describe("Obtener todos las carts paginadas, estando logueado como admin", ()=>{
                it("Retorna carts, de los usuarios creados para la prueba", async ()=>{                              
                   const resp = await httpClient.get("/api/carts").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`])       
                   expect(resp.status).to.be.equal(200)
                   expect(resp.body).to.have.property("payload")
                })
            })
        })
        describe("POST", ()=>{
            describe("Agregar un producto, al carrito de un usuario logueado", ()=>{
               it("Retorna cart con producto ya agregado", async ()=>{
                    // crear un producto con un usuario admin
                    const respPostProduct = await httpClient.post("/api/products/").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`]).send(productDataTest)   
                    const respCurrentUser = await httpClient.get("/api/session/current").set("Cookie", [`${authCookie.key}=${authCookie.value}`])
                    // que usuario comun agregue a carrito
                    const cid = respCurrentUser.text.split('"cart":"')[1].split('","')[0]

                    const pid = respPostProduct.text.split('_id":"')[1].split('"}')[0]
                    const postProductToUserCart = await httpClient.post(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${authCookie.key}=${authCookie.value}`])
                    
                    expect(postProductToUserCart.status).to.be.equal(200)
                    expect(postProductToUserCart.body.products).to.not.be.empty
                    expect(postProductToUserCart.body.products[0].product._id).to.be.equal(pid)
               })
            })
        })
    })
})
