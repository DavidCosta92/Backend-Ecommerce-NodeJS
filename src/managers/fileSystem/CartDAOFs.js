// @ts-nocheck
// import { cartstModel } from "../../db/mongoose/models/cartModel.js"
// import { productModel } from "../../db/mongoose/models/productModel.js"

import fs from 'fs/promises'
import { Cart } from '../../models/Cart.js'
import { NotFoundError } from '../../models/errors/carts.error.js';
import { ProductDAOFs } from './ProductDAOFs.js';
import { validateIntegerNumber } from '../../models/validations/validations.js';
class CartDAOFs{
    path = "";
    carts;
    productManager;
    constructor (path){
        this.carts = [];
        this.path = path + "/src/db/FileSystemDB/carrito.json";
        this.productManager = new ProductDAOFs(`${path}/src/db/FileSystemDB/products.json`)
    }

    // METODOS PROPIOS PARA MENEJO DE FS
    async readCartsFile(){
        try {
            const cartsFileJson = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(cartsFileJson);            
        } catch (error) {
            throw new Error (error.message);            
        }
    }
    async saveCartsFile(){
        try {      
            const cartsFileJson = JSON.stringify(this.carts, null, 2);
            await fs.writeFile(this.path, cartsFileJson);
        } catch (error) {
            throw new Error (error.message);  
        }
    }
    async getProductsByCartId(cid){
        const cart = await this.findCartById(cid);
        return cart["products"];
    }
    async getProductInCartByIds(cid,pid){
        const productsInCart = await this.getProductsByCartId(cid);
        const productSearch = productsInCart.find(p => p.pid === pid ); 
        return productSearch;
    }
    // METODOS PROPIOS PARA MENEJO DE FS
    


    async getCarts (queryLimit , queryPage){
        try { 
            /* paginado y ordenamiento */   
            // const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
            // const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page            
            const pageOptions = { limit: queryLimit, page: queryPage, lean : true, populate: 'products.product'}     

    
            await this.readCartsFile()

//  ACA DEBERIA VER LA MANERA DE NORMALIZAR LA RESPUESTA, TENDRIA QUE HACER UN PAGINADO MANUAL DE LA RESPUESTA.. dEBERIA CREAR VARIOS CARRITOS, Y REVISAR EL FUNCIONAMIENTO TOTAL DE TODO.. AL FINAL VER COMO PAGINAR..

    //      const carts = await cartstModel.paginate({},pageOptions)
    //      const response ={
    //         payload : this.carts,
    //         totalPages : carts.totalPages,
    //         prevPage : carts.prevPage,
    //         nextPage : carts.nextPage,
    //         page : carts.page,
    //         hasPrevPage : carts.hasPrevPage,
    //         hasNextPage : carts.hasNextPage,
    //         prevLink : carts.prevPage? `/api/carts/?limit=${queryLimit}&page=${carts.prevPage}`: null, 
    //         nextLink : carts.nextPage? `/api/carts/?limit=${queryLimit}&page=${carts.nextPage}`: null,
    //     }
            return this.carts;
        } catch (error) {
            next(error);
        }
    }
    async createCart  (){        
        await this.readCartsFile();
        const newCart = new Cart()
        this.carts.push(newCart)
        await this.saveCartsFile();
        return newCart;
    }

    async findCartById  (cid){
        await this.readCartsFile();
        const cart = this.carts.find(cart => cart.id === cid);            
        if(cart === undefined) throw new NotFoundError("ID de carta no encontrado")           
        return cart;
    }

    async deleteCartById  (req, res , next){
        try {
            await this.readCartsFile();
            const cartSearch = this.carts.find(cart => cart.id === id);   
            if(cartSearch === undefined) throw new NotFoundError("ID de carta no encontrado")  
            const index = this.carts.findIndex(cart => cart.id === id)
            this.carts.splice(index , 1)
            this.saveCartsFile()                         
            return cartSearch;
        } catch (error) {
            next(error);
        }
    }

