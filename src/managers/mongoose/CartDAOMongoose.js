// @ts-nocheck
import { cartstModel } from "../../db/mongoose/models/cartModel.js"
import { productModel } from "../../db/mongoose/models/productModel.js"


class CartDAOMongoose{
    model
    constructor (model){
        this.model = model
    }

    async getCarts(req, next){
        try { 
            /* paginado y ordenamiento */   
            const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
            const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page            
            const pageOptions = { limit: queryLimit, page: queryPage, lean : true, populate: 'products.product'}     

            const carts = await cartstModel.paginate({},pageOptions)
            const response ={
                payload : carts.docs,
                totalPages : carts.totalPages,
                prevPage : carts.prevPage,
                nextPage : carts.nextPage,
                page : carts.page,
                hasPrevPage : carts.hasPrevPage,
                hasNextPage : carts.hasNextPage,
                prevLink : carts.prevPage? `/api/carts/?limit=${queryLimit}&page=${carts.prevPage}` : null, 
                nextLink : carts.nextPage? `/api/carts/?limit=${queryLimit}&page=${carts.nextPage}`: null,
            }
            return response;
        } catch (error) {
            next(error);
        }
    }

    async postCart (next){
        try {
            const newCart = await cartstModel.create({});
            return newCart;
        } catch (error) {
            next(error);
        }
    }
    async createCart (next){
        try {
            const newCart = await cartstModel.create({});
            return newCart;
        } catch (error) {
            next(error);
        }
    }

    async findCartById (cid, next){
        try {
            const cart = await cartstModel.findById(cid).populate("products.product");
            return cart;
        } catch (error) {
            next(error);
        }
    }

    async deleteCartById (cid, next){
        try {
             const deleted = await cartstModel.findByIdAndDelete(cid)
            return deleted;
        } catch (error) {
            next(error);
        }
    }

    async postProductToCart (req, next){
        try {
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
                    
            return await cartstModel.findById(cid).populate("products.product");
            }
         } catch (error) {
             next(error);
         }
    }

    async deleteProductInCart (req, next){
        try {
            const cart = await cartstModel.findById(req.params.cid)
            if(cart){
                let productosRestantes=[];
                const productSearch = await productModel.findById(req.params.pid)
    
                cart["products"].filter((product)=>{
                    if( !product["product"].equals(productSearch._id)){
                        productosRestantes.push(product)
                    }
                })            
                cart.products = productosRestantes;
                await cartstModel.replaceOne({ _id: req.params.cid } , cart)
            }
            return await cartstModel.findById(req.params.cid).populate("products.product");
        } catch (error) {        
            next(error);
        }
    }
    
    async deleteAllProductsInCartById (cid, next){
        try {
            const cart = await cartstModel.findById(cid)
            if(cart){
                cart["products"]=[];
                await cartstModel.replaceOne({ _id: cid } , cart)
            }
            return await cartstModel.findById(cid).populate("products.product");
        } catch (error) {        
            next(error);
        }    
    }

    async updateQuantityProductInCart (req, next){
    try {
        const cid = req.params.cid 
        const pid = req.params.pid
        let newPrQty = req.query.quantity;
       
        if (!Number.isInteger(Number(newPrQty)) && newPrQty < 0) throw new Error ("Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0")

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
                        obj["quantity"] = parseInt(newPrQty)
                    }
                })                
                await cartstModel.replaceOne( { _id: cid } , cart)
            } else {
                cart.products.push( { product : pid , quantity : newPrQty})
                await cartstModel.replaceOne( { _id: cid } , cart)
            }
                
        return await cartstModel.findById(cid).populate("products.product");
        }
     } catch (error) {
         next(error);
     }
    }

    async updateAllProductsInCart (cid, next){
        try {
            const cart = await cartstModel.findById(cid)
            if(cart){
                cart["products"]=req.body.products;
                await cartstModel.replaceOne({ _id: cid } , cart)
            }
            res.json(await cartstModel.findById(cid).populate("products.product"));
        } catch (error) {        
            next(error);
        }    
    }

}

export const cartDAOMongoose = new CartDAOMongoose(cartstModel);