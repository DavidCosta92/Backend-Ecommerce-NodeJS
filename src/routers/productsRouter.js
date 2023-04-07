import express, { Router } from 'express';
import {randomUUID} from 'crypto';
import { Product } from '../Product.js';
import { ProductManager } from '../ProductManager.js';
import { productModel } from '../../Dao/models/productModel.js';

export const productsRouter = Router();

productsRouter.use(express.json()); 

const productManager = new ProductManager ("Dao/FileSystem");


// >>>>>>>> FILE SISTEM <<<<<<<<<<
productsRouter.get("/fs/" , async (req, res , next) => {
    try {
     const products = await productManager.getProducts(req.query.limit);
     res.json(products);
     } catch (error) {
         next(error);        
     }
 });

 productsRouter.post('/fs/', async (req, res , next) => {
    try {
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

productsRouter.get('/fs/:pid', async (req, res , next)=>{
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

productsRouter.put('/fs/:pid', async (req, res , next)=>{
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

productsRouter.delete("/fs/:pid" , async (req, res , next) => {
    try {
        const productDeleted = await productManager.deleteById(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);        
    }
});



 // >>>>>>>> MONGOOSE ATLAS DBasS <<<<<<<<<<

productsRouter.get("/" , async (req, res , next) => {
   try {
    const products = await productModel.find(); 
    res.json(products);
    } catch (error) {
        next(error);        
    }
});


productsRouter.post('/', async (req, res , next) => {
    try {
        const {title, description,code, category, thumbnails} = req.body;        
        const price = parseInt(req.body.price);
        const stock = parseInt(req.body.stock);
        const productAdded = await productModel.create({title, description,code, price, stock, category, thumbnails})

        res.json(productAdded);    
    } catch (error) {
        next(error);
    }
});

productsRouter.get('/:pid', async (req, res , next)=>{
    try {
        const product = await productModel.findById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

productsRouter.delete("/:pid" , async (req, res , next) => {
    try {
        const productDeleted = await productModel.findByIdAndDelete(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);        
    }
});

productsRouter.put('/:pid', async (req, res , next)=>{
    let newProduct;
    try {
        newProduct = new Product({
            ...req.body
        })
    } catch (error) {
        return next(error);
    }
    
    try {
        await productModel.findByIdAndUpdate(req.params.pid, newProduct)
        res.json(await productModel.findById(req.params.pid));
    } catch (error) {
        next(error);
    }

});