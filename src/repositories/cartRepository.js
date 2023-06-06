import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"

class CartRepository{
    cartDao

    constructor (cartDao){
        this.cartDao = cartDao
    }   

    async getCarts (req, next){
        return await this.cartDao.getCarts(req,next)        
    }
    
    async postCart (next){
        return await this.cartDao.postCart(next)
    }
    
    async getCartsByID (cid, next){     
        return await this.cartDao.findCartById(cid,next)
    }
    
    async deleteCartByID (cid, next){    
        return await this.cartDao.deleteCartById(cid,next)
    }
    
    async postProductToCarts (req, next){
        return await this.cartDao.postProductToCart(req,next)
    }
    
    async deleteProductInCarts (req, next){
        return await this.cartDao.deleteProductInCart(req,next)
    }
    
    async deleteAllProductsInCartByID (cid, next) {
        return await this.cartDao.deleteAllProductsInCartById(cid,next)    
    }
    
    async updateQuantityProductInCarts (req, next) {
        return await this.cartDao.updateQuantityProductInCart(req,next)
    }
    
    async updateAllProductsInCarts (cid, next) {        
        return await this.cartDao.updateAllProductsInCart(cid,next)    
    }
    
    async setProductsInCart(cid, products, next){
        return await this.cartDao.setProductsInCart(cid, products, next)
    }

}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export const cartRepository = new CartRepository(cartDAOMongoose)