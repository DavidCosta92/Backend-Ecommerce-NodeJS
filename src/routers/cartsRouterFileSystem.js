import express, { Router } from 'express';
import { getCartsFileSystem , postCartsFileSystem , getCartsByIDFileSystem ,deleteCartByIDFileSystem , postProductToCartsFileSystem , deleteProductInCartsFileSystem} from '../controllers/carts/fileSystem.carts.controller.js';

export const cartsRouterFileSystem = Router();

cartsRouterFileSystem.use(express.json()); 
cartsRouterFileSystem.use(express.urlencoded({ extended: true })); 

cartsRouterFileSystem.get("/", getCartsFileSystem)
cartsRouterFileSystem.post("/", postCartsFileSystem)
cartsRouterFileSystem.get("/:cid", getCartsByIDFileSystem)
cartsRouterFileSystem.delete("/:cid", deleteCartByIDFileSystem)
cartsRouterFileSystem.post("/:cid/product/:pid", postProductToCartsFileSystem)
cartsRouterFileSystem.delete("/:cid/product/:pid", deleteProductInCartsFileSystem)