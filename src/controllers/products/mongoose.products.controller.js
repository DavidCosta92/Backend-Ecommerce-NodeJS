import { productModel } from "../../../Dao/DBaaS/models/productModel.js";
import { Product } from "../../entities/Product.js";

export async function getProductsMongoose (req, res , next){
    try {
        const products = await productModel.find(); 
        res.json(products);
        } catch (error) {
            next(error);        
    }
}


export async function postProductsMongoose (req, res , next){
    try {
        const {title, description,code, category, thumbnails} = req.body;        
        const price = parseInt(req.body.price);
        const stock = parseInt(req.body.stock);
        const productAdded = await productModel.create({title, description,code, price, stock, category, thumbnails})

        res.json(productAdded);    
    } catch (error) {
        next(error);
    }
}


export async function getProductsByIDMongoose (req, res , next){
    try {
        const product = await productModel.findById(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
}


export async function deleteProductsByIDMongoose (req, res , next){
    try {
        const productDeleted = await productModel.findByIdAndDelete(req.params.pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);        
    }
}

export async function updateProductsByIDMongoose (req, res , next){
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
}