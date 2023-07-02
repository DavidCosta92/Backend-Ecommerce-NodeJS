// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID , updateProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticated , onlyAdmin, onlyAdminOrOwner, onlyUser} from '../middlewares/authenticator.js';
import { userSessionService } from '../services/sessionService.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

productsRouter.get("/", onlyAuthenticated, getProducts)

productsRouter.get("/add/form" , onlyAuthenticated, onlyAdminOrOwner , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})

productsRouter.post('/', onlyAuthenticated, onlyAdminOrOwner, postProducts);

productsRouter.get('/:pid', onlyAuthenticated, onlyAdmin , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticated, onlyAdminOrOwner , deleteProductsByID);
productsRouter.put('/:pid', onlyAuthenticated, onlyAdmin , updateProductsByID);