import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { Product } from '../Product.js';
import { ProductManager } from '../ProductManager.js';

export const productsRouter = Router();

productsRouter.use(express.json()); 
productsRouter.use(express.urlencoded({ extended: true })); 

const productManager = new ProductManager ("database/products.txt"); // DEBERIA SER .JSON??????

productsRouter.get("/" , async (req, res) => { // localhost:8080/products?limit=2
   try {
    const products = await productManager.getProducts(req.query.limit);
    res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

productsRouter.post('/', async (req, res) => { // localhost:8080/products
    try {
        const id = randomUUID();
        const product = new Product({
            id : id,
            ...req.body
        }) 

        /*        
        const product= new Product (id, req.body.title, req.body.description , req.body.code ,req.body.price ,req.body.stock ,req.body.category, req.body.thumbnails);
        */

        const productAdded = await productManager.addProduct(product);
        res.json(productAdded);
        
    } catch (error) {
        res.status(500).json({menssage: error.message});

        // ver 
        //maneras nuevas 
        //de manejar error
    }
/* Product post prueba
{
  "title" : "pan",
  "description" : "trincha",
  "code" : "pan124",
  "price" : 100,
  "stock" : 5,
  "category" : "panificados",
  "thumbnails" : [
                  "./img/panificados/pan/1.png",
                  "./img/panificados/pan/2.png",
                  "./img/panificados/pan/3.png"
                  ]
}
*/

});

productsRouter.get('/:pid', async (req, res)=>{ // localhost:8080/products/b1c5e6f6-e44c-4b39-973d-53c735377d5d
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({menssage: error.message})
    }
});

productsRouter.put('/:pid', async (req, res)=>{ // localhost:8080/products/b1c5e6f6-e44c-4b39-973d-53c735377d5d
    let newProduct;
    try {
        newProduct = new Product({
            id:req.params.pid,
            ...req.body
        })
    } catch (error) {
        res.status(400).json({menssage: error.message})
    }

    try {
        const productUpdated = await productManager.updateProductById(req.params.pid, newProduct);
        res.json(productUpdated);
    } catch (error) {
        res.status(404).json({menssage: error.message})
    }

});

productsRouter.delete("/:pid" , async (req, res) => {
    try {
        const productDeleted = await productManager.deleteById(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
});

