import { productDAOMongo } from "../managers/mongoose/ProductDAOMongoose.js"

class ProductRepository{
    productDao

    constructor (productDao){
        this.productDao = productDao
    }   
    
    async getProducts (req, res , next){    
        let response ={...await this.productDao.getProducts(req , res , next)}
        return response;
    }    
    
    async postProduct (req, res , next){
        return await this.productDao.postProduct(req, res ,next);
    }
    
    async getProductById (req , res , next){
            return await this.productDao.getProductById(req , res , next);
    }
    
    async deleteProductByID (req , res , next){
        return await this.productDao.deleteProductByID(req , res , next);
    }
    
    async updateProductByID (req , res , next){    
        return await this.productDao.updateProductByID(req , res , next);
    }
    
    async updateStockSoldByID(req , res , next){
        return await this.productDao.updateStockSoldByID(req , res , next)
    }
    getMockingProducts(req , res , next){
        return this.productDao.getMockingProducts(req , res , next)
    }
}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export const productRepository = new ProductRepository(productDAOMongo)