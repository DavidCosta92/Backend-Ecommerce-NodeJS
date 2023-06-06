import express, { Router } from 'express';
import { onlyAuthenticated , onlyAdmin, onlyUser} from '../middlewares/authenticator.js';

import { getCarts , postCart , getCartsByID ,deleteCartByID , postProductToCarts , updateAllProductsInCarts , deleteProductInCarts , updateQuantityProductInCarts , deleteAllProductsInCartByID , buyCart} from '../controllers/carts/cartController.js';
import { renderCartViewById } from '../controllers/views/views.controller.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

///cartsRouter.post("/:cid", onlyAuthenticated, onlyUser, buyCart) 
cartsRouter.get("/:cid/purchase", onlyAuthenticated, onlyUser, buyCart) // => EL DESAFIO PIDE ESTA RUTA ESPECIFICA

cartsRouter.get("/", onlyAuthenticated, onlyUser, getCarts)  
cartsRouter.post("/", onlyAuthenticated, onlyAdmin, postCart)
cartsRouter.get("/:cid", onlyAuthenticated, onlyAdmin, getCartsByID) 
cartsRouter.delete("/:cid", onlyAuthenticated, onlyAdmin, deleteCartByID) 
cartsRouter.post("/:cid/products/:pid", onlyAuthenticated, onlyUser, postProductToCarts)
cartsRouter.delete("/:cid/products/:pid", onlyAuthenticated, onlyUser, deleteProductInCarts)
cartsRouter.delete("/:cid/products", onlyAuthenticated, onlyUser, deleteAllProductsInCartByID)
cartsRouter.put("/:cid/products/:pid", onlyAuthenticated, onlyUser, updateQuantityProductInCarts)
cartsRouter.put("/:cid", onlyAuthenticated, onlyUser, updateAllProductsInCarts)







// ESTOS IMPORT LOS DEBO BORRAR Y CAMBIAR TODO SOLO POR CART CONTROLERS, pero antes debo migrar la logica al repositorio quien determinara si va a ser fs o mongo, y debo elimianr todas las rutas al pedo de fs ya que dejaran de existir..

import { getCartsFileSystem , postCartsFileSystem , getCartsByIDFileSystem ,deleteCartByIDFileSystem , postProductToCartsFileSystem , deleteProductInCartsFileSystem} from '../controllers/carts/fileSystem.carts.controller.js';


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


