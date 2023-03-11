import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { Cart } from '../Cart.js';
import { CartManager } from '../CartManager.js';

export const cartsRouter = Router();

cartsRouter.use(express.json()); 
cartsRouter.use(express.urlencoded({ extended: true })); 

const cartManager = new CartManager ("database/carrito.txt"); // DEBERIA SER .JSON??????

cartsRouter.post("/", async (req, res) => {
    try {
        const idCart = randomUUID();
        const newCart = await cartManager.createCart(idCart);
        res.json(newCart);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
/*
 deberá crear un nuevo carrito con la siguiente estructura:
Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
products: Array que contendrá objetos que representen cada producto
*/
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
    // localhost:8080/api/carts/b8c28c4d-a4cd-4f3a-90e8-39378392f0ee/product/123123?quantity=500
    
    try {
        const productAdded = await cartManager.addProductToCart(req.params.cid , req.params.pid, req.query.quantity);
        res.json(productAdded);
    } catch (error) {
        res.status(404).json({menssage: error.message})
    }
    /*
    1) buscar cart
    2) agregar product al carrito
    3)
    -deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
    -quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

    -Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
    */
})