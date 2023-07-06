// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { Product } from "../../models/Product.js";
import { faker } from '@faker-js/faker'
import { encrypter } from "../../utils/encrypter.js";
import { NotFoundError } from "../../models/errors/carts.error.js";

class ProductDAOMongo{
    model
    constructor(model){
        this.model = model;
    }
    async getProducts (queryLimit , queryPage, category, stock, sort){
        /*  Busqueda por categoria y por stock (true o  false) */
        const categorySearch = (category == "" || category == undefined) ? null : {$eq:category};
        const searchStock = (stock == "" || stock == undefined || stock != "true" ) ? null : {$gt:0};
        let searchParams = {}
        if (categorySearch) searchParams["category"] = categorySearch;
        if (searchStock) searchParams["stock"] = stock;        
            
        /* paginado y ordenamiento */        
        let sortByPrice = null;
        if(sort!= undefined) sortByPrice = (sort === "asc" )? { price : 1} : { price : -1} 
        const pageOptions = { limit: queryLimit, page: queryPage, sort : sortByPrice , lean : true}            
            
        const products = await productModel.paginate( searchParams ,pageOptions)
        const response ={
            payload : products.docs,
            totalPages : products.totalPages,
            prevPage : products.prevPage,
            nextPage : products.nextPage,
            page : products.page,
            hasPrevPage : products.hasPrevPage,
            hasNextPage : products.hasNextPage,
            prevLink : products.prevPage? `/api/products/?limit=${queryLimit}&page=${products.prevPage}` : null, 
            nextLink : products.nextPage? `/api/products/?limit=${queryLimit}&page=${products.nextPage}`: null,
            limit: queryLimit,
            hayResultados : products.docs.length > 0
        }     
        return response;       
    }
    async postProduct (newProduct){
        return await productModel.create(newProduct)               
    }
    async getProductById(pid){
        try {
            return await productModel.findById(pid);
        } catch (error) {
            throw new NotFoundError(error)
        }
    }
    async getProductByCode(code){
        try {
            return await productModel.findOne({code : code})
        } catch (error) {
            throw new NotFoundError(error)
        }
    }
    async deleteProductByID (pid){
        try {            
            return await productModel.findByIdAndDelete(pid)
        } catch (error) {            
            throw new NotFoundError(error)
        }
    }
    async replaceOneProduct(pid , product){
        await productModel.replaceOne( { _id: pid } , product)
    }
/*
    async updateStockSoldByID(pid, quantity , req , res , next){ 
        let product = await productModel.findById(pid)
        product.stock -= quantity
        try {
            await productModel.findByIdAndUpdate(pid, product)
            return await productModel.findById(pid);
        } catch (error) {
            next(error);
        }
    }
    */
       /*
    
    async getProductsByUserEmail (req , res , next){

        let user = req.session?.passport?.user;        
        if (req.session.user){
            user = req.session.user 
         } else if (req.signedCookies.authToken){      
            user = encrypter.getDataFromToken(req.signedCookies.authToken);
         } else{
            user = req.session['user']
         }

        const {category, stock, limit, page, sort} = req.query
        try {
            const categorySearch = (category == "" || category == undefined) ? null : {$eq:category};
            const searchStock = (stock == "" || stock == undefined || stock != "true" ) ? null : {$gt:0};

            let searchParams = {}
         
            console.log("Usuario premium con Email => ", user.email)

            searchParams["owner"] = {$eq: user.email}; 
            if (categorySearch) searchParams["category"] = categorySearch;
            if (searchStock) searchParams["stock"] = stock;        
            
            // paginado y ordenamiento     
            const searchLimit = (isNaN(Number(limit)) || limit == "" ) ? 10 : limit
            const searchPage =  (isNaN(Number(page)) || page == "" ) ? 1 : page
            let sortByPrice = null;
            if(sort!= undefined) sortByPrice = (sort === "asc" )? { price : 1} : { price : -1} 
            const pageOptions = { limit: searchLimit, page: searchPage, sort : sortByPrice , lean : true}            
            
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
    */
/*
    --- --- REVISAR SI ESTE METODO LO PIDE CODER, O CUAL ES LA RAZON DE TENERLO --- --- 
    async updateProductByID (req , res , next){
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
            return await productModel.findById(req.params.pid);
        } catch (error) {
            next(error);
        }
    }
*/
}

export const productDAOMongo = new ProductDAOMongo(productModel);