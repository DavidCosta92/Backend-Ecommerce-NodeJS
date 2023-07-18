// @ts-nocheck
/*
import { viewService } from "../../services/viewService.js"

export async function renderProductsView(req,res,next){   
    try {
        const dataRender = await viewService.getProducts(req, res, next)
        res.render("productsView", dataRender)        
     } catch (error) {
        next(error)
     }
}
export async function renderCartsView(req,res,next){
    try {
        const response = await viewService.getCarts(req, res,next)
        res.render("carts", response)    
     } catch (error) {
        next(error)
     }
} 
export async function renderCartViewById(req,res,next){            
    try {
       const cart = await viewService.getCartById(req, res,next)
       res.render("cartById", cart)
    } catch (error) {
       next(error)
    }
}
*/