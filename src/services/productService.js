import { productRepository } from "../repositories/productRepository.js";

class ProductService{
    productRepository
    constructor(productRepository){    
        this.productRepository = productRepository; 
    }

    async getProducts(req , res , next){    
        let response ={...await this.productRepository.getProducts(req , res , next)}
        return response;
    }    
    
    async postProduct(req , res , next){
        return await this.productRepository.postProduct(req , res , next);
    }
    
    async getProductById (req , res , next){
            return await this.productRepository.getProductById(req , res , next);
    }
    
    async deleteProductByID (req , res , next){
        return await this.productRepository.deleteProductByID(req , res , next);
    }
    
    async updateProductByID (req , res , next){    
        return await this.productRepository.updateProductByID(req , res , next);
    }
    async updateStockSoldByID (req , res , next){    
        return await this.productRepository.updateStockSoldByID(req , res , next);
    }

    getMockingProducts(req , res , next){
        return this.productRepository.getMockingProducts(req , res , next);
    }

} 
export const productService = new ProductService(productRepository)