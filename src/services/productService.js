import { productRepository } from "../repositories/productRepository.js";

class ProductService{
    productRepository
    constructor(productRepository){    
        this.productRepository = productRepository; 
    }

    async getProducts (req, res , next){    
        let response ={...await this.productRepository.getProducts(req, next)}
        return response;
    }    
    
    async postProduct (req, res , next){
        return await this.productRepository.postProduct(req,next);
    }
    
    async getProductById (pid, next){
            return await this.productRepository.getProductById(pid,next);
    }
    
    async deleteProductByID (pid, next){
        return await this.productRepository.deleteProductByID(pid,next);
    }
    
    async updateProductByID (pid, next){    
        return await this.productRepository.updateProductByID(pid,next);
    }
    async updateStockSoldByID (pid, quantity, next){    
        return await this.productRepository.updateStockSoldByID(pid, quantity,next);
    }

} 
export const productService = new ProductService(productRepository)