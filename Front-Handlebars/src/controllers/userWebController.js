// @ts-nocheck

import { userService } from "../../../src/services/userService.js"

// import { viewService } from "../../services/viewService.js"

export function registerWebView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
} 
export function renderWebLoginView(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
}  
export async function renderWebPasswordReset (req,res,next){   
    res.render("restore-password", {pageTitle: "Reset password"})
}
export async function renderWebFormNewPassword(req,res,next){
   try {
      const validToken = await userService.validateToken(req.query.email , req.query.token)
      if(validToken){      
         res.render("create-new-password", {pageTitle: "Crear nuevo password", email : req.query.email , token : req.query.token})
      } else{
         res.render("restore-password", {pageTitle: "Error de token", error : true})
      }
   } catch (error) {
      next(error)
   }
}
export async function renderWebUsersMemberships(req,res,next){
   try {      
      const user = await userService.getLoguedUser(req , next)
      const userList = await userService.getAllUsersForMembership(req)      
      res.render("membership-user-list", {pageTitle: "Lista de usuarios", users : userList, loguedUser : true , user})
   } catch (error) {
      next(error)
   }
}