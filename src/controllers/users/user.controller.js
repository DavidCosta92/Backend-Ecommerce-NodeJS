import { userModel } from "../../../Dao/DBaaS/models/userModel.js"
import { DB_mongo_product_manager } from "../../../Dao/DBaaS/managers/database.product.Manager.js"

export function registerView(req,res,next){    
    res.render("userRegister", {pageTitle: "Registro nuevo Usuario"})
 }

 export function userLogin(req,res,next){    
    res.render("userLogin", {pageTitle: "Login"})
 }
 export async function productsView(req,res,next){ 
   const paginatedProducts = await DB_mongo_product_manager.getProducts(req,next)
   const dataRender = {title: `${req.session['user'].first_name} - productos`, loguedUser: true , user: req.session['user'] , ...paginatedProducts}
   
   if (req.session['user'].rol === "admin") {
      res.render("productsForAdmin", dataRender)
   } else {
      res.render("products", dataRender)
   }
 }

 export async function postUser(req,res,next){   
   const user = {rol:"usuario", ...req.body }

   if ( user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") user.rol = "admin"

   const newUser = await userModel.create(user)
    req.session.user = {
        first_name : newUser.first_name, 
        last_name : newUser.last_name ,
        email : newUser.email ,
        age : newUser.age,
        rol : newUser.rol
    }
    res.status(201).json(newUser)
 }