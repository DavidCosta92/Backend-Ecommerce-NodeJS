// @ts-nocheck
import { productDAOMongo } from "../../managers/mongoose/ProductDAOMongoose.js";

export async function getProductsMongoose (req, res , next){  
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;       
    let response ={...await productDAOMongo.getProducts(req, next) , status}
    res.json(response);
}    

export async function postProductsMongoose (req, res , next){
    res.json(await productDAOMongo.postProduct(req,next));
}

export async function getProductsByIDMongoose (req, res , next){
        res.json(await productDAOMongo.getProductById(req.params.pid,next));
}

export async function deleteProductsByIDMongoose (req, res , next){
    res.json(await productDAOMongo.deleteProductByID(req.params.pid,next));
}

export async function updateProductsByIDMongoose (req, res , next){    
    res.json(await productDAOMongo.updateProductByID(req.params.pid,next));
}