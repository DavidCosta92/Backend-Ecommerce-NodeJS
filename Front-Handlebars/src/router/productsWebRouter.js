// @ts-nocheck
import express, { Router } from 'express';
import { authenticatorWeb, onlyAdminOrPremiumWeb, onlyAuthenticatedWeb } from '../../../src/middlewares/authenticator.js';
import { getProductsByIDWEB, getProductsWeb } from '../controllers/products.web.controller.js';
import { userSessionService } from '../../../src/services/sessionService.js';
import { deleteProductsByID, postProducts } from '../../../src/controllers/products/products.controller.js';

export const productsWebRouter = Router();
productsWebRouter.use(express.json()); 

productsWebRouter.get("/", authenticatorWeb, onlyAuthenticatedWeb, getProductsWeb)
productsWebRouter.get("/add/form" , authenticatorWeb, onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
productsWebRouter.post('/',authenticatorWeb, onlyAuthenticatedWeb, onlyAdminOrPremiumWeb, postProducts); // usa el API
productsWebRouter.get('/:pid',authenticatorWeb, onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , getProductsByIDWEB);
productsWebRouter.delete("/:pid" ,authenticatorWeb, onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , deleteProductsByID); // usa el API

/*
--- --- REVISAR SI ESTE END LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
productsRouter.put('/:pid', onlyAuthenticated, onlyAdminOrPremium , updateProductsByID);
*/