import { cartRepository } from "../repositories/cartRepository.js";
import { productService } from "./productService.js";
import { ticketRepository } from "../repositories/ticketRepository.js";
import { userSessionService } from "./sessionService.js";

class CartService{
    cartRepository
    productService
    ticketRepository
    userSessionService
    constructor(cartRepo , productService, ticketRepository ,userSessionService){    
        this.cartRepository = cartRepo; 
        this.productService = productService;  
        this.ticketRepository = ticketRepository;
        this.userSessionService = userSessionService
    }


    async getCarts (req, res , next){
        const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
        let response ={...await this.cartRepository.getCarts(req, res , next) , status}
        return response;
    }
    
    async postCart (req, res , next){
        return await this.cartRepository.postCart(req, res , next)
    }
    
    async getCartsByID (req, res , next){     
        return await this.cartRepository.getCartsByID(req, res , next)
    }
    
    async deleteCartByID (req, res , next){    
        return await this.cartRepository.deleteCartByID(req, res , next)
    }
    
    async postProductToCarts (req, res , next){
        return await this.cartRepository.postProductToCarts(req, res , next);
    }
    
    async deleteProductInCarts (req, res , next){
        return await this.cartRepository.deleteProductInCarts(req, res , next);
    }
    
    async deleteAllProductsInCartByID (req, res , next) {
       return await this.cartRepository.deleteAllProductsInCartByID(req, res , next);    
    }
    
    async updateQuantityProductInCarts (req, res , next) {
       return await this.cartRepository.updateQuantityProductInCarts(req, res , next);
    }
    
    async updateAllProductsInCarts (req, res , next) {
        return await this.cartRepository.updateAllProductsInCarts(req, res , next)    
    }
    
    async validateProduct(pid, quantity , req, res , next){
        const product = await this.productService.getProductById(pid, req, res , next)
        if (product?.stock >= quantity){ return true } 
        return false
    }

    async verifyProducts(products , req , res , next){
        let acceptedProds = []
        let rejectedProds = []
        
        for (let i = 0; i < products.length; i++) {
            if (await this.validateProduct(products[i].product._id, products[i].quantity , req , res , next)){
                acceptedProds.push(products[i])
            }else{
                rejectedProds.push(products[i])
            }
        }
        return { acceptedProds , rejectedProds }
    }
    async updateProductsStocks(products,req , res , next){
        for (let i = 0; i < products.length; i++) {           
            this.productService.updateStockSoldByID(products[i].product._id, products[i].quantity, req , res , next) //(products[i].product._id, products[i].quantity)          
        }
    }

    calculateProductTotalCost (products){
        let totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            totalCost+=products[i].product.price * products[i].quantity
        }
        return totalCost
    }

    async buyCart (req , res , next)  {
        const cart = await this.cartRepository.getCartsByID(req,res ,next)
        const productsInCart = cart.products
        const { acceptedProds , rejectedProds } = await this.verifyProducts(productsInCart, req , res , next)
        const amount = this.calculateProductTotalCost(acceptedProds)

        this.updateProductsStocks(acceptedProds,req , res , next)

        //cambiar productos en carrito por los rechazados y enviar alerta
        this.cartRepository.setProductsInCart(req.params.cid, rejectedProds, req, res, next)

        if(rejectedProds.length>0){
            console.log("+++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++")
            console.log("DEBERIA MANDAR UN codigo que se transforme en una alerta o mensaje al front..")
            console.log("+++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++")
        }
                   
        const purchaser = this.userSessionService.getLoguedUser(req).email
        const purchaseTicket = await this.ticketRepository.createTicket(acceptedProds , rejectedProds , amount , purchaser,req, res, next)         
        const user = userSessionService.getLoguedUser(req)

        return { purchaseTicket , user }
    }


} 
export const cartService = new CartService(cartRepository , productService, ticketRepository, userSessionService)