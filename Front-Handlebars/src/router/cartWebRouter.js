import express, { Router } from 'express';
import { notAdminWeb, onlyAdminWeb, onlyAuthenticatedWeb } from '../../../src/middlewares/authenticator.js';
import { getCartsByIDWEB, getCartsWeb } from '../controllers/cart.web.controller.js';
import { buyCart } from '../../../src/controllers/carts/cartController.js';

export const cartsWebRouter = Router();

cartsWebRouter.use(express.json()); 
cartsWebRouter.use(express.urlencoded({ extended: true })); 
cartsWebRouter.get("/:cid/purchase",  onlyAuthenticatedWeb, notAdminWeb, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA
cartsWebRouter.get("/", onlyAuthenticatedWeb, onlyAdminWeb, getCartsWeb)
cartsWebRouter.get("/:cid", onlyAuthenticatedWeb, onlyAdminWeb, getCartsByIDWEB)  
