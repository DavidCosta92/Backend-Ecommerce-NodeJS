// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { Product } from "../../entities/Product.js";


class DB_product_manager{
    model
    constructor(model){
        this.model = model;
    }

    async getProducts (req,next){
        try {
            /*  Busqueda por categoria y por stock (true o  false) */
            const categorySearch = (req.query.category == "" || req.query.category == undefined) ? null : {$eq:req.query.category};
            const stock = (req.query.stock == "" || req.query.stock == undefined || req.query.stock != "true" ) ? null : {$gt:0};
            let searchParams = {}
            if (categorySearch) searchParams["category"] = categorySearch;
            if (stock) searchParams["stock"] = stock;        
            
            /* paginado y ordenamiento */        
            const limit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
            const page =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page
            let sortByPrice = null;
            if(req.query.sort!= undefined) sortByPrice = (req.query.sort === "asc" )? { price : 1} : { price : -1} 
            const pageOptions = { limit: limit, page: page, sort : sortByPrice , lean : true}
            
            
            const products = await productModel.paginate( searchParams ,pageOptions)

            const response ={
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
            return response;       
            
            } catch (error) {
                console.log("ERROR >",error)
                next(error);        
        }
    }

    async postProduct (req,next){
        try {
            const {title, description,code, category, thumbnails} = req.body;        
            const price = parseInt(req.body.price);
            const stock = parseInt(req.body.stock);
            const productAdded = await productModel.create({title, description,code, price, stock, category, thumbnails})
            return productAdded;    
        } catch (error) {
            console.log("ERROR >",error)
            next(error);
        }
    }

    async getProductById(pid,next){
        try {
            const product = await productModel.findById(pid);
            return product;
        } catch (error) {
            console.log("ERROR >",error)
            next(error);
        }
    }

    async deleteProductByID (pid,next){
        try {
            const productDeleted = await productModel.findByIdAndDelete(pid);
            return productDeleted;
        } catch (error) {
            next(error);        
        }
    }

    async updateProductByID (pid,next){
        let newProduct;
        try {
            newProduct = new Product({
                ...req.body
            })
        } catch (error) {
            return next(error);
        }        
        try {
            await productModel.findByIdAndUpdate(pid, newProduct)
            return await productModel.findById(pid);
        } catch (error) {
            next(error);
        }
    }
}

export const DB_mongo_product_manager = new DB_product_manager (productModel);