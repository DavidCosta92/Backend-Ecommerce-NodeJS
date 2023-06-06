// @ts-nocheck
import { cartDAOMongoose } from "../../managers/mongoose/CartDAOMongoose.js";
import { cartService  } from "../../services/cartService.js";

export async function getCarts (req, res , next){
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
    let response ={...await cartDAOMongoose.getCarts(req,next) , status}
    res.json(response);
}

export async function postCart (req, res , next){
    res.json(await cartService.postCart(next));
}

export async function getCartsByID (req, res , next){     
    res.json(await cartService.getCartsByID(req.params.cid,next));
}

export async function deleteCartByID (req, res , next){    
    res.json(await cartService.deleteCartByID(req.params.cid,next));
}

export async function postProductToCarts (req, res , next){
    res.json(await cartService.postProductToCarts(req,next));
}

export async function deleteProductInCarts (req, res , next){
    res.status(200).json(await cartService.deleteProductInCarts(req,next));
}

export async function deleteAllProductsInCartByID (req, res , next) {
    res.status(200).json(await cartService.deleteAllProductsInCartByID(req.params.cid,next));

}

export async function updateQuantityProductInCarts (req, res , next) {
    res.status(200).json(await cartService.updateQuantityProductInCarts(req,next));
}

export async function updateAllProductsInCarts (req, res , next) {
    res.json(await cartService.updateAllProductsInCarts(req.params.cid,next));

}

export async function buyCart (req, res , next) {
    // aca debo llamar a servicio.. y que servicio se encargue de hacer todo,
        // - hacer validaciones de productos
        // - hacer calculos de costo
        // - sacar los productos comprados del carrito
        // - los que no se hayan comprado, dejarlos en el carrito..
        // - mandar a guardar la info en la bd
        // - crear nuevo ticket, persistirlo y enviarlo a renderizar como json
    
    res.json(await cartService.buyCart(req.params,next));
}