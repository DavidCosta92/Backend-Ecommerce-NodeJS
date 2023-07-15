// @ts-nocheck
import { cartRepository } from "../repositories/cartRepository.js";
import { productService } from "./productService.js";
import { ticketService } from "./ticketService.js";
import { userSessionService } from "./sessionService.js";
import { productRepository } from "../repositories/productRepository.js";

import { AuthorizationError } from "../models/errors/authorization.error.js";
import { validateAlphanumeric } from "../models/validations/validations.js";
import { IllegalInputArg } from "../models/errors/validations.errors.js";

class CartService{
    cartRepository
    productService
    productRepository
    ticketService
    userSessionService
    constructor(cartRepository ,productRepository , productService, ticketService ,userSessionService){    
        this.cartRepository = cartRepository; 
        this.productRepository = productRepository; 
        this.productService = productService;  
        this.ticketService = ticketService;
        this.userSessionService = userSessionService
    }
    async getCarts (req, next){
        try {
            const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
            const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page   
            return await this.cartRepository.getCarts(queryLimit , queryPage)
        } catch (error) {
            next(error)
        }        
    }    
    async postCart (next){
        try {            
            return await this.cartRepository.postCart()
        } catch (error) {            
            next(error)
        }
    }    
    async getCartsByID (req, next){     
        try {               
            const cid = validateAlphanumeric("Cart ID",req.params.cid)
            return await this.cartRepository.getCartsByID(cid)
        } catch (error) {            
            next(error)
        }
    }    
    async deleteCartByID (req, next){    
        try {      
            const cid = validateAlphanumeric("Cart ID",req.params.cid)
            return await this.cartRepository.deleteCartByID(cid)
        } catch (error) {            
            next(error)
        }
    }
    async postProductToCarts (req, res , next){
        try {            
            const pid = req.params.pid      
            const product = await this.productService.getProductById(req, res , next)
            const loguedUser = await this.userSessionService.getLoguedUser(req, res , next)
            let productQuantity = req.query.quantity;
            // Corroborado desde back, en fron estan ocultos los productos propios
            if (product.owner === loguedUser.email) throw new AuthorizationError("No se pueden agregar productos propios al carrito")

            if(productQuantity === undefined){
                productQuantity = 1;
            } else if (Number.isInteger(Number(productQuantity)) && productQuantity >= 1){
                productQuantity = Number(productQuantity);
            } else {
                throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")
            }          
            if(productQuantity>product.stock) throw new IllegalInputArg (`La cantidad no puede exeder el stock, en este caso ${product.stock}`)

            const cart = await this.getCartsByID(req,next)
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
                    await this.cartRepository.replaceOneCart(cart._id , cart)
                } else {
                    cart.products.push( { product: pid , quantity:productQuantity})
                    await this.cartRepository.replaceOneCart(cart._id , cart)
                }                    
            return await this.getCartsByID(req, next)
            }
         } catch (error) {
             next(error);
         }             
    }
    async deleteProductInCarts (req, res , next){
        try {            
            const cart = await this.getCartsByID(req , next)
            if(cart){
                let productosRestantes=[];
                const productSearch = await this.productService.getProductById(req , res , next)
    
                cart["products"].filter((product)=>{
                    if( !product["product"].equals(productSearch._id)){
                        productosRestantes.push(product)
                    }
                })            
                cart.products = productosRestantes;
                await  this.cartRepository.replaceOneCart(cart._id , cart)
            }
            return await this.getCartsByID(req , next)
        } catch (error) {                  
            next(error)
        }
    }
    async deleteAllProductsInCartByID (req, res , next) {
        try {
            const cart = await this.getCartsByID(req, next)
            if (cart){
                cart["products"]=[];
                await this.cartRepository.replaceOneCart(cart._id , cart)
            }
            return await this.getCartsByID(req, next)
        } catch (error) {
            next(error)
        }
    }
    async updateQuantityProductInCarts (req, res , next) {
        try {
            let newPrQty = req.query.quantity;
            if (!Number.isInteger(Number(newPrQty)) && newPrQty < 0) throw new IllegalInputArg ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")

            const product = await this.productService.getProductById(req , res , next)
            if(newPrQty>product.stock) throw new IllegalInputArg (`La cantidad no puede exeder el stock, en este caso ${product.stock}`)

            const cart = await this.getCartsByID(req, res , next) 
            if(cart){            
                let productInCart= false;      
                cart["products"].filter((obj)=>{
                if( obj["product"].equals(product._id) ){ productInCart = true; }
               })
               
                if(productInCart){
                    cart["products"].map(obj=>{
                        if( obj["product"].equals(product._id) ){ 
                            obj["quantity"] = parseInt(newPrQty)
                        }
                    })                
                    await this.cartRepository.replaceOneCart(cart._id , cart)
                } else {
                    cart.products.push( { product : pid , quantity : newPrQty})
                    await this.cartRepository.replaceOneCart(cart._id , cart)
                }
            return await this.getCartsByID(req, res , next)
            }
        } catch (error) {
            next(error)
        }
    } 
    async updateAllProductsInCarts (req, res , next) {
        try {
            const cart = await this.getCartsByID(req, next)
            if(cart){
                cart["products"]=req.body.products;
                await this.cartRepository.replaceOneCart(cart._id , cart)
            }
            return await this.getCartsByID(req, next)
        } catch (error) {
            next(error)
        } 
    }    
    async validateProduct(pid, quantity , req, res , next){        
        try {            
            const pId = validateAlphanumeric("Product ID",pid)
            const product = await this.productRepository.getProductById(pId)
            if (product?.stock >= quantity){ return true } 
            return false
            
        } catch (error) {
            next(error)
        }
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
    async updateProductsStocks(products , req , res , next){
        for (let i = 0; i < products.length; i++) {           
            this.productService.updateStockSoldByID(products[i].product._id, products[i].quantity, req , res , next) 
        }
    }
    calculateProductTotalCost (products){
        let totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            totalCost+=products[i].product.price * products[i].quantity
        }
        return totalCost
    }
    async setProductsInCart(cart, rejectedProds, req, res, next){
        try {
            cart["products"]=rejectedProds;
            await this.cartRepository.replaceOneCart(cart._id, cart)            
        } catch (error) {       
            next(error);            
        }
    }
    async buyCart (req , res , next)  {
        try {
            const cart = await this.getCartsByID(req,next)
            const productsInCart = cart.products
            const { acceptedProds , rejectedProds } = await this.verifyProducts(productsInCart, req , res , next)
            const amount = this.calculateProductTotalCost(acceptedProds)
    
            await this.updateProductsStocks(acceptedProds , req , res , next)
    
            //Logica de negocio pide que queden los rechazados en el carrito
            await this.setProductsInCart(cart, rejectedProds, req, res, next)                       
            const user = this.userSessionService.getLoguedUser(req , res , next)    
                
            const purchaseTicket = await this.ticketService.newTicket(acceptedProds , rejectedProds , amount , user.email, req, res, next)

            return { purchaseTicket , user }             
        } catch (error) {
            next(error)
        }
    }
} 
export const cartService = new CartService(cartRepository , productRepository , productService, ticketService, userSessionService)