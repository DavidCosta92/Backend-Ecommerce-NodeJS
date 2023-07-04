// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID , updateProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticated , onlyAdmin, onlyAdminOrPremium, onlyUser} from '../middlewares/authenticator.js';
import { userSessionService } from '../services/sessionService.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

productsRouter.get("/", onlyAuthenticated, getProducts)

productsRouter.get("/add/form" , onlyAuthenticated, onlyAdminOrPremium , (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})

productsRouter.post('/', onlyAuthenticated, onlyAdminOrPremium, postProducts);

productsRouter.get('/:pid', onlyAuthenticated, onlyAdminOrPremium , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticated, onlyAdminOrPremium , deleteProductsByID);
productsRouter.put('/:pid', onlyAuthenticated, onlyAdminOrPremium , updateProductsByID);