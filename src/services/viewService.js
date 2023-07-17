// @ts-nocheck
import { cartService } from "./cartService.js"
import { productService } from "./productService.js"
import { userService } from "./userService.js"

class ViewService {
    async getProducts(req, res, next){
        let dataRender = {}
        const user = await userService.getLoguedUser(req , next)
        const paginatedProducts = await productService.getProducts(req, res, next)
        dataRender["loguedUser"] = true
        dataRender["paginatedProducts"] = paginatedProducts

        if(user !== undefined){
            dataRender["title"] = user.username? `${user.username} - productos` : `${user.first_name} - productos`
            dataRender["user"] =user
         } else {         
            dataRender["title"] =`${req.session['user'].first_name} - productos`
            dataRender["user"] =req.session['user']
         }
        return dataRender
    }
    async getCarts(req, res, next){
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
    }
    async getCartById(req, res, next){
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
    }
} 
  export const viewService = new ViewService()