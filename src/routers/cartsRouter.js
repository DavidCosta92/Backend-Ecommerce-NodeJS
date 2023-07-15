import express, { Router } from 'express';
import { onlyAuthenticatedWeb , onlyAuthenticatedApi , onlyAdminWeb, onlyAdminApi, onlyUser , notAdminWeb,notAdminApi, onlyAdminOrPremiumApi , onlyAdminOrPremiumWeb} from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';


export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 
cartsRouter.get("/:cid/purchase",  onlyAuthenticatedApi /* onlyAuthenticatedWeb */, notAdminWeb, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA

cartsRouter.get("/",  onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminApi /*onlyAdminWeb */, getCarts)  // onlyAdminOrPremium

cartsRouter.post("/",  onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminApi /*onlyAdminWeb */, postCart)
cartsRouter.get("/:cid",  onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminApi /*onlyAdminWeb */, getCartsByID) 
cartsRouter.delete("/:cid",  onlyAuthenticatedApi /* onlyAuthenticatedWeb */, onlyAdminApi /*onlyAdminWeb */, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, notAdminWeb, postProductToCarts)  // esta ruta esta protegida no por un midd, sino por el servicio, que corrobora que no sea owner
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, notAdminWeb, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, deleteAllProductsInCartByID) // teoricamente, un user o un premium puede vaciar su propio carrito, y el admin podria vaciar todos
cartsRouter.put("/:cid/products/:pid", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, notAdminWeb, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticatedApi /* onlyAuthenticatedWeb */, notAdminWeb, updateAllProductsInCarts)  
