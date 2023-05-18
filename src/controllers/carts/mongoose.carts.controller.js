// @ts-nocheck
import { DB_mongo_cart_manager } from "../../managers/mongoose/database.cart.Manager.js";


export async function getCartsMongoose (req, res , next){
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
    let response ={...await DB_mongo_cart_manager.getCarts(req,next) , status}
    res.json(response);
}

export async function postCartMongoose (req, res , next){
    res.json(await DB_mongo_cart_manager.postCart(req,next));
}

export async function getCartsByIDMongoose (req, res , next){     
    res.json(await DB_mongo_cart_manager.findCartById(req.params.cid,next));
}

export async function deleteCartByIDMongoose (req, res , next){    
    res.json(await DB_mongo_cart_manager.deleteCartById(req.params.cid,next));
}

export async function postProductToCartsMongoose (req, res , next){
    res.json(await DB_mongo_cart_manager.postProductToCart(req,next));
}

export async function deleteProductInCartsMongoose (req, res , next){
    res.status(200).json(await DB_mongo_cart_manager.deleteProductInCart(req,next));
}

export async function deleteAllProductsInCartByIDMongoose (req, res , next) {
    res.status(200).json(await DB_mongo_cart_manager.deleteAllProductsInCartById(req.params.cid,next));

}

export async function updateQuantityProductInCartsMongoose (req, res , next) {
    res.status(200).json(await DB_mongo_cart_manager.updateQuantityProductInCart(req,next));
}

export async function updateAllProductsInCartsMongoose (req, res , next) {
    res.json(await DB_mongo_cart_manager.updateAllProductsInCart(req.params.cid,next));

}
