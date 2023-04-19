import express, { Router } from 'express';
import { getCartsFileSystem , postCartsFileSystem , getCartsByIDFileSystem ,deleteCartByIDFileSystem , postProductToCartsFileSystem , deleteProductInCartsFileSystem} from '../controllers/carts/fileSystem.carts.controller.js';
import { getCartsMongoose , postCartsMongoose , getCartsByIDMongoose ,deleteCartByIDMongoose , postProductToCartsMongoose , updateAllProductsInCartsMongoose , deleteProductInCartsMongoose , updateQuantityProductInCartsMongoose , deleteAllProductsInCartByIDMongoose} from '../controllers/carts/mongoose.carts.controller.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 


// mongoose
cartsRouter.get("/", getCartsMongoose)
cartsRouter.post("/", postCartsMongoose)
cartsRouter.get("/:cid", getCartsByIDMongoose)
cartsRouter.delete("/:cid", deleteCartByIDMongoose)
cartsRouter.post("/:cid/products/:pid", postProductToCartsMongoose)
cartsRouter.delete("/:cid/products/:pid", deleteProductInCartsMongoose)
cartsRouter.delete("/:cid/products", deleteAllProductsInCartByIDMongoose)
cartsRouter.put("/:cid/products/:pid", updateQuantityProductInCartsMongoose)
cartsRouter.put("/:cid", updateAllProductsInCartsMongoose)

// file system
cartsRouter.get("/fs/", getCartsFileSystem)
cartsRouter.post("/fs/", postCartsFileSystem)
cartsRouter.get("/fs/:cid", getCartsByIDFileSystem)
cartsRouter.delete("/fs/:cid", deleteCartByIDFileSystem)
cartsRouter.post("/fs/:cid/product/:pid", postProductToCartsFileSystem)
cartsRouter.delete("/fs/:cid/product/:pid", deleteProductInCartsFileSystem)


