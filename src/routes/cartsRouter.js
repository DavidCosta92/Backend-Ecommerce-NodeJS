import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { CartManager } from '../CartManager.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

const cartManager = new CartManager ("database/carrito.json"); 

cartsRouter.post("/", async (req, res) => {
    try {
        const idCart = randomUUID();
        const newCart = await cartManager.createCart(idCart);
        res.json(newCart);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const productsInCart = await cartManager.getProductsByCartId(req.params.cid);
        res.json(productsInCart);
    } catch (error) {
        res.status(404).json({menssage: error.message})
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {    
    try {
        const productAdded = await cartManager.addProductToCart(req.params.cid , req.params.pid, req.query.quantity);
        res.json(productAdded);
    } catch (error) {
        res.status(404).json({menssage: error.message})
    }
})