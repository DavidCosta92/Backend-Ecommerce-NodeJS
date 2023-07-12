// @ts-nocheck
// pruebas

import mongoose from "mongoose"
import { ProductDAOMongo} from "../../src/managers/mongoose/ProductDAOMongoose.js"
import { MONGOOSE_STRING_ATLAS_TEST } from "../../src/config/config.js"
import assert from 'node:assert'
import chai from "chai"
const expect = chai.expect

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
const productDAOMongo = new ProductDAOMongo(productTestModel)  

// funciones extras
async function insertDirectlyIntoMongoDb(doc, coleccion) {
    let itemSaved = await mongoose.connection.collection(coleccion).insertOne(doc)
    // delete coleccion._id
    return itemSaved
}



before(async()=>{
    await mongoose.connect(MONGOOSE_STRING_ATLAS_TEST)
})
afterEach(async()=>{
    await mongoose.connection.collection('testproducts').deleteMany({})
})
after(async()=>{
    await mongoose.connection.close()
})
describe("dao mongoose", ()=> {
    describe("postProduct", ()=> {
        describe.only("Cuando llamo a la funcion, con los datos correctos, esta deberia guardar un objeto y devolver el objeto guardado mas el ID", ()=> {
            it("devuelve el mismo objeto con ID creado y todos los campos completos", async ()=>{     
                const productCreated = await productDAOMongo.postProduct(productDataTest)
                expect(productCreated).to.have.property("id")
                expect(productCreated).to.have.property("title")
                expect(productCreated).to.have.property("code")
                expect(productCreated).to.have.property("price")
                expect(productCreated).to.have.property("stock")
                expect(productCreated).to.have.property("category")
                expect(productCreated).to.have.property("owner")
                // expect(productCreated).to.include.all.keys("_id", "title","code", "price", "stock", "category", "owner")

            })
        })
        describe.only("Cuando llamo a la funcion, con campos incompletos, esta deberia fallar", ()=> {
            it("deberia fallar porque la info esta incompleta...", async ()=>{      
                assert.rejects(async ()=>{
                    await productDAOMongo.postProduct(productDataTestIncompleto) ,
                    mongoose.Error.ValidationError
                })
                // let productError = await productDAOMongo.postProduct(productDataTestIncompleto)
                // expect(productError).to.throw(mongoose.Error.ValidationError)

            })
        })
    })
    describe("getProductByCode", ()=> {
        describe.only("Cuando llamo a la funcion, deberia devolver el objeto guardado por code", ()=> {
            it("Devuelve el objeto con code buscado", async ()=>{                                    
                await insertDirectlyIntoMongoDb(productDataTest, 'testproducts')
                const productInBd = await productDAOMongo.getProductByCode(productDataTest.code)
                assert.ok(productInBd.code == productDataTest.code)
            })
        })
        describe.only("Cuando llamo a la funcion, con un code incorrecto", ()=> {
            it("Devuelve error not found", async ()=>{                                    
                assert.rejects(async ()=> {
                    await productDAOMongo.getProductByCode(productDataTest.code) ,
                    mongoose.Error.DocumentNotFoundError
                })
            })
        })
    })
 })
