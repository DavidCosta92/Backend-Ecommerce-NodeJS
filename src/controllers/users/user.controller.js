// @ts-nocheck
import { DB_mongo_product_manager } from "../../../Dao/DBaaS/managers/database.product.Manager.js"
import { userManager } from "../../managers/UserManager.js"
import { User } from "../../entities/User.js"

export function registerView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
 }

 export function userLogin(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
 }
 
 export async function productsView(req,res,next){ 
   const paginatedProducts = await DB_mongo_product_manager.getProducts(req,next)

   let dataRender
   const user = req.session?.passport?.user;

   if(user){
      dataRender = {title: `${user.first_name} - productos`, loguedUser: true , user: user , ...paginatedProducts}
   } else{
      dataRender = {title: `${req.session['user'].first_name} - productos`, loguedUser: true , user: req.session['user'] , ...paginatedProducts}
   }
   
   if (user?.role === "admin" || req.session['user'] === "admin" ) {
      res.render("productsForAdmin", dataRender)
   } else {
      res.render("products", dataRender)      
   }
 }

 export async function postUser(req,res,next){   
    try {
      const {first_name, last_name, email, age, password, cart, role} = req.body
     // const userAttempt = {rol:"usuario", ...req.body }
   
      if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"
   
      const newUser = new User({first_name, last_name, email, age, password, cart, role})

      const {user , code} = await userManager.createUser({newUser})
   
       req.session.user = {
           first_name : user.first_name, 
           last_name : user.last_name ,
           email : user.email ,
           age : user.age,
           role : user.role
       }  
           

       /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/
      
      // req['io'].sockets.emit('usuarios', await usuariosManager.obtenerTodos())
      // tendria que poder recibir el evento de socket para poder actualizar
      
      /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/

       res.status(code).json({ message: 'USUARIO SE LOGUEO', loguedUser: code === 201 })
    } catch (error) {
      next(error)
    }
 }