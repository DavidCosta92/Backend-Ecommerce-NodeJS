// @ts-nocheck
import { productService } from "../services/productService.js";

export async function getProducts (req, res , next){  
    res.json(await productService.getProducts(req, next));
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
export async function editProductsByID (req , res , next){
    res.json(await productService.editProductsByID(req , res , next));
}
export function mockingproducts(req , res , next){    
    res.json(productService.getMockingProducts(req , res , next));
}
