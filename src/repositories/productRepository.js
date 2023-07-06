import { productDAOMongo } from "../managers/mongoose/ProductDAOMongoose.js"
import { ProductDAOFs } from "../managers/fileSystem/ProductDAOFs.js"
import { PERSISTENCE } from "../config/config.js"

class ProductRepository{
    productDao
    constructor (productDao){
        this.productDao = productDao
    }   
    async getProducts (queryLimit , queryPage, category, stock, sort){    
        return await this.productDao.getProducts(queryLimit , queryPage, category, stock, sort)
    }    
    async postProduct (newProduct){
        return await this.productDao.postProduct(newProduct);
    }    
    async getProductById (pid){
        return await this.productDao.getProductById(pid);
    } 
    async getProductByCode (code){
        return await this.productDao.getProductByCode(code);
    } 
    async deleteProductByID (req , res , next){
        return await this.productDao.deleteProductByID(req , res , next);
    }
    
    // async updateProductByID (req , res , next){    
    //     return await this.productDao.updateProductByID(req , res , next);
    // }
    async replaceOneProduct (pid , product){    
        return await this.productDao.replaceOneProduct(pid , product);
    }
    
    // async updateStockSoldByID(pid, pQty , req , res , next){
    //     return await this.productDao.updateStockSoldByID(pid, pQty , req , res , next)
    // }
    
    getMockingProducts(req , res , next){
        return this.productDao.getMockingProducts(req , res , next)
    }
}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export let productRepository = new ProductRepository(productDAOMongo)
if( PERSISTENCE !== "mongoose") productRepository = new ProductRepository(ProductDAOFs)