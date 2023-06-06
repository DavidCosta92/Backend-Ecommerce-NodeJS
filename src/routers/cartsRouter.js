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


// RUTAS CON PATRON REPOSITORY LISTO
cartsRouter.get("/",onlyAuthenticated, getCarts)
cartsRouter.post("/", postCart)
cartsRouter.get("/:cid", getCartsByID)
cartsRouter.delete("/:cid", deleteCartByID)
cartsRouter.post("/:cid/products/:pid", postProductToCarts)
cartsRouter.delete("/:cid/products/:pid", deleteProductInCarts)
cartsRouter.delete("/:cid/products", deleteAllProductsInCartByID)
cartsRouter.put("/:cid/products/:pid", updateQuantityProductInCarts)
cartsRouter.put("/:cid", updateAllProductsInCarts)



// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
cartsRouter.get("/fs/",onlyAuthenticated, getCartsFileSystem)
cartsRouter.post("/fs/", postCartsFileSystem)
cartsRouter.get("/fs/:cid", getCartsByIDFileSystem)
cartsRouter.delete("/fs/:cid", deleteCartByIDFileSystem)
cartsRouter.post("/fs/:cid/product/:pid", postProductToCartsFileSystem)
cartsRouter.delete("/fs/:cid/product/:pid", deleteProductInCartsFileSystem)
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS


