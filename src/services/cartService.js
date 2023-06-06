import { cartRepository } from "../repositories/cartRepository.js";
import { productService } from "./productService.js";

class CartService{
    cartRepository
    productService
    constructor(cartRepo , productService){    
        this.cartRepository = cartRepo; 
        this.productService = productService; 
    }


    async getCarts (req, res , next){
        const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
        let response ={...await this.cartRepository.getCarts(req,next) , status}
        return response;
    }
    
    async postCart (next){
        return await this.cartRepository.postCart(next)
    }
    
    async getCartsByID (cid, next){     
        return await this.cartRepository.getCartsByID(cid,next)
    }
    
    async deleteCartByID (cid , next){    
        return await this.cartRepository.deleteCartByID(cid,next)
    }
    
    async postProductToCarts (req, res , next){
        return await this.cartRepository.postProductToCarts(req,next);
    }
    
    async deleteProductInCarts (req, res , next){
        return await this.cartRepository.deleteProductInCarts(req,next);
    }
    
    async deleteAllProductsInCartByID (cid, res , next) {
       return await this.cartRepository.deleteAllProductsInCartByID(cid,next);    
    }
    
    async updateQuantityProductInCarts (req, res , next) {
       return await this.cartRepository.updateQuantityProductInCarts(req,next);
    }
    
    async updateAllProductsInCarts (cid, res , next) {
        return await this.cartRepository.updateAllProductsInCarts(cid,next)    
    }
    
    async validateProduct(pid, quantity){
        const product = await this.productService.getProductById({ _id : pid})
        if (product?.stock >= quantity){
            return true
        } 
        return false
    }

    async verifyProducts(products){
        let acceptedProds = []
        let rejectedProds = []
        
        for (let i = 0; i < products.length; i++) {
            if (await this.validateProduct(products[i].product._id, products[i].quantity)){
                acceptedProds.push(products[i])
            }else{
                rejectedProds.push(products[i])
            }
        }
        return { acceptedProds , rejectedProds }
    }
    async updateProductsStocks(products){
        for (let i = 0; i < products.length; i++) {           
            this.productService.updateStockSoldByID(products[i].product._id, products[i].quantity)            
        }
    }

    calculateProductTotalCost (products){
        let totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            totalCost+=products[i].product.price * products[i].quantity
        }
        return totalCost
    }

    async buyCart (cid , next) {
        const cart = await this.cartRepository.getCartsByID(cid,next)
        const productsInCart = cart.products

        const { acceptedProds , rejectedProds } = await this.verifyProducts(productsInCart)
        const amount = this.calculateProductTotalCost(acceptedProds)

        this.updateProductsStocks(acceptedProds)

        //cambiar productos en carrito por los rechazados y enviar alerta
        this.cartRepository.setProductsInCart(cid, rejectedProds, next)

        if(rejectedProds.length>0){
            console.log("+++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++")
            console.log("DEBERIA MANDAR UN codigo que se transforme en una alerta o mensaje al front..")
            console.log("+++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++")
        }
        
        // - crear nuevo ticket, persistirlo y enviarlo a renderizar como json
        console.log("+++++++++++++++++++++++")
        console.log("****** TICKET A CREAR ********")
        console.log("DATOS=> aceptados:", acceptedProds,"Rechazados:", rejectedProds, "Precio:",amount, "deberia enviarl mail, created at, randomUUID")
        console.log("******* TICKET A CREAR *******") 
        
        
        // return { ticket : new ticket} => deberia llevar toda la info..
    
    }

} 
export const cartService = new CartService(cartRepository , productService)