import express, { Router } from 'express';
import { onlyAuthenticated , onlyAdmin, onlyUser} from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';


export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 
cartsRouter.get("/:cid/purchase", onlyAuthenticated, onlyUser, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA


cartsRouter.get("/", onlyAuthenticated, onlyAdmin, getCarts)  
cartsRouter.post("/", onlyAuthenticated, onlyAdmin, postCart)
cartsRouter.get("/:cid", onlyAuthenticated, onlyAdmin, getCartsByID) 
cartsRouter.delete("/:cid", onlyAuthenticated, onlyAdmin, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticated, onlyUser, postProductToCarts)
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticated, onlyUser, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticated, onlyUser, deleteAllProductsInCartByID)
cartsRouter.put("/:cid/products/:pid", onlyAuthenticated, onlyUser, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticated, onlyUser, updateAllProductsInCarts)