    async replaceOneCart (cid , cart){
        console.log("FUNCIONALIDAD PENDIENTEEEEE!!!! ")
       // await cartstModel.replaceOne( { _id: cid } , cart)
    }
    async postProductToCart (req, res , next){
        try {
            const cid = req.params.cid 
            const pid = req.params.pid
            let productQuantity = req.query.quantity
    
            if(productQuantity === undefined){
                productQuantity = 1;
            } else {
                validateIntegerNumber("Cantidad",req.query.quantity);
                productQuantity = Number(productQuantity);
            }
            await this.productManager.getProductById(pid); // SI EL PRODUCTO NO EXISTE, ENVIARA UN ERROR CORTANDO EJECUCION
            const productInCart = await this.getProductInCartByIds(cid,pid);

            if(productInCart){
                productInCart["quantity"] += productQuantity;
                await this.saveCartsFile();
                return await this.findCartById(cid);
            } else {
                const productAdded = {pid:pid , quantity:prQuantity};
                const cart = await this.findCartById(cid);
                cart["products"].push(productAdded);
                await this.saveCartsFile();
                return cart;
            }

         } catch (error) {
             next(error);
         }
    }

    async deleteProductInCart (req, res , next){
        try {
            const productSearch = this.getProductInCartByIds(cid,pid);            
            if(productSearch === undefined) throw new Error ("Producto no ecnontrado")

            const cart = await this.findCartById(cid)  

            const productosRestantes=[];
            if(cart){
                const productsInCart = await this.getProductsByCartId(cid)
                productsInCart.filter((product)=>{
                    if( pid !== product.pid){
                        productosRestantes.push(product)
                    }
                }) 
               this.carts.filter(cart=>{
                    if (cart.id === cid){
                        cart.products=productosRestantes
                    }
               })     
            }
            this.saveCartsFile()
            return await this.getCartById(cid) ;
        } catch (error) {        
            next(error);
        }
    }
    
    async deleteAllProductsInCartById (req, res , next){
        try {
            const cart = this.findCartById(req.params.cid)
            if(cart){
                cart["products"]=[];
                this.saveCartsFile()
            }
            return await this.findCartById(req.params.cid)
        } catch (error) {        
            next(error);
        }    
    }

    async updateQuantityProductInCart (req, res , next){
    try {
        const cid = req.params.cid 
        const pid = req.params.pid
        let newPrQty = validateIntegerNumber("Cantidad",req.query.quantity);
        const cart = await this.findCartById(cid)   
        
        /// DEBO REVISAR BIEN ESTA LOGICA.. ES MAS COMPLICADA DE LO QUE DEBERIA PORQUE ESTUVO PENSADA PARA MONGOOSE.. PREVIO DEBO REVISAR PRODUCT MANAGER
        
        if(cart){            
            let productInCart= false;      
            const product = await this.productManager.getProductById(pid) 
            cart["products"].filter((obj)=>{
            if( obj["product"].equals(product.id) ){ productInCart = true; }
           })
           
            if(productInCart){
                cart["products"].map(obj=>{
                    if( obj["product"].equals(product.id) ){ 
                        obj["quantity"] = parseInt(newPrQty)
                    }
                })                


                //await cartstModel.replaceOne( { _id: cid } , cart)
            } else {
                // cart.products.push( { product : pid , quantity : newPrQty})
                // await cartstModel.replaceOne( { _id: cid } , cart)
            }
                
        return await cartstModel.findById(cid).populate("products.product");
        }
     } catch (error) {
         next(error);
     }
     /// DEBO REVISAR BIEN ESTA LOGICA.. ES MAS COMPLICADA DE LO QUE DEBERIA PORQUE ESTUVO PENSADA PARA MONGOOSE.. PREVIO DEBO REVISAR PRODUCT MANAGER
        /// DEBO REVISAR BIEN ESTA LOGICA.. ES MAS COMPLICADA DE LO QUE DEBERIA PORQUE ESTUVO PENSADA PARA MONGOOSE.. PREVIO DEBO REVISAR PRODUCT MANAGER
    }

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES

    // REVISAR TODO PARA ABAJO,,, DEBO HACERLO CON EJEMPLOS REALES
    async updateAllProductsInCart  (req, res , next){
        try {
            const cart = await this.findCartById(req.params.cid)
            if(cart){
                cart["products"]=req.body.products;
                await cartstModel.replaceOne({ _id: req.params.cid } , cart)
            }
            res.json(await cartstModel.findById(req.params.cid).populate("products.product"));
        } catch (error) {        
            next(error);
        }    
    }

    async setProductsInCart  (cid, products, req, res , next){
        try {
            const cart = await cartstModel.findById(cid)
            if(cart){
                cart["products"]=products;
                await cartstModel.replaceOne({ _id: cid } , cart)
            }
        } catch (error) {       
            next(error);            
        }
    }

}

export const cartDAOFs = new CartDAOFs();