import express, { Router } from 'express';
import { getCartsFileSystem , postCartsFileSystem , getCartsByIDFileSystem ,deleteCartByIDFileSystem , postProductToCartsFileSystem , deleteProductInCartsFileSystem} from '../controllers/carts/fileSystem.carts.controller.js';
import { getCartsMongoose , postCartMongoose , getCartsByIDMongoose ,deleteCartByIDMongoose , postProductToCartsMongoose , updateAllProductsInCartsMongoose , deleteProductInCartsMongoose , updateQuantityProductInCartsMongoose , deleteAllProductsInCartByIDMongoose , buyCart} from '../controllers/carts/mongoose.carts.controller.js';
import { onlyAuthenticated } from '../middlewares/authenticator.js';
export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 


// mongoose
cartsRouter.get("/",onlyAuthenticated, getCartsMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO





cartsRouter.post("/:cid", buyCart) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO

//cartsRouter.post("/:cid/summary", summary)





cartsRouter.post("/", postCartMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.get("/:cid", getCartsByIDMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid", deleteCartByIDMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.post("/:cid/products/:pid", postProductToCartsMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid/products/:pid", deleteProductInCartsMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.delete("/:cid/products", deleteAllProductsInCartByIDMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.put("/:cid/products/:pid", updateQuantityProductInCartsMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO
cartsRouter.put("/:cid", updateAllProductsInCartsMongoose) // ACA ES DONDE DEBERIA LLAMAR A servicio.GETCART, Y QUE ESTE METODO LLAME AL REPOSITORIO, QUIEN SERA EL QUE LLAME AL DAO



// file system
cartsRouter.get("/fs/",onlyAuthenticated, getCartsFileSystem)
cartsRouter.post("/fs/", postCartsFileSystem)
cartsRouter.get("/fs/:cid", getCartsByIDFileSystem)
cartsRouter.delete("/fs/:cid", deleteCartByIDFileSystem)
cartsRouter.post("/fs/:cid/product/:pid", postProductToCartsFileSystem)
cartsRouter.delete("/fs/:cid/product/:pid", deleteProductInCartsFileSystem)


