import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"
import { cartDAOFs } from "../managers/fileSystem/CartDAOFs.js"
import { PERSISTENCE } from "../config/config.js"

class CartRepository{
    cartDao

    constructor (cartDao){
        this.cartDao = cartDao
    }   

    async getCarts (req, res, next){
        return await this.cartDao.getCarts(req, res,next)        
    }
    
    async postCart (req, res, next){
        return await this.cartDao.postCart(req, res,next)
    }
    
    async getCartsByID (req, res, next){     
        return await this.cartDao.findCartById(req, res,next)
    }
    
    async deleteCartByID ( req, res, next){    
        return await this.cartDao.deleteCartById(req, res,next)
    }
    
    async postProductToCarts (req,res,next){
        return await this.cartDao.postProductToCart(req,res,next)
    }
    
    async deleteProductInCarts (req,res, next){
        return await this.cartDao.deleteProductInCart(req,res,next)
    }
    
    async deleteAllProductsInCartByID (cid, req,res,next) {
        return await this.cartDao.deleteAllProductsInCartById(cid,req,res,next)    
    }
    
    async updateQuantityProductInCarts (req,res, next) {
        return await this.cartDao.updateQuantityProductInCart(req,res,next)
    }
    
    async updateAllProductsInCarts (req,res, next) {        
        return await this.cartDao.updateAllProductsInCart(req,res,next)    
    }
    
    async setProductsInCart(cid, products, req ,res, next){
        return await this.cartDao.setProductsInCart(cid, products, req ,res, next)
    }
}

export let cartRepository = new CartRepository(cartDAOMongoose)
if( PERSISTENCE !== "mongo_atlas") cartRepository = new CartRepository(cartDAOFs)