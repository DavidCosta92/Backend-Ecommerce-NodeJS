// @ts-nocheck
import { Product_dao_mongo_manager } from "../../managers/mongoose/database.product.Manager.js";

export async function getProductsMongoose (req, res , next){  
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;       
    let response ={...await Product_dao_mongo_manager.getProducts(req, next) , status}
    res.json(response);
}    

export async function postProductsMongoose (req, res , next){
    res.json(await Product_dao_mongo_manager.postProduct(req,next));
}

export async function getProductsByIDMongoose (req, res , next){
        res.json(await Product_dao_mongo_manager.getProductById(req.params.pid,next));
}

export async function deleteProductsByIDMongoose (req, res , next){
    res.json(await Product_dao_mongo_manager.deleteProductByID(req.params.pid,next));
}

export async function updateProductsByIDMongoose (req, res , next){    
    res.json(await Product_dao_mongo_manager.updateProductByID(req.params.pid,next));
}