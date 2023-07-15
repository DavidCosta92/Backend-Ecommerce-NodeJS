// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticatedWeb , onlyAuthenticatedApi , notAdminWeb, notAdminApi, onlyAdminOrPremiumApi, onlyAdminOrPremiumWeb, onlyUser} from '../middlewares/authenticator.js';
import { userSessionService } from '../services/sessionService.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 
productsRouter.get("/", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, getProducts)
productsRouter.get("/add/form" , onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminOrPremiumWeb , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
productsRouter.post('/', onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminOrPremiumApi, postProducts);
productsRouter.get('/:pid', onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminOrPremiumWeb , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminOrPremiumApi , deleteProductsByID); //, 

/*
--- --- REVISAR SI ESTE END LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
productsRouter.put('/:pid', onlyAuthenticated, onlyAdminOrPremium , updateProductsByID);
*/