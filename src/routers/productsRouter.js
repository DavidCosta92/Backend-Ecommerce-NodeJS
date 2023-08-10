// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID , editProductsByID} from '../controllers/products.controller.js';
import { onlyAuthenticatedApi , onlyAdminOrPremiumApi} from '../middlewares/authenticator.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

productsRouter.get("/", onlyAuthenticatedApi, getProducts)
productsRouter.post('/', onlyAuthenticatedApi, onlyAdminOrPremiumApi, postProducts);

productsRouter.get('/:pid', onlyAuthenticatedApi, onlyAdminOrPremiumApi , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticatedApi, onlyAdminOrPremiumApi , deleteProductsByID); 
productsRouter.put("/:pid" , onlyAuthenticatedApi, onlyAdminOrPremiumApi , editProductsByID); 
