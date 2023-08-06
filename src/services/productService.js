// @ts-nocheck
import { productRepository } from "../repositories/productRepository.js";
import { validateAlphanumeric } from "../models/validations/validations.js";
import { Product } from "../models/Product.js";
import { RegisterErrorAlreadyExistCodeProduct } from "../models/errors/register.error.js";
import { faker } from '@faker-js/faker'
import { userSessionService } from "./sessionService.js";
import { NotFoundError } from "../models/errors/carts.error.js";
import { emailService } from "../utils/email.service.js";

class ProductService{
    productRepository
    constructor(productRepository){    
        this.productRepository = productRepository; 
    }
    async getProducts(req, next){    
        try {            
            const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
            const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page   
            const category = req.query.category
            const stock = req.query.stock
            const sort = req.query.sort
            const user = userSessionService.getLoguedUser(req)  
            let response = await this.productRepository.getProducts(queryLimit , queryPage, category, stock, sort)
            
            for (let i = 0; i < response.payload.length; i++) {
                if(response.payload[i].owner === user.email){
                    response.payload[i]["userIsOwner"] = true
                }
                if(user.role === "admin"){
                    response.payload[i]["userIsAdmin"] = true
                }
            }
            return response
        } catch (error) {
            next(error)
        }
    }        
    async postProduct(req , res , next){
        try {
            const {title, description, category, thumbnails , owner} = req.body; 
            const price = parseInt(req.body.price);
            const stock = parseInt(req.body.stock);
            const code = await this.validateProductCode(req.body.code, next)
            const newProduct = new Product ({title, description , code, price, stock, category, thumbnails, owner}).getAllAttr()
            return await this.productRepository.postProduct(newProduct)            
        } catch (error) {
            next(error)
        }        
    }
    async getProductByCode(code){
        try {
            return await this.productRepository.getProductByCode(code);
        } catch (error) {
            next(error)
        }
    }
    async validateProductCode(code,next){
        try {
            if (await this.getProductByCode(code)) throw new RegisterErrorAlreadyExistCodeProduct("Codigo de producto ya existe")
            return code
        } catch (error) {
            next(error)
        }
    }    
    async getProductById (req , res , next){
        try {
            const pid = validateAlphanumeric("Product ID",req.params.pid)
            return await this.productRepository.getProductById(pid);
        } catch (error) {                                 
            next(error)
        }            
    }
    async deleteProductByID (req , res , next){
        try {
            const loguedUser = userSessionService.getLoguedUser(req , res ,next)
            const pid = validateAlphanumeric("Product ID",req.params.pid)
            const deleteOp = await this.productRepository.deleteProductByID(pid);
            const templateEmail = `<h4>hola! </h4>  
                <p>Nos comunicamos para avisarte que tuvimos que eliminar tu producto nombre: <b>${deleteOp.title}</b>, ID:${deleteOp.id} , por infringir las politicas de la empresa. </p>  
                <h4>¡Que tengas un excelente dia, saludos! </h4> `
            
            if(deleteOp.owner != loguedUser?.email) await emailService.sendHtmlEmail( deleteOp.owner , templateEmail , "Alerta de producto eliminado")
            return             
        } catch (error) {
            next(error)
        }
    } 
    async editProductsByID (req , res , next){
        try {
            const pid = validateAlphanumeric("Product ID",req.params.pid)
            const originalProduct = await this.getProductById(req , res , next)

            const {title, description, category, thumbnails , owner} = req.body; 
            const price = parseInt(req.body.price);
            const stock = parseInt(req.body.stock);
            const code = await this.validateProductCode(req.body.code, next)

            let newProduct = {
                title : title? title : originalProduct.title ,
                description : description? description : originalProduct.description ,
                category : category? category : originalProduct.category ,
                thumbnails : thumbnails? thumbnails : originalProduct.thumbnails ,
                owner : owner? owner : originalProduct.owner ,
                price : price? price : originalProduct.price ,
                stock : stock? stock : originalProduct.stock ,
                code : code? code : originalProduct.code 
            }
            const productEdited = new Product (newProduct).getAllAttr()
            return await this.productRepository.editProductsByID(pid, productEdited)
        } catch (error) {
            next(error)
        }
    }
    async updateStockSoldByID (pid, quantity , req , res , next){   
        try {
            let product = await this.productRepository.getProductById(pid)
            product.stock -= quantity
            await this.productRepository.replaceOneProduct(pid, product)
        } catch (error) {
            next(error)
        }
    }
    getMockingProducts(req , next){
        try {
            let quantity = req.params.quantity !== undefined? req.params.quantity : 100
        
            let mockingProducts = []
            for (let i = 0; i < quantity; i++) {
                mockingProducts.push(this.createProductMock())
              }   
            return mockingProducts     
        } catch (error) {
            next(error)
        }
    }
    createProductMock(){
        const newProduct = new Product({
            title : faker.commerce.productName(),
            description : faker.commerce.productAdjective(), 
            code : faker.string.uuid(), 
            price : parseFloat(faker.commerce.price({ min: 1, dec: 2 })), 
            stock : faker.number.int({ min:1 , max:100 }), 
            category : "varios",//faker.commerce.department(), 
            thumbnails : "" 
        })
        return newProduct.getAllAttr()
    }
} 
export const productService = new ProductService(productRepository)