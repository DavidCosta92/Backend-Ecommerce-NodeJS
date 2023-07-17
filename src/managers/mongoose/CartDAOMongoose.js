// @ts-nocheck
import { cartstModel } from "../../db/mongoose/models/cartModel.js"
import { NotFoundError } from "../../models/errors/carts.error.js"

class CartDAOMongoose{
    model
    constructor (model){
        this.model = model
    }
    async getCarts (queryLimit , queryPage){            
        const sort = { products : -1}
        const pageOptions = { limit: queryLimit, page: queryPage, sort : sort, lean : true, populate: 'products.product'}     
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
    }
    async createCart (){
        const newCart = await cartstModel.create({});
        return newCart;
    }
    async findCartById  (cid){
        try {
            const cart = await cartstModel.findById(cid).populate("products.product");
            return cart;
        } catch (error) {
            throw new NotFoundError(error)
        }
    }
    async deleteCartById  (cid){
        try {
            const deleted = await cartstModel.findByIdAndDelete(cid)
            return deleted;
        } catch (error) {
            throw new NotFoundError(error)
        }
    }
    async replaceOneCart (cid , cart){
        await cartstModel.replaceOne( { _id: cid } , cart)
    }
}
export const cartDAOMongoose = new CartDAOMongoose(cartstModel);