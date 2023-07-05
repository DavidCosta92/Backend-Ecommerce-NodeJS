// @ts-nocheck
import { cartService  } from "../../services/cartService.js";

export async function getCarts (req, res , next){
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
    let response ={...await cartService.getCarts (req, res , next) , status}
    res.json(response);
}

export async function postCart (req, res , next){
    res.json(await cartService.postCart (req, res , next));
}

export async function getCartsByID (req, res , next){     
    res.json(await cartService.getCartsByID (req, res , next));
}

export async function deleteCartByID (req, res , next){    
    res.json(await cartService.deleteCartByID (req, res , next));
}

export async function postProductToCarts (req, res , next){
    res.json(await cartService.postProductToCarts (req, res , next));
}

export async function deleteProductInCarts (req, res , next){
    res.status(200).json(await cartService.deleteProductInCarts (req, res , next));
}

export async function deleteAllProductsInCartByID (req, res , next) {
    res.status(200).json(await cartService.deleteAllProductsInCartByID (req, res , next));

}

export async function updateQuantityProductInCarts (req, res , next) {
    res.status(200).json(await cartService.updateQuantityProductInCarts (req, res , next));
}

export async function updateAllProductsInCarts (req, res , next) {
    res.json(await cartService.updateAllProductsInCarts (req, res , next));

}
export async function buyCart (req, res , next) {
    const { purchaseTicket , user } = await cartService.buyCart (req, res , next)
    const {code , purchase_datetime , amount , purcharser , acceptedProds , rejectedProds} = purchaseTicket

    const acceptedProducts = []
    //Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas
    acceptedProds.forEach(pr => { acceptedProducts.push( pr.toObject()) });
    
    const rejectedProducts = []
    //Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas
    rejectedProds.forEach(pr => { rejectedProducts.push( pr.toObject()) });

    const response ={
        title: "Resumen de compra", 
        code : code, 
        purchase_datetime : purchase_datetime, 
        amount : amount, 
        purcharser : purcharser, 
        acceptedProds : acceptedProducts, 
        rejectedProds : rejectedProducts, 
        user : user }
    res.render("purchase", response)  
}
