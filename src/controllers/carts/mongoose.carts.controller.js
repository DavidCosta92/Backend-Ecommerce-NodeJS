// @ts-nocheck
import { cartDAOMongoose } from "../../managers/mongoose/CartDAOMongoose.js";


export async function getCartsMongoose (req, res , next){
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
    let response ={...await cartDAOMongoose.getCarts(req,next) , status}
    res.json(response);
}

export async function postCartMongoose (req, res , next){
    res.json(await cartDAOMongoose.postCart(req,next));
}

export async function getCartsByIDMongoose (req, res , next){     
    res.json(await cartDAOMongoose.findCartById(req.params.cid,next));
}

export async function deleteCartByIDMongoose (req, res , next){    
    res.json(await cartDAOMongoose.deleteCartById(req.params.cid,next));
}

export async function postProductToCartsMongoose (req, res , next){
    res.json(await cartDAOMongoose.postProductToCart(req,next));
}

export async function deleteProductInCartsMongoose (req, res , next){
    res.status(200).json(await cartDAOMongoose.deleteProductInCart(req,next));
}

export async function deleteAllProductsInCartByIDMongoose (req, res , next) {
    res.status(200).json(await cartDAOMongoose.deleteAllProductsInCartById(req.params.cid,next));

}

export async function updateQuantityProductInCartsMongoose (req, res , next) {
    res.status(200).json(await cartDAOMongoose.updateQuantityProductInCart(req,next));
}

export async function updateAllProductsInCartsMongoose (req, res , next) {
    res.json(await cartDAOMongoose.updateAllProductsInCart(req.params.cid,next));

}
