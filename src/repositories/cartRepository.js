import { cartDAOMongoose } from "../db/mongoose/managers/CartDAOMongoose.js"

class CartRepository{
    cartDao
    constructor (cartDao){
        this.cartDao = cartDao
    }   
    async getCarts (queryLimit , queryPage){
        return await this.cartDao.getCarts(queryLimit , queryPage)        
    }
    async postCart(){
        return await this.cartDao.createCart()
    }
    async getCartsByID (cid){     
        return await this.cartDao.findCartById(cid)
    }
    async replaceOneCart (cid , cart){     
        return await this.cartDao.replaceOneCart(cid, cart)
    }    
    async deleteCartByID (cid){    
        return await this.cartDao.deleteCartById(cid)
    }
}
// TODO: Persistencia en fs, POR EL MOMENTO SOLO MONGOOSE
export let cartRepository = new CartRepository(cartDAOMongoose)
