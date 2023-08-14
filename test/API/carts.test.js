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
const productDataTestB = { 
    title: "productTestMochaB",
    description: "soy un prod B",
    code: "productTestMochaB",
    price: 500,
    status: true,
    stock: 99,
    category: "varios",
    owner: "davidcst2991B@gmail.com",
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
                    // preparacion previa de test, login previo de usuario 
                    const mockUserCliente = {
                        first_name : "cliente123",
                        last_name : "cliente123",
                        email : "cliente123@cliente123.com",
                        age : 10,
                        password : "cliente123"
                    }
                    const responseUser = await httpClient.post("/api/users/").send(mockUserCliente) 
                    const cookieCliente = responseUser.headers["set-cookie"][0]
                    const authCookieCliente = {
                        key : cookieCliente.split("=")[0],
                        value: cookieCliente.split("=")[1].split(";")[0]
                    }
                    // crear un producto con un usuario admin
                    const respPostProduct = await httpClient.post("/api/products/").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`]).send(productDataTest)   
                    const respCurrentUser = await httpClient.get("/api/session/current").set("Cookie", [`${authCookieCliente.key}=${authCookieCliente.value}`])
                    // que usuario comun agregue a carrito
                    const cid = respCurrentUser.text.split('"cart":"')[1].split('","')[0]
    
                    const pid = respPostProduct.text.split('_id":"')[1].split('"}')[0]
                    const postProductToUserCart = await httpClient.post(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${authCookieCliente.key}=${authCookieCliente.value}`])
                    expect(postProductToUserCart.status).to.be.equal(200)
                    expect(postProductToUserCart.body.products).to.not.be.empty
                    expect(postProductToUserCart.body.products[0].product._id).to.be.equal(pid)
               })
            })
        })
    })
    describe("api/carts/{cid}/purchase", ()=>{
        describe("GET", ()=>{
            describe("Agregar un producto, al carrito de un usuario logueado y luego comprar dicho carrito", ()=>{
                it("Retorna ticket de compra, con los campos purcharser, code, date, amount, accepted y rejected products, con los valores correctos", async ()=>{
                     // crear un producto con un usuario admin
                     const respPostProduct = await httpClient.post("/api/products/").set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`]).send(productDataTestB)   
                     const respCurrentUser = await httpClient.get("/api/session/current").set("Cookie", [`${authCookie.key}=${authCookie.value}`])

                     // que usuario comun agregue a carrito
                     const cid = respCurrentUser.text.split('"cart":"')[1].split('","')[0] 
                     const pid = respPostProduct.text.split('_id":"')[1].split('"}')[0]
                     const productQuantity = 5
                     await httpClient.post(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`).set("Cookie", [`${authCookie.key}=${authCookie.value}`])
                     
                     //comprar carrito del usuario que esta logueado
                     const purchase = await httpClient.get(`/api/carts/${cid}/purchase/`).set("Cookie", [`${authCookie.key}=${authCookie.value}`])

                     // verificar compra correcta
                     expect(purchase.status).to.be.equal(200)
                     expect(purchase.body.amount).to.be.equal(productDataTestB.price * productQuantity)
                     expect(purchase.body.purcharser).to.be.equal(mockUser.email)
                     expect(purchase.body.acceptedProds.length).to.be.greaterThan(0)
                     expect(purchase.body.rejectedProds.length).to.be.equal(0)
                     expect(purchase.body.acceptedProds[0].quantity).to.be.equal(productQuantity)
                     expect(purchase.body.user.email).to.be.equal(mockUser.email)
                     expect(purchase.body.code).to.be.ok
                     expect(purchase.body.purchase_datetime).to.be.ok
                    // verificar que el stock del producto se modifico correctamente
                    const productById = await httpClient.get(`/api/products/${pid}`).set("Cookie", [`${authCookieAdmin.key}=${authCookieAdmin.value}`])
                    expect(productById.body.stock).to.be.equal(productDataTestB.stock - productQuantity)
                     
                })
             })
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
    })
})
