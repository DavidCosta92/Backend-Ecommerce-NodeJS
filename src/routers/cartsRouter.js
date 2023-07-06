import express, { Router } from 'express';
import { onlyAuthenticated , onlyAdmin, onlyUser , notAdminWeb,notAdminApi, onlyAdminOrPremiumApi , onlyAdminOrPremiumWeb} from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';


export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 
cartsRouter.get("/:cid/purchase", onlyAuthenticated, notAdminWeb, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA

cartsRouter.get("/", onlyAuthenticated, onlyAdmin, getCarts)  // onlyAdminOrPremium
cartsRouter.post("/", onlyAuthenticated, onlyAdmin, postCart)
cartsRouter.get("/:cid", onlyAuthenticated, onlyAdmin, getCartsByID) 
cartsRouter.delete("/:cid", onlyAuthenticated, onlyAdmin, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticated, notAdminWeb, postProductToCarts)  // esta ruta esta protegida no por un midd, sino por el servicio, que corrobora que no sea owner
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticated, notAdminWeb, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticated, deleteAllProductsInCartByID) // teoricamente, un user o un premium puede vaciar su propio carrito, y el admin podria vaciar todos
cartsRouter.put("/:cid/products/:pid", onlyAuthenticated, notAdminWeb, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticated, notAdminWeb, updateAllProductsInCarts)  
