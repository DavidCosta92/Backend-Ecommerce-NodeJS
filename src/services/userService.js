// @ts-nocheck
import { User } from "../models/User.js"
import { user_dao_mongo_manager } from "../managers/mongoose/UserDAOMongoose.js"
import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"

class UserService {
    async createUser(req,next) {
        const idNewCart = await cartDAOMongoose.createCart(next)

        let {first_name, last_name, email, age, password, cart, role} = req.body
  
        if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"   
  
        cart = idNewCart;
  
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        const newUser = new User({first_name, last_name, email, age, password, cart, role})
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO
        /// ACA DEBO MANDAR EL DATA USER.. PARA VALIDAR ANTES DE CREAR UN USUARIOOOO


        const {user , code} = await user_dao_mongo_manager.createUser({newUser})


        return {user, code}
    }


} 
  export const userService = new UserService()