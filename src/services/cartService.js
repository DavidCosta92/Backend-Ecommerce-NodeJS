import { productDAOMongo } from "../managers/mongoose/ProductDAOMongoose"
import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose";

class CartService{

    cartRepository
    productRepository

    constructor(cartDAOMongoose,productDAOMongo){    
        this.cartRepository = cartDAOMongoose; // aca debo crear una capa cartRepository
        this.productRepository = productDAOMongo; // aca debo crear una capa productRepository
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
export const cartService = new CartService()