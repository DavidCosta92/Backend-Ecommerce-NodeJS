// @ts-nocheck
import { productModel } from "../../../Dao/DBaaS/models/productModel.js";
import { Product } from "../../entities/Product.js";

/* http://localhost:8080/api/products/?category=comestibles&limit=2&page=2&sort=asc */
export async function getProductsMongoose (req, res , next){
    try {
        const categorySearch = (req.query.category == "" || req.query.category == undefined) ? "" : { category: {$eq:req.query.category}};
        const stock = (req.query.stock == "" || req.query.stock == undefined || req.query.stock != "true" ) ? "" : { stock: {$gt:10}};      
        

        /* PENDIENTE, CATEGORY Y STOCK FUNCIONAN POR SEPARADO PERO NO JUNTAS.. */
        //const searchParams = {$and:[{categorySearch , stock}]}

        const searchParams = {}// {category: {$eq:req.query.category} ,  stock: {$gt:3} }
        

        const limit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 1 : req.query.limit
        const page =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page
        let sortByPrice = null;
        if(req.query.sort!= undefined) sortByPrice = (req.query.sort === "asc" )? { price : 1} : { price : -1} 
        const pageOptions = { limit: limit, page: page, sort : sortByPrice , lean : true/* ESTO SI O SI PARA QUE HANDLEBARS PUEDA RENDERIZAR.. */  }
        const products = await productModel.paginate( searchParams ,pageOptions)

        const response ={
            status : res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`,
            payload : products.docs,
            totalPages : products.totalPages,
            prevPage : products.prevPage,
            nextPage : products.nextPage,
            page : products.page,
            hasPrevPage : products.hasPrevPage,
            hasNextPage : products.hasNextPage,
            prevLink : products.prevPage? `/api/products/?limit=${limit}&page=${products.prevPage}` : null, 
            nextLink : products.nextPage? `/api/products/?limit=${limit}&page=${products.nextPage}`: null,
            limit: limit,
            hayResultados : products.docs.length > 0
        }
        
        res.json(response);
        } catch (error) {
            console.log("ERROR >",error)
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