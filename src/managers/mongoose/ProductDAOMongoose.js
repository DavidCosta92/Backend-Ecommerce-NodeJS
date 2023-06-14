// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { Product } from "../../models/Product.js";
import { faker } from '@faker-js/faker'

class ProductDAOMongo{
    model
    constructor(model){
        this.model = model;
    }

    async getProducts (req , res , next){
        const {category, stock, limit, page, sort} = req.query
        try {
            /*  Busqueda por categoria y por stock (true o  false) */
            const categorySearch = (category == "" || category == undefined) ? null : {$eq:category};
            const searchStock = (stock == "" || stock == undefined || stock != "true" ) ? null : {$gt:0};
            let searchParams = {}
            if (categorySearch) searchParams["category"] = categorySearch;
            if (searchStock) searchParams["stock"] = stock;        
            
            /* paginado y ordenamiento */        
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

    async postProduct (req , res , next){
        try {
            const {title, description,code, category, thumbnails} = req.body;        
            const price = parseInt(req.body.price);
            const stock = parseInt(req.body.stock);

            const newProduct = new Product ({title, description,code, price, stock, category, thumbnails})

            const productAdded = await productModel.create(newProduct)
            return productAdded;                
        }catch (error) {
            console.log("ERROR >",error)
            next(error);
        }
    }

    async getProductById(req , res , next){
        try {
            const product = await productModel.findById(req.params.pid);
            return product;
        } catch (error) {
            next(error);
        }
    }

    async deleteProductByID (req , res , next){
        try {
            const productDeleted = await productModel.findByIdAndDelete(req.params.pid);
            return productDeleted;
        } catch (error) {
            next(error);        
        }
    }

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
    async updateStockSoldByID(req , res , next){ 
        let product = await productModel.findById(req.params.pid)
        product.stock -= req.params.quantity
        try {
            await productModel.findByIdAndUpdate(req.params.pid, product)
            return await productModel.findById(req.params.pid);
        } catch (error) {
            next(error);
        }
    }

    getMockingProducts(req , res , next){        
        let quantity = req.params.quantity !== undefined? req.params.quantity : 100
        try {
            let mockingProducts = []
            for (let i = 0; i < quantity; i++) {
                mockingProducts.push(this.createProductMock())
              }   
            return mockingProducts      
        } catch (error) {
            next(error)
        }
    }
    createProductMock(){
        const newProduct = new Product({
            title : faker.commerce.productName(),
            description : faker.commerce.productAdjective(), 
            code : faker.string.uuid(), 
            price : parseFloat(faker.commerce.price({ min: 1, dec: 2 })), 
            stock : faker.number.int({ min:1 , max:100 }), 
            category : "varios",//faker.commerce.department(), 
            thumbnails : "" 
        })
        return newProduct
    }
}

export const productDAOMongo = new ProductDAOMongo(productModel);