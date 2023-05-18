// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { DB_mongo_product_manager } from "../../managers/mongoose/database.product.Manager.js";

export async function getProductsMongoose (req, res , next){    
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
    let response ={...await DB_mongo_product_manager.getProducts(req,next) , status}
    res.json(response);
}    

export async function postProductsMongoose (req, res , next){
    res.json(await DB_mongo_product_manager.postProduct(req,next));
}

export async function getProductsByIDMongoose (req, res , next){
    res.json(await DB_mongo_product_manager.getProductById(req.params.pid,next));
    try {
        const product = await productModel.findById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductsByIDMongoose (req, res , next){
    res.json(await DB_mongo_product_manager.deleteProductByID(req.params.pid,next));
}

export async function updateProductsByIDMongoose (req, res , next){    
    res.json(await DB_mongo_product_manager.updateProductByID(req.params.pid,next));
}