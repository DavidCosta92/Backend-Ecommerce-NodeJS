// @ts-nocheck
import { cartService } from "../../../src/services/cartService.js";
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
export async function buyCartWeb (req, res , next) {
   try {
       const { purchaseTicket , user } = await cartService.buyCart (req, res , next)
/* ERROR DE Handlebars => "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas */
       if ( purchaseTicket){
           const {code , purchase_datetime , amount , purcharser , acceptedProds , rejectedProds} = purchaseTicket
           const acceptedProducts = []
           acceptedProds.forEach(pr => { acceptedProducts.push( pr.toObject()) });    
           const rejectedProducts = []
           rejectedProds.forEach(pr => { rejectedProducts.push( pr.toObject()) });
       
           const response ={
               title: "Resumen de compra", 
               code : code, 
               purchase_datetime : purchase_datetime, 
               amount : amount, 
               purcharser : purcharser, 
               acceptedProds : acceptedProducts, 
               rejectedProds : rejectedProducts, 
               user : user,
               loguedUser: true
            }                
           res.render("purchase", response)  
       }
   } catch (error) {
       next(error)
   }
}