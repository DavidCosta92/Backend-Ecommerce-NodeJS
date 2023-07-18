// @ts-nocheck

import { NotFoundErrorWeb } from "../../../src/models/errors/carts.error.js"
import { cartService } from "../../../src/services/cartService.js"
import { productService } from "../../../src/services/productService.js"
import { userService } from "../../../src/services/userService.js"

class ProductsWebService {
    async getProductsWeb(req, res, next){
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
    async getProductsByIdWeb(req, res, next){
        try {            
            const user = await userService.getLoguedUser(req , next)
            const product = await productService.getProductById(req , res , next)
            const title = user.username? `${user.username} - producto por ID` : `${user.first_name} - producto por ID`
            return {product , user , loguedUser : true , title : title }
        } catch (error) {
            throw new NotFoundErrorWeb("No se encontro producto con ID solicitado")
        }
    }
    async mockingproductsWEB (req , res , next){
        let dataRender = {}
        const user = await userService.getLoguedUser(req , next)
        const paginatedProducts = await productService.getMockingProducts(req, next)
        dataRender["loguedUser"] = true
        dataRender["paginatedProducts"] = {
            payload : paginatedProducts,   // []             
            totalPages: 1,
            prevPage: null,
            nextPage: null,
            page: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevLink: null,
            nextLink: null,
            hayResultados: true
        }
        if(user !== undefined){
            dataRender["title"] = user.username? `${user.username} - productos` : `${user.first_name} - productos`
            dataRender["user"] =user
         } else {         
            dataRender["title"] =`${req.session['user'].first_name} - productos`
            dataRender["user"] =req.session['user']
         } 
        return dataRender
    }
    /// async getCarts(req, res, next){
    ///     let dataRender = {}
    ///     const user = await userService.getLoguedUser(req , next)
    ///     const paginatedCarts = await cartService.getCarts(req, next)
    ///     dataRender["loguedUser"] = true
    ///     dataRender["paginatedCarts"] = paginatedCarts
    /// 
    ///     if(user !== undefined){
    ///         dataRender["title"] = user.username? `${user.username} - Carritos` : `${user.first_name} - Carritos`
    ///         dataRender["user"] =user
    ///      } else {         
    ///         dataRender["title"] =`${req.session['user'].first_name} - Carritos`
    ///         dataRender["user"] =req.session['user']
    ///      }        
    ///     return dataRender
    /// }
    /// async getCartById(req, res, next){
    ///     let dataRender = {}
    ///     const user = await userService.getLoguedUser(req , next)
    ///     const cart = await cartService.getCartsByID(req, next)
    /// 
    ///     // buscar solucion alternativa a error handlebars
    ///     const cartToRender = []
    ///     cart.products.forEach(pr => { cartToRender.push( pr.toObject()) });
    ///     dataRender["loguedUser"] = true
    ///     dataRender["hayResultados"] = cart? true : false
    ///     dataRender["cart"] = {}
    ///     dataRender["cart"]["products"] = cartToRender
    ///     dataRender["cart"]["_id"] = req.params.cid
    /// 
    ///     if(user !== undefined){
    ///         dataRender["title"] = user.username? `${user.username} - Carrito por ID` : `${user.first_name} - Carrito por ID`
    ///         dataRender["user"] =user
    ///      } else {         
    ///         dataRender["title"] =`${req.session['user'].first_name} - Carrito por ID`
    ///         dataRender["user"] =req.session['user']
    ///      }        
    ///     return dataRender
    /// }
} 
  export const productsWebService = new ProductsWebService()