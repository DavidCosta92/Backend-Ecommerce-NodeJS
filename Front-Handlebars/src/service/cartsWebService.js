import { validateAlphanumeric } from "../../../src/models/validations/validations.js"
import { cartRepository } from "../../../src/repositories/cartRepository.js"
import { productRepository } from "../../../src/repositories/productRepository.js"
import { cartService } from "../../../src/services/cartService.js"
import { productService } from "../../../src/services/productService.js"
import { userSessionService } from "../../../src/services/sessionService.js"
import { ticketService } from "../../../src/services/ticketService.js"
import { userService } from "../../../src/services/userService.js"

// @ts-nocheck
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
            let dataRender = {}
            const user = await userService.getLoguedUser(req , next)
            const paginatedCarts = await cartService.getCarts(req, next)
            dataRender["loguedUser"] = true
            dataRender["paginatedCarts"] = paginatedCarts
    
            if(user !== undefined){
                dataRender["title"] = user.username? `${user.username} - Carritos` : `${user.first_name} - Carritos`
                dataRender["user"] =user
             } else {         
                dataRender["title"] =`${req.session['user'].first_name} - Carritos`
                dataRender["user"] =req.session['user']
             }        
            return dataRender   
        } catch (error) {
            next(error)
        }        
    }    
    async getCartByID (req, next){     
        try {               
            let dataRender = {}
            const user = await userService.getLoguedUser(req , next)
            const cart = await cartService.getCartsByID(req, next)
    
            // buscar solucion alternativa a error handlebars
            const cartToRender = []
            cart.products.forEach(pr => { cartToRender.push( pr.toObject()) });
            dataRender["loguedUser"] = true
            dataRender["hayResultados"] = cart? true : false
            dataRender["cart"] = {}
            dataRender["cart"]["products"] = cartToRender
            dataRender["cart"]["_id"] = req.params.cid
    
            if(user !== undefined){
                dataRender["title"] = user.username? `${user.username} - Carrito por ID` : `${user.first_name} - Carrito por ID`
                dataRender["user"] =user
             } else {         
                dataRender["title"] =`${req.session['user'].first_name} - Carrito por ID`
                dataRender["user"] =req.session['user']
             }        
            return dataRender
        } catch (error) {            
            next(error)
        }
    } 
} 
export const cartWebService = new CartService(cartRepository , productRepository , productService, ticketService, userSessionService)