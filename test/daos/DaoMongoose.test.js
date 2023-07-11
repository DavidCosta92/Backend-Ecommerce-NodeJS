// pruebas

import { productDAOMongo } from "../../src/managers/mongoose/ProductDAOMongoose"

// setup => preparacion previa para ejecutar prueba
// exercise => EJECUTAR 
// tear down => Deshacer la preparacion o cualquier cambio hecho durante la prueba, el test no debe afectar al resto de las pruebas!

// describe("", ()=> { })

// para ejecutar deboi escribir => mocha test/daos/DaoMongoose.test.js  nombre de archivo y ruta desde raiz

describe("dao mongoose", ()=> {
    describe("postProduct", ()=> {
        describe("Cuando llamo a la funcion, esta deberia guardar un objeto y devolver el objeto guardado", ()=> {
            it("devuelve el mismo objeto sin agregar campos ni metodos nuevos", ()=>{
                //const productDAOMongoo = productDAOMongo
                //
                //
                //
                //
                //
                //
            })
        }) 
    })
 })

 describe("dao mongoose", ()=> {
    describe("getProducts", ()=> {
        describe("Cuando llamo a la funcion, esta deberia ........ ", ()=> {
            it("devuelve el mismo objeto sin agregar campos ni metodos nuevos", ()=>{
                
            })
        }) 
    })
 })

 describe("dao mongoose", ()=> {
    describe("getProductByCode", ()=> {
        describe("Cuando llamo a la funcion, esta deberia ........ ", ()=> {
            it("devuelve el mismo objeto sin agregar campos ni metodos nuevos", ()=>{
                
            })
        }) 
    })
 })