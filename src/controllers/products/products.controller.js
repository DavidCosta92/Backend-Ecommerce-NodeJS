// @ts-nocheck
import { productService } from "../../services/productService.js";
import { userSessionService } from "../../services/sessionService.js";

export async function getProducts (req, res , next){  
    const user = userSessionService.getLoguedUser(req)    
    res.json(await productService.getProducts(user, req, next));
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
export function mockingproducts(req , res , next){    
    res.json(productService.getMockingProducts(req , res , next));
}

/*
--- --- REVISAR SI ESTE METODO LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
export async function updateProductsByID (req , res , next){    
    res.json(await productService.updateProductByID(req , res , next));
}
*/