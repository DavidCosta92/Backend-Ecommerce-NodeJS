import { cartService } from "../../../src/services/cartService.js"
import { userService } from "../../../src/services/userService.js"

export async function getCurrentUserWeb (req , res , next){
    try {        
      let user = await userService.getLoguedUser(req, res , next)
      if(user === undefined){
        res.render("home", {loguedUser :false}) 
      }else{      
        req.params.cid = user.cart
        const cartById = await cartService.getCartsByID(req , next)   
        /* Necesario para solucionar error handlebars "Handlebars: Access has been denied to resolve the property "_id" because it is not an "own property" of its parent." Buscar alternativas*/
        const productsInCart = []
        cartById?.products.forEach(p=>{ productsInCart.push( p.toObject()) })
        res.render("currentUser", {loguedUser : user!=undefined, user : user, products : productsInCart})
      }       
   } catch (error) {
      next(error)
   }
  }