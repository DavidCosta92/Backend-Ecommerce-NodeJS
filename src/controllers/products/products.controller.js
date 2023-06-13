// @ts-nocheck
import { productService } from "../../services/productService.js";

export async function getProducts (req, res , next){  
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;       
    let response ={...await productService.getProducts(req, next) , status}
    res.json(response);
}    

export async function postProducts (req, res , next){
    res.json(await productService.postProduct(req,next));
}

export async function getProductsByID (req, res , next){
        res.json(await productService.getProductById(req.params.pid,next));
}

export async function deleteProductsByID (req, res , next){
    res.json(await productService.deleteProductByID(req.params.pid,next));
}

export async function updateProductsByID (req, res , next){    
    res.json(await productService.updateProductByID(req.params.pid,next));
}

export function mockingproducts(req, res , next){    
    res.json(productService.getMockingProducts(req, res,next));
}