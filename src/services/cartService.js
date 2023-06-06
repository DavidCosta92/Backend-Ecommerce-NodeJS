// import { productDAOMongo } from "../managers/mongoose/ProductDAOMongoose"
import { cartRepository } from "../repositories/cartRepository.js";

class CartService{

    cartRepository
    productRepository

    constructor(cartRepo /*,productDAOMongo*/){    
        this.cartRepository = cartRepo; 
      //  this.productRepository = productDAOMongo; // aca debo crear una capa productRepository y mandarlo al crear el cartservice al final de este archivo!
    }



    async getCarts (req, res , next){
        const status = res?.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`;    
        let response ={...await this.cartRepository.getCarts(req,next) , status}
        return response;
    }
    
    async postCart (next){
        return await this.cartRepository.postCart(next)
    }
    
    async getCartsByID (cid, next){     
        return await this.cartRepository.getCartsByID(cid,next)
    }
    
    async deleteCartByID (cid , next){    
        return await this.cartRepository.deleteCartByID(cid,next)
    }
    
    async postProductToCarts (req, res , next){
        return await this.cartRepository.postProductToCarts(req,next);
    }
    
    async deleteProductInCarts (req, res , next){
        return await this.cartRepository.deleteProductInCarts(req,next);
    }
    
    async deleteAllProductsInCartByID (cid, res , next) {
       return await this.cartRepository.deleteAllProductsInCartByID(cid,next);
    
    }
    
    async updateQuantityProductInCarts (req, res , next) {
       return await this.cartRepository.updateQuantityProductInCarts(req,next);
    }
    
    async updateAllProductsInCarts (cid, res , next) {
        return await this.cartRepository.updateAllProductsInCarts(cid,next)
    
    }
    


























    async validateProduct(pid, quantity){
        const product = this.productRepository.getProductById(pid)
        if (product?.stock > quantity){
            return true
        } 
        return false
    }

    async verifyProducts(products){
        let acceptedProds = []
        let rejectedProds = []
        
        for (let i = 0; i < products.length; i++) {
            if (await this.validateProduct(products[i].pid, products[i].quantity)){
                acceptedProds.push(products[i])
            }else{
                rejectedProds.push(products[i])
            }
        }
        return { acceptedProds , rejectedProds }
    }

    calculateProductTotalCost (products){
        let totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            totalCost+=products[i].price
        }
        return totalCost
    }

    async buyCart (params , next) {
        const {cid , productsInCart} = params        
        
        // POR CADA PRODUCTO, DEBO VALIDARLO Y SI CUMPLE LOS REQUISITOS AGREGARLO A UNA LISTA DE ACEPTADOS Y SINO A UNA LISTA DE RECHAZADOS
        const { acceptedProds , rejectedProds } = await this.verifyProducts(params.products)
        
        // - hacer calculos de costo sobre productos aceptados
        const amount = this.calculateProductTotalCost(acceptedProds)

        // - cambiar productos en carrito por los rechazados
        // getCarrito.productos = rejectedProds y luego hacer un save(), de esa forma quedan solo los productos que no fueron comprados

        const cart = this.cartRepository.getCartsByIDMongoose(params.cid) // este metodo se deberia llamar repository.getCartById() y repo deberia llamar a dao mongo()
        cart.setProducts(rejectedProds) // debo crear este metodo, para poder setear los productos con los rechazados...

        cart.save() // estaria bien llamar este metodo para guardar la carta????

        // - crear nuevo ticket, persistirlo y enviarlo a renderizar como json
        // return { ticket : new ticket} => deberia llevar toda la info..
    
    }

} 
export const cartService = new CartService(cartRepository /*,productDAOMongo */)