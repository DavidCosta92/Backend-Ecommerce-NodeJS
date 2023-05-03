import { DB_mongo_product_manager } from "../../../Dao/DBaaS/managers/database.product.Manager.js"
import { userManager } from "../../managers/UserManager.js"

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
   
   if (user?.rol === "admin" || req.session['user'] === "admin" ) {
      res.render("productsForAdmin", dataRender)
   } else {
      res.render("products", dataRender)      
   }
 }

 export async function postUser(req,res,next){   
   const user = {rol:"usuario", ...req.body }
   
   if ( user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") user.rol = "admin"

   const newUser = await userManager.createUser({user})

    req.session.user = {
        first_name : newUser.first_name, 
        last_name : newUser.last_name ,
        email : newUser.email ,
        age : newUser.age,
        rol : newUser.rol
    }
    res.status(201).json(newUser)
 }