// @ts-nocheck
import { AuthenticationError, AuthenticationErrorWEB} from "../models/errors/authentication.error.js"
import { AuthorizationError , AuthorizationErrorWEB} from "../models/errors/authorization.error.js"
import { cartService } from "../services/cartService.js"
import { userService } from "../services/userService.js"

export function authenticatorWeb( req, res, next){
    if (req.signedCookies.authToken){       
      next()
    } else {
        res.redirect('/web/users/login')
    }    
}
export function onlyAuthenticatedWeb(req, res, next) {    
  if (!req.signedCookies.authToken) return next(new AuthenticationErrorWEB ("Debes estar logueado para ver el recurso"))
  next()
}
export function onlyAuthenticatedApi(req, res, next) {  
  if (!req.signedCookies.authToken) return next(new AuthenticationError ("Debes estar logueado para ver el recurso"))    
  next()
}
export async function onlyAdminOrPremiumApi(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "user") return next(new AuthorizationError ("Debes ser usuario PREMIUM o Administrador"))
  next()
}
export async function onlyAdminOrPremiumWeb(req, res, next) {    
  // solo corrobora rol, el owner sera chequeado a nivel de servicios
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "user") return next(new AuthorizationErrorWEB ("Debes ser usuario PREMIUM o Administrador"))
  next()
}
export async function onlyAdminWeb(req, res, next) {    
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role !== "admin") return next(new AuthorizationErrorWEB ("Debes ser administrador"))
  next()
}
export async function onlyAdminApi(req, res, next) {    
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role !== "admin") return next(new AuthorizationError ("Debes ser administrador"))
  next()
}
export async function onlyUserApi(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role !== "user") return next(new AuthorizationError ("Debes ser USUARIO"))
  next()
}
export async function onlyUserWeb(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role !== "user") return next(new AuthorizationErrorWEB ("Debes ser USUARIO"))
  next()
}
export async function notAdminApi(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin") return next(new AuthorizationError ("Un administrador no puede realizar esta accion"))
  next()
}
export async function notAdminWeb(req, res, next) {
  let user = await userService.getLoguedUser(req, res , next)
  if(user?.role === "admin") return next(new AuthorizationErrorWEB ("Un administrador no puede realizar esta accion"))
  next()
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