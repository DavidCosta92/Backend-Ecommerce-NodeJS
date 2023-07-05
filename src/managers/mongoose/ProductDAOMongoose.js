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

    async getProducts (user, req , res , next){
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
            for (let i = 0; i < products.docs.length; i++) {
                if(products.docs[i].owner === user.email){
                    products.docs[i]["userIsOwner"] = true
                }
                if(user.role === "admin"){
                    products.docs[i]["userIsAdmin"] = true
                }
            }

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
    async postProduct (req , res , next){
        try {
            const {title, description,code, category, thumbnails , owner} = req.body;        
            const price = parseInt(req.body.price);
            const stock = parseInt(req.body.stock);

// aca deberia validar que el codigo pasado es aceptable, en el sentido de si no esta repetido.. por el momento esto lo valida solo mongoose, pero para filesystem no es aplicable.. debo validar a mano antes de crear el newProduct.. hacer metodo tipo existByCode(code), respuesta boolean que permita crear o no..
            console.log("owner ====>>>>>>>>",owner,"owner ====>>>>>>>>")


            const newProduct = new Product ({title, description,code, price, stock, category, thumbnails, owner}).getAllAttr()
            const productAdded = await productModel.create(newProduct)
            return productAdded;                
        }catch (error) {
            console.log("ERROR >",error)
            next(error);
        }
    }

    async getProductById(pid){
        try {
            const product = await productModel.findById(pid);
            return product;
        } catch (error) {
            throw new NotFoundError(error)
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

    // revisar donde estoy usando este metodo
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

    async replaceOneProduct(pid , product){
        await productModel.replaceOne( { _id: pid } , product)
    }

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