import supertest from "supertest";
import chai from "chai"
import assert from 'node:assert'
import { AuthenticationError } from "../../src/models/errors/authentication.error.js";
const expect = chai.expect

const httpClient = supertest('http://localhost:8080')

describe.only("Api rest", ()=>{
    describe("api/products/", ()=>{
        describe("POST - GET", ()=>{
            describe("Obtener todos los productos paginados, estando logueado", ()=>{
                it("Retorna productos", async ()=>{                              
                   const resp = await httpClient.get("/api/products").set("Cookie", [`${authCookie.key}=${authCookie.value}`])                           
                   expect(resp.status).to.be.equal(200)
                   expect(resp.body).to.have.property("payload")
                })
            })
            describe("Obtener todos los productos, sin estar logueado", ()=>{
               it("Retorna error de credenciales , response status Unauthorized Cod:401", async ()=>{
                    const resp = await httpClient.get("/api/products/")
                    expect(resp.status).to.be.equal(401)
                    assert.rejects(async ()=>{
                        await httpClient.get("/api/products/") ,
                        AuthenticationError
                    })
               })
            })
            describe("Crear producto estando logueado como admin", ()=>{
                it("Crea producto y lo retorna", async ()=>{                              
                    const respPostProduct = await httpClient.post("/api/products/").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`]).send(productDataTest)   
                    expect(respPostProduct.text).to.have.string("_id")
                    expect(respPostProduct.text).to.have.string(`${productDataTest.title}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.description}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.code}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.price}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.stock}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.category}`)
                    expect(respPostProduct.text).to.have.string(`${productDataTest.owner}`)
                })
            })
            describe("Crear producto estando logueado como admin y lo busca por ID", ()=>{
                it("Crea producto y lo retorna", async ()=>{                              
                    const respPostProduct = await httpClient.post("/api/products/").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`]).send(productDataTest)   
                    const productCreatedID = respPostProduct.text.split('_id":"')[1].split('"}')[0]
                    const respGetProdById= await httpClient.get(`/api/products/${productCreatedID}`).set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`])  
                    expect(respGetProdById["_body"]._id).to.have.string(productCreatedID)
                })
            })
        })
    })
})

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