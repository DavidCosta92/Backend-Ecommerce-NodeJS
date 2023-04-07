import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { Product } from '../Product.js';
import { ProductManager } from '../ProductManager.js';
import { productModel } from '../../Dao/models/productModel.js';
import { io } from '../app/servidor.js';

export const productsRouter = Router();

productsRouter.use(express.json()); 
// solo para cuando enviamos la info por la url
//productsRouter.use(express.urlencoded({ extended: true })); 

const productManager = new ProductManager ("Dao/FileSystem");

productsRouter.get("/" , async (req, res , next) => {
   try {
    //const products = await productManager.getProducts(req.query.limit);
    const products = await productModel.find(); 
    res.json(products);
    } catch (error) {
        next(error);        
    }
});

/*
boorraaar
productsRouter.get("/formCargaProd", (req, res, next)=>{
    res.render("uploadProduct", {title: "carga productooooos"})
})

*/
productsRouter.post('/', async (req, res , next) => {
    try {
        /*
        const id = randomUUID();
        const precio = parseInt(req.body.price);
        const stock = parseInt(req.body.stock);
        const product = new Product({
            id : id,
            ...req.body
        }) 
        product.price=precio;
        product.stock=stock;
        const productAdded = await productManager.addProduct(product);        
        */
        const {title, description,code, category, thumbnails} = req.body;        
        const price = parseInt(req.body.price);
        const stock = parseInt(req.body.stock);
        const productAdded = await productModel.create({title, description,code, price, stock, category, thumbnails})

        res.json(productAdded);    
    } catch (error) {
        next(error);
    }

/* Product post prueba
{
  "title" : "pan",
  "description" : "trincha",
  "code" : "pan124",
  "price" : 100,
  "stock" : 5,
  "category" : "comestibles",
  "thumbnails" : [
                  "./img/panificados/pan/1.png",
                  "./img/panificados/pan/2.png",
                  "./img/panificados/pan/3.png"
                  ]
}
*/

});

productsRouter.get('/:pid', async (req, res , next)=>{
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

productsRouter.put('/:pid', async (req, res , next)=>{
    let newProduct;
    try {
        newProduct = new Product({
            id:req.params.pid,
            ...req.body
        })
    } catch (error) {
        return next(error);
    }
    
    try {
        const productUpdated = await productManager.updateProductById(req.params.pid, newProduct);
        res.json(productUpdated);
    } catch (error) {
        next(error);
    }

});

productsRouter.delete("/:pid" , async (req, res , next) => {
    try {
        const productDeleted = await productManager.deleteById(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);        
    }
});
