import express, { Router } from 'express';
import { onlyAuthenticated } from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';



// ESTOS IMPORT LOS DEBO BORRAR Y CAMBIAR TODO SOLO POR CART CONTROLERS, pero antes debo migrar la logica al repositorio quien determinara si va a ser fs o mongo, y debo elimianr todas las rutas al pedo de fs ya que dejaran de existir..

import { getCartsFileSystem , postCartsFileSystem , getCartsByIDFileSystem ,deleteCartByIDFileSystem , postProductToCartsFileSystem , deleteProductInCartsFileSystem} from '../controllers/carts/fileSystem.carts.controller.js';





export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

// FUNCIONAMIENTO PENDIENTE
// FUNCIONAMIENTO PENDIENTE
// FUNCIONAMIENTO PENDIENTE
// FUNCIONAMIENTO PENDIENTE
cartsRouter.post("/:cid", buyCart) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
//cartsRouter.post("/:cid/summary", summary)
// FUNCIONAMIENTO PENDIENTE
// FUNCIONAMIENTO PENDIENTE
// FUNCIONAMIENTO PENDIENTE

// mongoose
cartsRouter.get("/",onlyAuthenticated, getCarts) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO




cartsRouter.post("/", postCart) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.get("/:cid", getCartsByID) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid", deleteCartByID) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.post("/:cid/products/:pid", postProductToCarts) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid/products/:pid", deleteProductInCarts) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid/products", deleteAllProductsInCartByID) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.put("/:cid/products/:pid", updateQuantityProductInCarts) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.put("/:cid", updateAllProductsInCarts) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO



// file system
cartsRouter.get("/fs/",onlyAuthenticated, getCartsFileSystem)
cartsRouter.post("/fs/", postCartsFileSystem)
cartsRouter.get("/fs/:cid", getCartsByIDFileSystem)
cartsRouter.delete("/fs/:cid", deleteCartByIDFileSystem)
cartsRouter.post("/fs/:cid/product/:pid", postProductToCartsFileSystem)
cartsRouter.delete("/fs/:cid/product/:pid", deleteProductInCartsFileSystem)


