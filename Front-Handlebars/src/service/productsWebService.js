// @ts-nocheck

import { NotFoundErrorWeb } from "../../../src/models/errors/carts.error.js"
import { productService } from "../../../src/services/productService.js"
import { userService } from "../../../src/services/userService.js"

class ProductsWebService {
    async getProductsWeb(req, res, next){
        let dataRender = {}
        const user = await userService.getLoguedUser(req ,res, next)    
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
            payload : paginatedProducts,            
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
} 
  export const productsWebService = new ProductsWebService()