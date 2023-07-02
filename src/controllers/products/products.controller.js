// @ts-nocheck
import { productService } from "../../services/productService.js";
import { userSessionService } from "../../services/sessionService.js";

export async function getProducts (req, res , next){  
    const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;   
    const user = userSessionService.getLoguedUser(req)    
    let response ={...await productService.getProducts(user,req, next) , status}
    res.json(response);
}    

export async function postProducts (req , res , next){  
    res.json(await productService.postProduct(req , res , next));
}

export async function getProductsByID (req , res , next){
    res.json(await productService.getProductById(req , res , next));
}

export async function deleteProductsByID (req , res , next){
    res.json(await productService.deleteProductByID(req , res , next));
}

export async function updateProductsByID (req , res , next){    
    res.json(await productService.updateProductByID(req , res , next));
}

export function mockingproducts(req , res , next){    
    res.json(productService.getMockingProducts(req , res , next));
}