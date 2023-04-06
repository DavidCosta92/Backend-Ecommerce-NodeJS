// @ts-nocheck
import fs from 'fs/promises';
import { Cart } from './Cart.js';
import { ProductManager } from './ProductManager.js';
import { cartstModel } from '../Dao/models/cartModel.js';
import { productModel } from '../Dao/models/productModel.js';
import mongoose from 'mongoose';
export class CartManager{
    path = "";
    carts;
    productManager;

    constructor (path){
        this.carts = [];
        this.path = path + "/carrito.json";
        this.productManager = new ProductManager(path)
    }

    async createCart(idCart){
        await this.readCartsFile();
        const newCart = new Cart(idCart);
        this.carts.push(newCart);
        await this.saveCartsFile();
        return newCart;
    }

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

    async getCartById(id){
        await this.readCartsFile();
        const cartSearch = this.carts.find(cart => cart.id === id);            
        if(cartSearch === undefined) throw new Error("ID no encontrado");              
        return cartSearch;
    }

    async getProductsByCartId(cid){
        const cart = await this.getCartById(cid);
        return cart["products"];
    }

    async getProductInCartByIds(cid,pid){
        const productsInCart = await this.getProductsByCartId(cid);
        const productSearch = productsInCart.find(p => p.pid === pid ); 
        return productSearch;
    }

    async addProductToCart(cid,pid, productQuantity){        
        let prQuantity;
        if(productQuantity === undefined){
            prQuantity = 1;
        } else if (Number.isInteger(Number(productQuantity)) && productQuantity >= 1){
            prQuantity = Number(productQuantity);
        } else {
            throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")
        }

        const productInCart = await this.getProductInCartByIds(cid,pid);

        const existeProducto = await this.productManager.getProductById(pid); // SI EL PRODUCTO NO EXISTE, ENVIARA UN ERROR CORTANDO EJECUCION

        if(productInCart){
            productInCart["quantity"] += prQuantity;
            await this.saveCartsFile();
            return await this.getProductInCartByIds(cid,pid);
        } else {
            const productAdded = {pid:pid , quantity:prQuantity};
            const cart = await this.getCartById(cid);
            cart["products"].push(productAdded);
            await this.saveCartsFile();
            return productAdded;
        }

    } 


    // MONGOOSE
    async productInCart (cid,pid){
        let productInCart= false;      
        const cart = await cartstModel.findById(cid);
        const product = await productModel.findById(pid);        
        cart["products"].filter((obj)=>{
        if( obj["product"].equals(product._id) ){ productInCart = true; }
       })
       return productInCart;
    }

    async addProductToCartMONGOOSE (cid,pid, productQuantity){
        let prQuantity;
        if(productQuantity === undefined){
            prQuantity = 1;
        } else if (Number.isInteger(Number(productQuantity)) && productQuantity >= 1){
            prQuantity = Number(productQuantity);
        } else {
            throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")
        }
        
        const cart = await cartstModel.findById(cid)     

        if(cart){            
            const productInCart = await this.productInCart(cid,pid);
            if(productInCart){
                const product = await productModel.findById(pid);
                cart["products"].map(obj=>{
                    if( obj["product"].equals(product._id) ){ 
                        obj["quantity"] += parseInt(productQuantity)
                    }
                })                
                await cartstModel.replaceOne( { _id: cid } , cart)
            } else {
                cart.products.push( { product: pid , quantity:productQuantity})
                await cartstModel.replaceOne( { _id: cid } , cart)
            }
        }
        return await cartstModel.findById(cid).populate("products.product")
    }
    
    async deleteCartById(cid){
        return await cartstModel.findByIdAndDelete(cid);
    }




    async deleteProductInCartMONGOOSE (cid,pid) {
        const cart = await cartstModel.findById(cid)  

        // LUEGO ESTO DEBERA TIRAR UN ERROR SI NO EXISTE EL PRODUCTO EN CARTA
        this.productInCart(cid,pid);

        if(cart){
            const productosRestantes = cart.products.filter((product)=>{
                console.log( product !==   pid)
            })
            cart.products = productosRestantes;
            await cartstModel.replaceOne({ _id: cid } , cart)
        }
        return await cartstModel.findById(cid).populate("products.product")
    }




}