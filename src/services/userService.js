// @ts-nocheck
import { User } from "../entities/User.js"
import { AuthenticationError } from "../entities/error/authenticationError.js"
import { User_dao_mongo_manager } from "../managers/mongoose/UserManager.js"
import { DB_mongo_cart_manager } from "../managers/mongoose/database.cart.Manager.js"
import { encrypter } from "../utils/encrypter.js"

class UserService {
    async createUser(req,next) {
        const idNewCart = await DB_mongo_cart_manager.createCart(next)

        let {first_name, last_name, email, age, password, cart, role} = req.body
  
        if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"   
  
        cart = idNewCart;
  
        const newUser = new User({first_name, last_name, email, age, password, cart, role})
        const {user , code} = await User_dao_mongo_manager.createUser({newUser})


        return {user, code}
    }


} 
  export const userService = new UserService()