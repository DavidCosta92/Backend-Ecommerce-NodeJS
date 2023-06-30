// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID , updateProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticated , onlyAdmin, onlyUser} from '../middlewares/authenticator.js';
import { userSessionService } from '../services/sessionService.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

productsRouter.get("/",  getProducts)
productsRouter.get("/add/form" , onlyAuthenticated, onlyAdmin , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
productsRouter.post('/', onlyAuthenticated, onlyAdmin, postProducts);
productsRouter.get('/:pid', onlyAuthenticated, onlyAdmin , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticated, onlyAdmin , deleteProductsByID);
productsRouter.put('/:pid', onlyAuthenticated, onlyAdmin , updateProductsByID);