// @ts-nocheck
import { productDAOMongo } from "../../managers/mongoose/ProductDAOMongoose.js"
import { encrypter } from "../../utils/encrypter.js"
import { userService } from "../../services/userService.js"

export function registerView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
 }

 export function userLogin(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
 }
 
 export async function productsView(req,res,next){ 
   const paginatedProducts = await productDAOMongo.getProducts(req,next)
   let dataRender
   let user = req.session?.passport?.user;
   try {
      if (req.session.user){
         user = req.session.user 
      } else if (req.signedCookies.authToken){      
         user = encrypter.getDataFromToken(req.signedCookies.authToken);
      }
      if(user !== undefined){
         dataRender = {title: `${user.first_name} - productos`, loguedUser: true , user: user , ...paginatedProducts}
      } else{
         dataRender = {title: `${req.session['user'].first_name} - productos`, loguedUser: true , user: req.session['user'] , ...paginatedProducts}
      }      
      if (user?.role === "admin" || req.session['user'] === "admin" ) {
         res.render("productsForAdmin", dataRender)
      } else {
         res.render("products", dataRender)      
      }
   } catch (error) {
      next(error)
   }
 }
 export async function postUser(req,res,next){   
    try {         
      const {user , code} = userService.createUser(req,res,next)
      
       /* session en cookie */
       const token = encrypter.createToken(user)
       res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60})
           
      // PENDIENTE TIEMPO REAL
       /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/      
      // req['io'].sockets.emit('usuarios', await usuariosManager.obtenerTodos())
      // tendria que poder recibir el evento de socket para poder actualizar      
      /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/

      req.logger.http(`Registro e inicio de session de ${user}`)
      res.status(code).json({ message: 'USUARIO SE LOGUEO', loguedUser: code === 201 })
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
      console.log("response => ", response)
      
      res.status(response.status).json({ message: response.mensaje})

   } catch (error) {
      next(error)
   }
}

export async function renderFormNewPassword(req,res,next){
   const validToken = await userService.validateToken(req.query.email , req.query.token)

   if(validToken){      
      res.render("create-new-password", {pageTitle: "Crear nuevo password", email : req.query.email})
   } else{
      res.render("errororrororor")
   }

}
export async function createNewPassword(req,res,next){

   console.log("req.body.password", req.body.password)
   console.log("req.body.email", req.body.email)

   userService.createNewPassword(req.body.password ,  req.body.email)
}