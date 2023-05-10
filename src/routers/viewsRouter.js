// @ts-nocheck
import express, { Router } from 'express';
import { cartstModel } from '../../Dao/DBaaS/models/cartModel.js';
import { productModel } from '../../Dao/DBaaS/models/productModel.js';
import { onlyAuthenticated , getCredentialsCookie} from '../middlewares/authenticator.js';
import { encrypter } from '../utils/encrypter.js';


export const viewsRouter = Router();

viewsRouter.use(express.json()); 

/* http://localhost:8080/api/views/products?limit=2&page=3 */
viewsRouter.get("/products", onlyAuthenticated,async (req, res, next)=>{
    /* paginado y ordenamiento */   
    const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
    const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page            
    const pageOptions = { limit: queryLimit, page: queryPage, lean : true}    
        
    const products = await productModel.paginate({},pageOptions)

    let user = false
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT JWT que guarda una signed cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    /* PARA localRegister */
    if(req.user !=undefined){ user = req.user }    
    /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
    if(req.session?.passport !=undefined){ user = req.session.passport.user }

    const response ={
        status : res.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`,
        payload : products.docs,
        limit:queryLimit,
        totalPages : products.totalPages,
        prevPage : products.prevPage,
        nextPage : products.nextPage,
        page : products.page,
        hasPrevPage : products.hasPrevPage,
        hasNextPage : products.hasNextPage,
        prevLink : products.prevPage? `/api/products/?limit=${queryLimit}&page=${products.prevPage}` : null, 
        nextLink : products.nextPage? `/api/products/?limit=${queryLimit}&page=${products.nextPage}`: null,
        hayResultados : products.docs.length > 0,
        loguedUser : user!=undefined,
        user : user
    }
    res.render("products", response)
})

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts", onlyAuthenticated, async (req, res, next)=>{
    const queryLimit = (isNaN(Number(req.query.limit)) || req.query.limit == "" ) ? 10 : req.query.limit
    const queryPage =  (isNaN(Number(req.query.page)) || req.query.page == "" ) ? 1 : req.query.page            
    const pageOptions = { limit: queryLimit, page: queryPage, lean : true, populate: 'products.product'}        
    const carts = await cartstModel.paginate({},pageOptions)

    let user = false
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT JWT que guarda una signed cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    /* PARA localRegister */
    if(req.user !=undefined){ user = req.user }    
    /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
    if(req.session?.passport !=undefined){ user = req.session.passport.user }

    const response ={
        status : res.statusCode === 200 ? `success, code: ${res.statusCode}` : `error, code: ${res.statusCode}`,
        payload : carts.docs,
        limit:queryLimit,
        totalPages : carts.totalPages,
        prevPage : carts.prevPage,
        nextPage : carts.nextPage,
        page : carts.page,
        hasPrevPage : carts.hasPrevPage,
        hasNextPage : carts.hasNextPage,
        prevLink : carts.prevPage? `/api/carts/?limit=${queryLimit}&page=${carts.prevPage}` : null, 
        nextLink : carts.nextPage? `/api/carts/?limit=${queryLimit}&page=${carts.nextPage}`: null,
        hayResultados : carts.docs.length > 0,
        loguedUser : user!=undefined,
        user : user
    }
    res.render("carts", response)
})

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts/:cid", onlyAuthenticated, async (req, res, next)=>{     
    
    let user = false
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT JWT que guarda una signed cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    /* PARA localRegister */
    if(req.user !=undefined){ user = req.user }    
    /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
    if(req.session?.passport !=undefined){ user = req.session.passport.user }
    
    const cart = await cartstModel.find({_id : req.params.cid}).populate('products.product').lean()
    res.render("cartById", {cart: cart[0] , hayResultados: cart[0].products.length>0 , loguedUser : user!=undefined , user : user})
})

viewsRouter.get("/chat", (req, res, next)=>{
    res.render("chats", {title: "Chat"})
})