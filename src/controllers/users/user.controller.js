// @ts-nocheck
import { DB_mongo_product_manager } from "../../../Dao/DBaaS/managers/database.product.Manager.js"
import { userManager } from "../../managers/UserManager.js"
import { User } from "../../entities/User.js"
import { encrypter } from "../../utils/encrypter.js"
import { DB_mongo_cart_manager } from "../../../Dao/DBaaS/managers/database.cart.Manager.js"

export function registerView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
 }

 export function userLogin(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
 }
 
 export async function productsView(req,res,next){ 
   const paginatedProducts = await DB_mongo_product_manager.getProducts(req,next)
   let dataRender
   let user = req.session?.passport?.user;

   try {
      if (req.session.user){
         user = req.session.user 
      } else if (req.signedCookies.authToken){      
         user = encrypter.getDataFromToken(req.signedCookies.authToken);
      }
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
   } catch (error) {
      next(error)
   }
 }
 export async function postUser(req,res,next){   
    try {
         
      const idNewCart = await DB_mongo_cart_manager.createCart(next)

      const {first_name, last_name, email, age, password, cart, role} = req.body

      if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"   

      cart = idNewCart;

      const newUser = new User({first_name, last_name, email, age, password, cart, role})
      const {user , code} = await userManager.createUser({newUser})
       /* session en cookie */
       const token = encrypter.createToken(user)
       res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60})
           
      // PENDIENTE TIEMPO REAL
       /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/      
      // req['io'].sockets.emit('usuarios', await usuariosManager.obtenerTodos())
      // tendria que poder recibir el evento de socket para poder actualizar      
      /* EN TEORIA CON ESTO ESTOY AVISANDO QUE REFRESQUE EL LISTADO DE USUARIOS EL SOCKET*/

       res.status(code).json({ message: 'USUARIO SE LOGUEO', loguedUser: code === 201 })
    } catch (error) {
      next(error)
    }
 }