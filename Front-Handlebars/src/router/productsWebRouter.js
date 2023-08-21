// @ts-nocheck
import express, { Router } from 'express';
import { onlyAdminOrPremiumWeb, onlyAuthenticatedWeb } from '../../../src/middlewares/authenticator.js';
import { getProductsByIDWEB, getProductsWeb } from '../controllers/products.web.controller.js';
import { userSessionService } from '../../../src/services/sessionService.js';
import { productService } from '../../../src/services/productService.js';

export const productsWebRouter = Router();
productsWebRouter.use(express.json()); 

productsWebRouter.get("/", onlyAuthenticatedWeb, getProductsWeb)

productsWebRouter.get("/add/form" , onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
productsWebRouter.get("/:pid/edit/form" , onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , async (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    const {id, title ,description , code , price , stock , category , thumbnails } = await productService.getProductById(req, res, next)
    res.render("formularioEdiccionProductos", {loguedUser : user!=undefined, user : user , product : {id ,title ,description , code , price , stock , category , thumbnails }})
})
productsWebRouter.get('/:pid',onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , getProductsByIDWEB);