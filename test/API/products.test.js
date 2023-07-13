
import supertest from "supertest";
import { assert } from "chai";
import mongoose from "mongoose";
import { ProductDAOMongo } from "../../src/managers/mongoose/ProductDAOMongoose.js";
import chai from "chai"
const expect = chai.expect

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

const httpClient = supertest('http://localhost:8080')

describe.only("Api rest", ()=>{
    describe("api/products/", ()=>{
        // beforeEach(async ()=>{
        //     await productDAOMongo
        // })
        // afterEach(async ()=>{
        //     await productDAOMongo
        // })
        describe("GET", ()=>{
            // lo podre proobar apenas pueda loguearme
            
//             describe("Obtener todos los productos paginados, estando logueado", ()=>{
//                 it("Retorna productos", async ()=>{
//                     const productDataTest = { 
//                         title: "productTestMocha",
//                         description: "soy un prod",
//                         code: "productTestMocha",
//                         price: 50,
//                         status: true,
//                         stock: 99,
//                         category: "varios",
//                         owner: "davidcst2991@gmail.com",
//                         thumbnails: [""]        
//                    }
//                    await productDAOMongo.postProduct(productDataTest)
//                    const resp = await httpClient.get("/api/products/")
//
//                    console.log("/////// estoy recibiendo productos ///////// ")
//                    console.log(resp.body)
//                    console.log("/////// estoy recibiendo productos ///////// ")
//                    
//                    expect(resp.status).to.be.equal(200)
//                    expect(resp.body).to.have.property("payload")
//                 })
//             })
             describe("Obtener todos los productos, sin estar logueado", ()=>{
                it("Retorna error de credenciales Cod:403", async ()=>{
                     const resp = await httpClient.get("/api/products/")
                     expect(resp.status).to.be.equal(403)
                     expect(resp.text).to.be.equal('{"errorMessage":"Debes estar logueado para ver el recurso"}')
                })
            })
        })
    })
})