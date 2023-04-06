import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { CartManager } from '../CartManager.js';
import { cartstModel } from '../../Dao/models/cartModel.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

const cartManager = new CartManager ("database"); 


cartsRouter.get("/", async (req, res , next) => {
    try {
        const carts = await cartstModel.find(); 
        res.json(carts);
    } catch (error) {
        next(error);
    }
})

cartsRouter.post("/", async (req, res , next) => {
    try {
        //const idCart = randomUUID();
        //const newCart = await cartManager.createCart(idCart);
        const newCart = await cartstModel.create({});
        res.json(newCart);
    } catch (error) {
        next(error);
    }
})

cartsRouter.get("/:cid", async (req, res , next) => { 
    try {
       // const productsInCart = await cartManager.getProductsByCartId(req.params.cid);
       const cart = await cartstModel.findById(req.params.cid).populate("products.product");
        res.json(cart);
    } catch (error) {
        next(error);
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res , next) => {    
    try {

       // const productAdded = await cartManager.addProductToCart(req.params.cid , req.params.pid, req.query.quantity);
        const productAdded = await cartManager.addProductToCartMONGOOSE(req.params.cid , req.params.pid, req.query.quantity);
        
       res.json(productAdded);
    } catch (error) {
        next(error);
    }
})

cartsRouter.delete("/:cid", async (req, res , next) => {
    try {
        const deleted = await cartManager.deleteCartById(req.params.cid)
        res.json(deleted);
    } catch (error) {        
        next(error);
    }
})

cartsRouter.delete("/:cid/product/:pid", async (req, res , next) => {
    try {
        const actualProducts = await cartManager.deleteProductInCartMONGOOSE(req.params.cid , req.params.pid)
        res.json(actualProducts);
    } catch (error) {        
        next(error);
    }
})