import express, { Router } from 'express';
import { notAdminWeb, onlyAdminWeb, onlyAuthenticatedWeb } from '../../../src/middlewares/authenticator.js';
import { getCartsByIDWEB, getCartsWeb } from '../controllers/cart.web.controller.js';
import { buyCart, deleteAllProductsInCartByID, deleteCartByID, deleteProductInCarts, postProductToCarts, updateAllProductsInCarts, updateQuantityProductInCarts } from '../../../src/controllers/carts/cartController.js';

export const cartsWebRouter = Router();

cartsWebRouter.use(express.json()); 
cartsWebRouter.use(express.urlencoded({ extended: true })); 




// DEBERIA BORRAR ESTE ENDPOINT, COMENTADO POR AHORA 
// cartsWebRouter.post("/",  onlyAuthenticatedApi, onlyAdminApi, postCart) // DEBERIA BORRAR ESTE ENDPOINT, COMENTADO POR AHORA 



cartsWebRouter.get("/:cid/purchase",  onlyAuthenticatedWeb, notAdminWeb, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA
cartsWebRouter.get("/", onlyAuthenticatedWeb, onlyAdminWeb, getCartsWeb)
cartsWebRouter.get("/:cid", onlyAuthenticatedWeb, onlyAdminWeb, getCartsByIDWEB) 
cartsWebRouter.delete("/:cid",  onlyAuthenticatedWeb, onlyAdminWeb, deleteCartByID) // USA EL MISMO DE API 
cartsWebRouter.post("/:cid/products/:pid", onlyAuthenticatedWeb, notAdminWeb, postProductToCarts)  //USA EL MISMO DE API  Capa service valida ownership
cartsWebRouter.delete("/:cid/products/:pid", onlyAuthenticatedWeb, notAdminWeb, deleteProductInCarts)//USA EL MISMO DE API 
cartsWebRouter.delete("/:cid/products", onlyAuthenticatedWeb, deleteAllProductsInCartByID) //USA EL MISMO DE API teoricamente, un user o un premium puede vaciar su propio carrito, y el admin podria vaciar todos
cartsWebRouter.put("/:cid/products/:pid", onlyAuthenticatedWeb, notAdminWeb, updateQuantityProductInCarts) //USA EL MISMO DE API
cartsWebRouter.put("/:cid", onlyAuthenticatedWeb, notAdminWeb, updateAllProductsInCarts) //USA EL MISMO DE API 

