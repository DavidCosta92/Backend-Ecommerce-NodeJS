// pruebas

import mongoose from "mongoose"
import { ProductDAOMongo} from "../../src/managers/mongoose/ProductDAOMongoose.js"
import { MONGOOSE_STRING_ATLAS_TEST } from "../../src/config/config.js"
import assert from 'node:assert'

// setup => preparacion previa para ejecutar prueba
// exercise => EJECUTAR 
// tear down => Deshacer la preparacion o cualquier cambio hecho durante la prueba, el test no debe afectar al resto de las pruebas!

// describe("", ()=> { })

// para ejecutar deboi escribir => mocha test/daos/DaoMongoose.test.js  nombre de archivo y ruta desde raiz
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
const productDataTestIncompleto = { 
    stock: 99,
    category: "varios",
    owner: "davidcst2991@gmail.com",
    thumbnails: [""]        
}

const productTestSchema = new mongoose.Schema({
    title:{ type:String, unique:true, required:true},
    description:String,
    code:{ type:String, unique:true, required:true},
    price:{ type:Number, required:true, min:0}, 
    status: Boolean,
    stock:{ type:Number, required:true, min:1}, 
    category:{ type: String, enum: {   values: ['comestibles', 'varios'],
          message: '{VALUE} no es una categoria correcta, elige entre: comestibles o varios'},
        required:true}, 
    owner : { type:String, required:true},
    thumbnails:Array    
}, { versionKey: false})

const productTestModel = mongoose.model("testproducts", productTestSchema)


before(async()=>{
    await mongoose.connect(MONGOOSE_STRING_ATLAS_TEST)
})
after(async()=>{
    await mongoose.connection.collection('testproducts').deleteMany({})
    await mongoose.connection.close()
})

describe("dao mongoose", ()=> {
    describe("postProduct", ()=> {
        // camino feliz...
        describe.only("Cuando llamo a la funcion, con los datos correctos, esta deberia guardar un objeto y devolver el objeto guardado mas el ID", ()=> {
            it("devuelve el mismo objeto con ID creado y todos los campos completos", async ()=>{                                
                const productDAOMongo = new ProductDAOMongo(productTestModel)                
                const productCreated = await productDAOMongo.postProduct(productDataTest)
                assert.ok(productCreated.id , "DEBERIA TENER ID")
                assert.ok(productCreated.title == productDataTest.title , "DEBERIA TENER CAMPO title")
                assert.ok(productCreated.code == productDataTest.code, "DEBERIA TENER CAMPO code")
                assert.ok(productCreated.price == productDataTest.price, "DEBERIA TENER CAMPO price")
                assert.ok(productCreated.stock == productDataTest.stock, "DEBERIA TENER CAMPO stock") 
                assert.ok(productCreated.category == productDataTest.category, "DEBERIA TENER CAMPO category")
                assert.ok(productCreated.owner == productDataTest.owner, "DEBERIA TENER CAMPO owner")
            })
        })
        // camino triste 
        describe.only("Cuando llamo a la funcion, con campos incompletos, esta deberia fallar", ()=> {
            it("deberia fallar porque la info esta incompleta...", async ()=>{                
                const productDAOMongo = new ProductDAOMongo(productTestModel)                
                    assert.rejects(async ()=>{
                    await productDAOMongo.postProduct(productDataTestIncompleto) ,
                    mongoose.Error.ValidationError
                })
            })
        })
    })
 })

//  describe("dao mongoose", ()=> {
//     describe("getProducts", ()=> {
//         describe("Cuando llamo a la funcion, esta deberia ........ ", ()=> {
//             it("devuelve el mismo objeto sin agregar campos ni metodos nuevos", ()=>{
//                 
//             })
//         }) 
//     })
//  })
// 
//  describe("dao mongoose", ()=> {
//     describe("getProductByCode", ()=> {
//         describe("Cuando llamo a la funcion, esta deberia ........ ", ()=> {
//             it("devuelve el mismo objeto sin agregar campos ni metodos nuevos", ()=>{
//                 
//             })
//         }) 
//     })
//  })