
import supertest from "supertest";
import { assert } from "chai";
import mongoose from "mongoose";
import chai from "chai"
const expect = chai.expect


const httpClient = supertest('http://localhost:8080')

describe.only("Api rest", ()=>{
    describe("/api/users/session/localRegister", ()=>{
        // beforeEach(async ()=>{
        //     await productDAOMongo
        // })
        // afterEach(async ()=>{
        //     await productDAOMongo
        // })
        describe("POST", ()=>{
             describe("Enviando los datos correctamente, intentar crear un nuevo usuario y quedar registrado", ()=>{
                it("Retorna credenciales de usuario logueado????? ", async ()=>{
                    const mockUser = {
                        first_name : "mocha1234",
                        last_name : "mocha1234",
                        email : "mocha1234@mocha1234.com",
                        age : 10,
                        password : "mocha1234"
                    }
                    const resp = await httpClient.post("/api/users/session/localRegister").send(mockUser)

                    console.log("/////// estoy recibiendo set-cooki? ///////// ")
                    
                    const cookie = resp.headers["set-cookie"]
                    // expect(cookie).to.be.ok

                    console.log(cookie) // => me muestra esto: 'connect.sid=s%3AaXW_CJEt-bICxIoKFM_BOsWbxm3WQyDk.jB81UCFtSVnqqovDoeLrj2a5peMF7eaAyIQSbYW2rMI; Path=/; HttpOnly' Esta bien?
                    // por otro lado, estoy usando la bd de produccion, al levantar el server deberia ponerlo en otra base de datos!
                    console.log("/////// estoy recibiendo set-cooki? ////////// ")

                    // expect(resp.status).to.be.equal(403)
                    // expect(resp.text).to.be.equal('{"errorMessage":"Debes estar logueado para ver el recurso"}')
                })
            })
//             describe("Enviando los datos con un usuario que ya existe, intentar crear un nuevo usuario y quedar registrado", ()=>{
//                 it("Retorna error................................................................................", async ()=>{
//                     const mockUser = {
//                         first_name : "mocha123",
//                         last_name : "mocha123",
//                         email : "mocha123@mocha123.com",
//                         age : 10,
//                         password : "mocha123"
//                     }
//                     // Esta linea esta duplicada para que el usuario se creee y luego intente crearse de nuevo con los mismos datos!
//                     const resp1 = await httpClient.post("/api/users/session/localRegister").send(mockUser)
//                     const resp2 = await httpClient.post("/api/users/session/localRegister").send(mockUser)
// 
//                     console.log("/////// estoy recibiendo productos ///////// ")
//                     console.log(resp2.body)
//                     console.log("/////// estoy recibiendo productos ///////// ")
//                     
//                     expect(resp2.status).to.be.equal(403)
//                     expect(resp2.text).to.be.equal('{"errorMessage":"Debes estar logueado para ver el recurso"}')
//                 })
//             })
         })
    })
})