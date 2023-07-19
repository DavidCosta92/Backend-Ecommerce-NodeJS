// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticatedApi , onlyAdminOrPremiumApi} from '../middlewares/authenticator.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

// localhost:8080/api/products
productsRouter.get("/", onlyAuthenticatedApi, getProducts)
productsRouter.post('/', onlyAuthenticatedApi, onlyAdminOrPremiumApi, postProducts);
productsRouter.get('/:pid', onlyAuthenticatedApi, onlyAdminOrPremiumApi , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticatedApi, onlyAdminOrPremiumApi , deleteProductsByID); 
 
// borrar porque no deberia renderizar nada...
// productsRouter.get("/add/form" , onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , (req, res, next)=>{    
//     const user = userSessionService.getLoguedUser(req)
//     res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
// })



/*
--- --- REVISAR SI ESTE END LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
productsRouter.put('/:pid', onlyAuthenticated, onlyAdminOrPremium , updateProductsByID);
*/