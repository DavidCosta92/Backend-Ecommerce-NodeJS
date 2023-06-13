import { productDAOMongo } from "../managers/mongoose/ProductDAOMongoose.js"

class ProductRepository{
    productDao

    constructor (productDao){
        this.productDao = productDao
    }   
    
    async getProducts (req, res , next){    
        let response ={...await this.productDao.getProducts(req, next)}
        return response;
    }    
    
    async postProduct (req, res , next){
        return await this.productDao.postProduct(req,next);
    }
    
    async getProductById (pid, next){
            return await this.productDao.getProductById(pid,next);
    }
    
    async deleteProductByID (pid, next){
        return await this.productDao.deleteProductByID(pid,next);
    }
    
    async updateProductByID (pid, next){    
        return await this.productDao.updateProductByID(pid,next);
    }
    
    async updateStockSoldByID(pid,quantity, next){
        return await this.productDao.updateStockSoldByID(pid,quantity,next)
    }
    getMockingProducts(quantity , next){
        return this.productDao.getMockingProducts(quantity , next)
    }
}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export const productRepository = new ProductRepository(productDAOMongo)