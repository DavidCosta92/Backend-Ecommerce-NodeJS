// @ts-nocheck
import { encrypter } from "../../utils/encrypter.js"
import { userService } from "../../services/userService.js"
import { viewService } from "../../services/viewService.js"

export function registerView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
}
 export function renderLoginView(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
}
 export async function productsView(req,res,next){ 
   try {
      const dataRender = await viewService.getProducts(req, res, next)
      res.render("productsView", dataRender)        
   } catch (error) {
      next(error)
   }
}
 export async function postUser(req,res,next){  
   try {
      const {first_name, last_name, email, age, password} = req.body
      const {newUser , code} = await userService.createUser(first_name, last_name, email, age, password)
      /* a parte de crear el usuario, guardo la session en cookie asi ya queda logueado.. */         
      const token = encrypter.createToken(newUser)
      res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60})         
      req.logger.http(`Registro e inicio de session de ${newUser.email} mediante signedCookies`)
      res.status(code).json({ message: 'USUARIO SE LOGUEO', loguedUser: code === 201 })         
      // PENDIENTE TIEMPO REAL => es necesario avisar que estoy online??       
    } catch (error) {
      next(error)
    }
}
export async function renderPasswordReset (req,res,next){   
   res.render("restore-password", {pageTitle: "Reset password"})
}
export async function sendEmailResetPassword (req,res,next){
   try {
      const response = await userService.sendEmailResetPassword(req.body.email)
      res.status(response.status).json({ mensaje: response.mensaje})
   } catch (error) {
      next(error)
   }
}
export async function renderFormNewPassword(req,res,next){
   try {
      const validToken = await userService.validateToken(req.query.email , req.query.token)
      if(validToken){      
         res.render("create-new-password", {pageTitle: "Crear nuevo password", email : req.query.email})
      } else{
         res.render("restore-password", {pageTitle: "Error de token", error : true})
      }
   } catch (error) {
      next(error)
   }
}
export async function createNewPassword(req,res,next){
   try {      
      await userService.createNewPassword(req.body.password ,  req.body.email)
      res.status(200).json({ mensaje : "Password cambiado"})
   } catch (error) {
      res.status(400).json({ errorMessage : error.description})
      //next(error)
   }   
}
export async function renderUsersMemberships(req,res,next){
   try {      
      const user = await userService.getLoguedUser(req , next)
      const userList = await userService.getAllUsersForMembership(req)      
      res.render("membership-user-list", {pageTitle: "Lista de usuarios", users : userList, loguedUser : true , user})
   } catch (error) {
      //res.status(400).json({ errorMessage : error.description})
      next(error)
   }
}
export async function changeMembership(req,res,next){
   try {      
      await userService.changeMembership(req.params.uid)
      res.status(200).json({ mensaje : "Membresia actualizada"})
   } catch (error) {
      //res.status(400).json({ errorMessage : error.description})
      next(error)
   }   
}
