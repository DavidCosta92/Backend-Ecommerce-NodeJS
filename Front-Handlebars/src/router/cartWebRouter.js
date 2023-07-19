import express, { Router } from 'express';
import { notAdminWeb, onlyAdminWeb, onlyAuthenticatedWeb } from '../../../src/middlewares/authenticator.js';
import { buyCartWeb, getCartsByIDWEB, getCartsWeb } from '../controllers/cart.web.controller.js';

export const cartsWebRouter = Router();

cartsWebRouter.use(express.json()); 
cartsWebRouter.use(express.urlencoded({ extended: true })); 
cartsWebRouter.get("/:cid/purchase",  onlyAuthenticatedWeb, notAdminWeb, buyCartWeb) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA
cartsWebRouter.get("/", onlyAuthenticatedWeb, onlyAdminWeb, getCartsWeb)
cartsWebRouter.get("/:cid", onlyAuthenticatedWeb, onlyAdminWeb, getCartsByIDWEB)  
