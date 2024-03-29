import express, { Router } from 'express';
import { onlyAuthenticatedApi, onlyAdminApi, notAdminApi} from '../middlewares/authenticator.js';
import { getCarts, getCartsByID,deleteCartByID, postProductToCarts, updateAllProductsInCarts, deleteProductInCarts, updateQuantityProductInCarts, deleteAllProductsInCartByID, buyCart} from '../controllers/cartController.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

cartsRouter.get("/:cid/purchase",  onlyAuthenticatedApi, notAdminApi, buyCart) // => CODER PIDE ESTA RUTA ESPECIFICA
cartsRouter.get("/",  onlyAuthenticatedApi, onlyAdminApi, getCarts)
cartsRouter.get("/:cid",  onlyAuthenticatedApi, onlyAdminApi, getCartsByID) 
cartsRouter.delete("/:cid",  onlyAuthenticatedApi, onlyAdminApi, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticatedApi, notAdminApi, postProductToCarts)  // Capa service valida ownership
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticatedApi, notAdminApi, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticatedApi, deleteAllProductsInCartByID) // negocio dice que, un user admin podria vaciar carritos de cualquier user
cartsRouter.put("/:cid/products/:pid", onlyAuthenticatedApi, notAdminApi, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticatedApi, notAdminApi, updateAllProductsInCarts)  
