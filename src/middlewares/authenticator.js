// @ts-nocheck
import { DB_mongo_cart_manager } from "../../Dao/DBaaS/managers/database.cart.Manager.js"
import { AuthenticationError } from "../entities/error/authenticationError.js"
import { AuthorizationError } from "../entities/error/authorizationError.js"
import { encrypter } from "../utils/encrypter.js"


export function authenticator( req, res, next){
    if (req.session.passport || req.session.user || req.signedCookies.authToken){ 
        next()
    } else {
        res.redirect('/api/users/login')
    }    
}
export function getCredentialsCookie(req, res, next) {
    try {
      const token = req.signedCookies.authToken
      const dataUser = encrypter.getDataFromToken(token)
      req.user= dataUser
      next()
    } catch (error) {}
}
export function getCredentialsBody(req, res, next) {
    try {
      /* 
      ..
      pendiente
      ..
      */
    next()
    } catch (error) {
        next( new AuthenticationError("Credenciales invalidas o inexistentes"))
     }
}
export function getCredentialsHeader(req, res, next) {
    try {
      /* 
      ..
      pendiente
      ..
      */
    next()
    } catch (error) {
        next( new AuthenticationError("Credenciales invalidas o inexistentes"))
     }
}  
export function onlyAuthenticated /*Api */(req, res, next) {  
  if (!req.user  && !req.session.passport  && !req.session.user && !req.signedCookies.authToken) {
    return next(new AuthorizationError ("Debes estar logueado para ver el recurso"))
  }
  next()
}

export async function getCurrentUser (req , res , next){
  try {    
    let user = undefined
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT signedCookie que guarda una signed cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    /* PARA localRegister */
    if(req.user !=undefined){ user = req.user }    

    /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
    if(req.session?.passport !=undefined){ user = req.session.passport.user }

    if(user === undefined){
      res.render("currentUser", {loguedUser :false}) 
    }else{
      const cartById = await DB_mongo_cart_manager.findCartById(user.cart)      
      /* Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas*/
      const productsInCart = []
      cartById.products.forEach(p=>{ productsInCart.push( p.toObject()) })
      res.render("currentUser", {loguedUser : user!=undefined, user : user, products : productsInCart})
    }       
 } catch (error) {
    next(error)
 }
}




/*
export function onlyAuthenticatedWeb(req, res, next) {
    if (!req.user) {
      res.redirect("/api/users/login")
    }
    next()
  }
*/