import { productDAOMongo } from "../db/mongoose/managers/ProductDAOMongoose.js"

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
    async getProductsByOwner (owner){
        return await this.productDao.getProductsByOwner(owner);
    } 
    async deleteProductByID (pid){
        return await this.productDao.deleteProductByID(pid);
    } 
    async editProductsByID (pid, product){
        return await this.productDao.editProductsByID(pid, product);
    }
    async replaceOneProduct (pid , product){    
        return await this.productDao.replaceOneProduct(pid , product);
    }
}
// TODO: Persistencia en fs, POR EL MOMENTO SOLO MONGOOSE
export let productRepository = new ProductRepository(productDAOMongo)