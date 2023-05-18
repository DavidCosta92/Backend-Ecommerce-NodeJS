import { CartManager } from "../../managers/fileSystem/CartManager.js";
import { randomUUID } from "crypto";

const cartManager = new CartManager ("./Dao/FileSystem"); 


export async function getCartsFileSystem (req, res , next){
    try {
        await cartManager.readCartsFile; 
        res.json(cartManager.carts);
    } catch (error) {
        next(error);
    }
}


export async function postCartsFileSystem (req, res , next){
    try {
        const idCart = randomUUID();
        const newCart = await cartManager.createCart(idCart);        
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export async function getCartsByIDFileSystem (req, res , next){
    try {
        const cart = await cartManager.getCartById(req.params.cid)
         res.json(cart);
     } catch (error) {
         next(error);
     }
}

export async function deleteCartByIDFileSystem (req, res , next){
    try {
        const deleted = await cartManager.deleteCartById(req.params.cid)
        res.json(deleted);
    } catch (error) {        
        next(error);
    }
}

export async function postProductToCartsFileSystem (req, res , next){
    try {
        const productAdded = await cartManager.addProductToCart(req.params.cid , req.params.pid, req.query.quantity);
        res.json(productAdded);
     } catch (error) {
         next(error);
     }
}

export async function deleteProductInCartsFileSystem (req, res , next){
    try {
        const actualProducts = await cartManager.deleteProductInCart(req.params.cid , req.params.pid)
        res.status(200).json(actualProducts);
    } catch (error) {        
        next(error);
    }

}
