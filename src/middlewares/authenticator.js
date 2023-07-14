// @ts-nocheck
import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"
import { AuthenticationExpiredError } from "../models/errors/authentication.error.js"
import { AuthorizationError , AuthorizationErrorWEB} from "../models/errors/authorization.error.js"
import { cartService } from "../services/cartService.js"
import { userService } from "../services/userService.js"


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
  try {
    if (/*!req.user  && !req.session.passport  && !req.session.user && */!req.signedCookies.authToken) {
      return next(new AuthorizationError ("Debes estar logueado para ver el recurso"))
    }
    next()
  } catch (error) {
    throw new AuthenticationExpiredError(error)
  }
}

export async function onlyAdminOrPremiumApi(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req , next)
  if(user?.role === "user"){
    return next(new AuthorizationError ("Debes ser usuario PREMIUM o Administrador"))
  }
  next()
}
export async function onlyAdminOrPremiumWeb(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req , next)
  if(user?.role === "user"){
    return next(new AuthorizationErrorWEB ("Debes ser usuario PREMIUM o Administrador"))
  }
  next()
}
export async function onlyAdmin/*Api */(req, res, next) {    
  let user = await userService.getLoguedUser(req , next)
  if(user?.role !== "admin"){
    return next(new AuthorizationErrorWEB ("Debes ser administrador"))
  }
  next()
}
export async function onlyUser/*Api */(req, res, next) {
  let user = await userService.getLoguedUser(req , next)
  if(user?.role !== "user"){
    return next(new AuthorizationErrorWEB ("Debes ser USUARIO"))
  }
  next()
}
export async function notAdminWeb(req, res, next) {
  let user = await userService.getLoguedUser(req , next)
  if(user?.role === "admin"){
    return next(new AuthorizationErrorWEB ("Un administrador no puede realizar esta accion"))
  }
  next()
}
export async function notAdminApi(req, res, next) {
  let user = await userService.getLoguedUser(req , next)
  if(user?.role === "admin"){
    return next(new AuthorizationError ("Un administrador no puede realizar esta accion"))
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

// export function getUser (req, res, next){
//   try {    
//     let user = undefined
//     /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT signedCookie que guarda cookie */
//    // if(req.signedCookies.authToken !=undefined){
//    //     const token = req.signedCookies.authToken
//    //     const dataUser = encrypter.getDataFromToken(token)
//    //     user = dataUser
//     // } else if(req.user !=undefined){ 
//     //   user = req.user //PARA localRegister
//     // } else if(req.session?.passport !=undefined){ 
//     //   user = req.session.passport.user //PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT...
//     // } 
//     if(user.role === "admin") user.admin = true
//     if (user.role === "admin" || user.role === "premium" ) user.adminOrPremium = true
//     if (user.role === "user" || user.role === "premium" ) user.cartAllowed = true
// 
//     return user    
//  } catch (error) {
//     next(error)
//  }
// }
// 

// export async function getToken(req, res, next) {
//     
// }
export async function getCurrentUser (req , res , next){
  try {        
    let user = await userService.getLoguedUser(req , next)
    if(user === undefined){
      res.render("currentUser", {loguedUser :false}) 
    }else{
      req.params.cid = user.cart
      const cartById = await cartService.getCartsByID(req , res , next)  
      /* Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas*/
      const productsInCart = []
      cartById.products.forEach(p=>{ productsInCart.push( p.toObject()) })
      res.render("currentUser", {loguedUser : user!=undefined, user : user, products : productsInCart})
    }       
 } catch (error) {
    next(error)
 }
}
export async function renderHome(req , res , next){
  try {
    let user = await userService.getLoguedUser(req , next)
    if(user === undefined){
      res.render("home", {loguedUser :false}) 
    } else {
      res.render("home", {loguedUser :true , user : user}) 
    }
  } catch (error) {
    next(error)
  }
}