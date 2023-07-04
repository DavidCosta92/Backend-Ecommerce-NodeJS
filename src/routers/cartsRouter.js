import express, { Router } from 'express';
import { onlyAuthenticated , onlyAdmin, onlyUser , notAdmin, onlyAdminOrPremium} from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';


export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 
cartsRouter.get("/:cid/purchase", onlyAuthenticated, notAdmin, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA


cartsRouter.get("/", onlyAuthenticated, onlyAdminOrPremium, getCarts)  
cartsRouter.post("/", onlyAuthenticated, onlyAdmin, postCart)
cartsRouter.get("/:cid", onlyAuthenticated, onlyAdminOrPremium, getCartsByID) 
cartsRouter.delete("/:cid", onlyAuthenticated, onlyAdmin, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticated, notAdmin, postProductToCarts)
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticated, notAdmin, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticated, notAdmin, deleteAllProductsInCartByID)
cartsRouter.put("/:cid/products/:pid", onlyAuthenticated, notAdmin, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticated, notAdmin, updateAllProductsInCarts)
