// @ts-nocheck
import { cartRepository } from "../repositories/cartRepository.js";
import { productService } from "./productService.js";
import { ticketRepository } from "../repositories/ticketRepository.js";
import { userSessionService } from "./sessionService.js";
import { AuthorizationError } from "../models/errors/authorization.error.js";

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
    
    async getCartsByID (cid){     
        return await this.cartRepository.getCartsByID(cid)
    }
    
    async deleteCartByID (req, res , next){    
        return await this.cartRepository.deleteCartByID(req, res , next)
    }
    
    async postProductToCarts (req, res , next){
        try {            
            const cid = req.params.cid 
            const pid = req.params.pid                  
            const product = await this.productService.getProductById(pid)
            const loguedUser = this.userSessionService.getLoguedUser(req)
            let productQuantity = req.query.quantity;
            
            
            if (product.owner === loguedUser.email){
                // Corroborado desde back, en fron estan ocultos los productos propios
                throw new AuthorizationError("No se pueden agregar productos propios al carrito")
            }

            if(productQuantity === undefined){
                productQuantity = 1;
            } else if (Number.isInteger(Number(productQuantity)) && productQuantity >= 1){
                productQuantity = Number(productQuantity);
            } else {
                throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")
            }            
            const cart = await this.getCartsByID(cid)

            if(cart){      
                let productInCart= false;     
                cart["products"].filter((obj)=>{
                if( obj["product"].equals(product._id) ){ productInCart = true; }
               })    
                if(productInCart){
                    cart["products"].map(obj=>{
                        if( obj["product"].equals(product._id) ){ 
                            obj["quantity"] += parseInt(productQuantity)
                        }
                    })                
                    await this.cartRepository.replaceOneCart(cid , cart)
                } else {
                    cart.products.push( { product: pid , quantity:productQuantity})
                    console.log("true?", cart._id == cid)
                    await this.cartRepository.replaceOneCart(cid , cart)
                }                    
            return await this.getCartsByID(cid)
            }
         } catch (error) {
             next(error);
         }             
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