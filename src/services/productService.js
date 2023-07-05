import { productRepository } from "../repositories/productRepository.js";
import { validateAlphanumeric } from "../models/validations/validations.js";
class ProductService{
    productRepository
    constructor(productRepository){    
        this.productRepository = productRepository; 
    }

    async getProducts(user, req, res, next){    
        let response ={...await this.productRepository.getProducts(user, req, res, next)}
        return response;
    }    
    
    async postProduct(req , res , next){
        return await this.productRepository.postProduct(req , res , next);
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
        return await this.productRepository.deleteProductByID(req , res , next);
    }
    
    async updateProductByID (req , res , next){    
        return await this.productRepository.updateProductByID(req , res , next);
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

    getMockingProducts(req , res , next){
        return this.productRepository.getMockingProducts(req , res , next);
    }

} 
export const productService = new ProductService(productRepository)