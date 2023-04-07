// @ts-nocheck
import { cartstModel } from "../../../Dao/models/cartModel.js";
import { productModel } from "../../../Dao/models/productModel.js";


export async function getCartsMongoose (req, res , next){
    try {
        const carts = await cartstModel.find().populate("products.product"); 
        res.json(carts);
    } catch (error) {
        next(error);
    }
}

export async function postCartsMongoose (req, res , next){
    try {
        //const idCart = randomUUID();
        //const newCart = await cartManager.createCart(idCart);
        const newCart = await cartstModel.create({});
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export async function getCartsByIDMongoose (req, res , next){
    try {
        // const productsInCart = await cartManager.getProductsByCartId(req.params.cid);
        const cart = await cartstModel.findById(req.params.cid).populate("products.product");
         res.json(cart);
     } catch (error) {
         next(error);
     }
}

export async function deleteCartByIDMongoose (req, res , next){
    try {
        const deleted = await cartstModel.findByIdAndDelete(req.params.cid)
        res.json(deleted);
    } catch (error) {        
        next(error);
    }
}

export async function postProductToCartsMongoose (req, res , next){
    try {

        // const productAdded = await cartManager.addProductToCart(req.params.cid , req.params.pid, req.query.quantity);

        const cid = req.params.cid 
        const pid = req.params.pid
        let productQuantity = req.query.quantity;

        if(productQuantity === undefined){
            productQuantity = 1;
        } else if (Number.isInteger(Number(productQuantity)) && productQuantity >= 1){
            productQuantity = Number(productQuantity);
        } else {
            throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")
        }            
        const cart = await cartstModel.findById(cid)     
    
        if(cart){            
            let productInCart= false;      
            const product = await productModel.findById(pid);        
            cart["products"].filter((obj)=>{
            if( obj["product"].equals(product._id) ){ productInCart = true; }
           })

            if(productInCart){
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
                
        res.json(await cartstModel.findById(cid).populate("products.product"));
        }
     } catch (error) {
         next(error);
     }
}


export async function deleteProductInCartsMongoose (req, res , next){
    try {
        //const actualProducts = await cartManager.deleteProductInCart(req.params.cid , req.params.pid)
        const cart = await cartstModel.findById(req.params.cid)

        // LUEGO ESTO DEBERA TIRAR UN ERROR SI NO EXISTE EL PRODUCTO EN CARTA
        //this.productInCart(cid,pid);
    
        if(cart){
            let productosRestantes=[];
            const productSearch = await productModel.findById(req.params.pid)

            cart["products"].filter((product)=>{
                if( !product["product"].equals(productSearch._id)){
                    productosRestantes.push(product)
                }
            })            
            cart.products = productosRestantes;
            console.log("cart.products", cart.products)

            await cartstModel.replaceOne({ _id: req.params.cid } , cart)
        }
        res.json(await cartstModel.findById(req.params.cid).populate("products.product"));
    } catch (error) {        
        next(error);
    }
}
