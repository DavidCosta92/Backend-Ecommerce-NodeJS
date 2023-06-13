// @ts-nocheck
import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"
import { AuthorizationError } from "../models/errors/authorization.error.js"
import { encrypter } from "../utils/encrypter.js"


export function authenticator( req, res, next){
    if (req.session.passport || req.session.user || req.signedCookies.authToken){ 
        next()
    } else {
        res.redirect('/api/users/login')
    }    
}
/*
export function getCredentialsCookie(req, res, next) {
    try {
      const token = req.signedCookies.authToken
      const dataUser = encrypter.getDataFromToken(token)
      req.user= dataUser
      next()
    } catch (error) {}
}
*/

export function onlyAuthenticated /*Api */(req, res, next) {  
  if (!req.user  && !req.session.passport  && !req.session.user && !req.signedCookies.authToken) {
    return next(new AuthorizationError ("Debes estar logueado para ver el recurso"))
  }
  next()
}
export async function onlyAdmin/*Api */(req, res, next) {    
  let user = getUser(req , res , next)
  if(user.role !== "admin"){
    return next(new AuthorizationError ("Debes ser administrador"))
  }
  next()
}
export async function onlyUser/*Api */(req, res, next) {
  let user = getUser(req , res , next)
  if(user.role !== "user"){
    return next(new AuthorizationError ("Debes ser USUARIO"))
  }
  next()
}

/////     PENDIENTE MIDS PARA WEB     /////          
/*
export function onlyAuthenticatedWeb(req, res, next) {
    if (!req.user) {
      res.redirect("/api/users/login")
    }
    next()
  }
*/

export function getUser (req, res, next){
  try {    
    let user = undefined
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT signedCookie que guarda cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    if(req.user !=undefined){ user = req.user }//PARA localRegister
    if(req.session?.passport !=undefined){ user = req.session.passport.user } //PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT...
    return user    
 } catch (error) {
    next(error)
 }
}

export async function getCurrentUser (req , res , next){
  try {    
    let user = getUser(req , res , next)
    if(user === undefined){
      res.render("currentUser", {loguedUser :false}) 
    }else{
      const cartById = await cartDAOMongoose.findCartById(user.cart)      
      /* Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas*/
      const productsInCart = []
      cartById.products.forEach(p=>{ productsInCart.push( p.toObject()) })
      res.render("currentUser", {loguedUser : user!=undefined, user : user, products : productsInCart})
    }       
 } catch (error) {
    next(error)
 }
}
