// @ts-nocheck
import { NotFoundError, NotFoundErrorWeb } from "../../../src/models/errors/carts.error.js";
import { productService } from "../../../src/services/productService.js";
import { productsWebService } from "../service/productsWebService.js";


export async function getProductsWeb (req, res , next){  
   try {      
      const dataRender = await productsWebService.getProductsWeb(req, res, next)
      res.render("productsView", dataRender)        
   } catch (error) {
      console.log("deberia luego venir por aqui....")
      next(error)
   }
}    
export async function getProductsByIDWEB (req , res , next){
    try {
        const {user , loguedUser , title , product} = await productsWebService.getProductsByIdWeb(req, res, next)  
        res.render("productByIdView", { user , loguedUser, title , product : {...product}} )        
     } catch (error) {
        next(error)
     }
}
export async function mockingproductsWEB(req , res , next){    
    try {
        const dataRender = await productsWebService.mockingproductsWEB(req , res , next)
        res.render("productsView", dataRender)        
     } catch (error) {
        next(error)
     }
}

/*
--- --- REVISAR SI ESTE METODO LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
export async function updateProductsByID (req , res , next){    
    res.json(await productService.updateProductByID(req , res , next));
}
*/