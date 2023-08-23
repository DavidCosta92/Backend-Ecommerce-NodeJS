// @ts-nocheck
import { productModel } from "../models/productModel.js";
import { NotFoundError } from "../../../models/errors/carts.error.js";
import { StorageError } from "../../../models/errors/storageError.js";

export class ProductDAOMongo{
    model
    constructor(model){
        this.model = model;
    }
    async getProducts (queryLimit , queryPage, category, stock, sort){
        try {
            /*  Busqueda por categoria y por stock (true o  false) */
            const categorySearch = (category == "" || category == undefined) ? null : {$eq:category};
            const searchStock = (stock == "" || stock == undefined || stock != "true" ) ? null : {$gt:0};
            let searchParams = {}
            if (categorySearch) searchParams["category"] = categorySearch;
            if (searchStock) searchParams["stock"] = stock;        
                
            /* paginado y ordenamiento */        
            let sortOpt = {  stock:-1, price : -1 , owner: -1 } ;
            if(sort === "asc") sortOpt = { stock:-1, price : 1, owner: 1} 
            const pageOptions = { limit: queryLimit, page: queryPage, sort : sortOpt , lean : true}            
                
            const products = await this.model.paginate( searchParams ,pageOptions)
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
        } catch (error) {
            throw new StorageError("Error obteniendo datos")
        }
    }
    async postProduct (newProduct){
        return await this.model.create(newProduct)               
    }
    async getProductById(pid){
        try {
            return await this.model.findById(pid);
        } catch (error) {
            throw new NotFoundError(`No se encontro producto con el ID ${pid}`)
        }
    }
    async getProductByCode(code){
        try {
            return await this.model.findOne({code : code})
        } catch (error) {
            throw new NotFoundError(`No se encontro producto con el code ${code}`)
        }
    }
    async getProductsByOwner(owner){
        try {
            return await this.model.find({owner : owner})
        } catch (error) {
            throw new NotFoundError(`No se encontro producto con el code ${owner}`)
        }
    }
    async deleteProductByID (pid){
        try {            
            return await this.model.findByIdAndDelete(pid)
        } catch (error) {            
            throw new NotFoundError(`No se encontro producto con el ID ${pid}`)
        }
    } 
    async editProductsByID (pid , product){
        try {            
            return await this.model.replaceOne( { _id: pid } , product)
        } catch (error) {            
            throw new NotFoundError(`No se encontro producto con el ID ${pid}`)
        }
    }
    async replaceOneProduct(pid , product){
        try {            
            await this.model.replaceOne( { _id: pid } , product)
        } catch (error) {            
            throw new NotFoundError(`No se encontro producto con el ID ${pid}`)
        }
    }
}

export const productDAOMongo = new ProductDAOMongo(productModel);