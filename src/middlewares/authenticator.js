// @ts-nocheck
import { AuthenticationError} from "../models/errors/authentication.error.js"
import { AuthorizationError , AuthorizationErrorWEB} from "../models/errors/authorization.error.js"
import { userService } from "../services/userService.js"

// ************************* WEB *************************
export function onlyAuthenticatedWeb(req, res, next) {    
  if (req.signedCookies.authToken){
    next()
  } else{
    res.render("userLogin", { error : {message : "Debes estar logueado para ver el recurso"}})
  }
}
export async function onlyAdminOrPremiumWeb(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin" || user?.role === "premium"){
    next()
  } else {
    res.render("userLogin", { error : {message : "Debes estar logueado como PREMIUM o admin para ver el recurso"}})
  }
}
export async function onlyAdminWeb(req, res, next) {    
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role == "admin"){
    next()
  } else{
    res.render("userLogin", { error : {message : "Debes estar logueado como admin para ver el recurso"}})
  }
}
export async function onlyUserWeb(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role !== "user") {
    res.render("userLogin", { error : {message : "Debes estar logueado como user regular para ver el recurso"}})
  } else{    
    next()
  }
}
export async function notAdminWeb(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin") {
    return next(new AuthorizationErrorWEB ("Un administrador no puede realizar esta accion"))
  } else{    
    next()
  }
}
export async function renderHome(req , res , next){
  try {
    let user = await userService.getLoguedUser(req, res , next)
    if(user === undefined){
      res.render("home", {loguedUser :false}) 
    } else {
      res.render("home", {loguedUser :true , user : user}) 
    }
  } catch (error) {
    next(error)
  }
}

// ************************* API *************************
export function onlyAuthenticatedApi(req, res, next) {  
  if (!req.signedCookies.authToken) {
    return next(new AuthenticationError ("Debes estar logueado para ver el recurso"))
  } else{    
    next()
  }    
}
export async function onlyAdminOrPremiumApi(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin" || user?.role === "premium") {
    next()
  } else{    
    return next(new AuthorizationError ("Debes ser usuario PREMIUM o Administrador"))
  }
}
export async function onlyAdminApi(req, res, next) {    
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role == "admin") {
    next()
  } else {
    return next(new AuthorizationError ("Debes ser administrador"))
  }
}
export async function onlyUserApi(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role == "user"){
    next()
  } else {
    return next(new AuthorizationError ("Debes ser USUARIO regular"))
  }
}
export async function notAdminApi(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin") {
    return next(new AuthorizationError ("Un administrador no puede realizar esta accion"))
  } else{
    next()
  }
}