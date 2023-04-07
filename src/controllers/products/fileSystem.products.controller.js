import { ProductManager } from "../../managers/ProductManager.js";
import { randomUUID } from "crypto";
import { Product } from "../../entities/Product.js";

const productManager = new ProductManager ("Dao/FileSystem");

export async function getProductsFileSystem (req, res , next){
    try {
        const products = await productManager.getProducts(req.query.limit);
        res.json(products);
        } catch (error) {
            next(error);        
    }
}

export async function postProductsFileSystem (req, res , next){
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
}

export async function getProductsByIDFileSystem (req, res , next){
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductsByIDFileSystem (req, res , next){
    try {
        const productDeleted = await productManager.deleteById(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);        
    }
}

export async function updateProductsByIDFileSystem (req, res , next){
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
}