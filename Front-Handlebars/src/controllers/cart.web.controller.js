// @ts-nocheck
import { cartWebService } from "../service/cartsWebService.js";

export async function getCartsWeb (req, res , next){
    try {
        const response = await cartWebService.getCarts(req, res,next)
        res.render("carts", response)    
     } catch (error) {
        next(error)
     }
} 
export async function getCartsByIDWEB (req, res , next){     
    try {
        const cart = await cartWebService.getCartByID(req, next)
        res.render("cartById", cart)
     } catch (error) {
        next(error)
     }
}