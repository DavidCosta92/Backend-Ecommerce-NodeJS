// @ts-nocheck
import { User } from "../models/User.js"
import { user_dao_mongo_manager } from "../managers/mongoose/UserDAOMongoose.js"
import { cartDAOMongoose } from "../managers/mongoose/CartDAOMongoose.js"
import { userRepository } from "../repositories/userRepository.js"
import { emailService } from "../utils/email.service.js"
import { encrypter } from "../utils/encrypter.js"
import { AuthorizationError } from "../models/errors/authorization.error.js"

class UserService {
    userRepository
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async createUser(req,next) {
        const idNewCart = await cartDAOMongoose.createCart(next)
        let {first_name, last_name, email, age, password, cart, role} = req.body  
        if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"     
        cart = idNewCart;
        const newUser = new User({first_name, last_name, email, age, password, cart, role})
        const {user , code} = await user_dao_mongo_manager.createUser({newUser})
        return {user, code}
    }

    async sendEmailResetPassword(email){
        try {
            // revisar si existe email
            const usuario = await this.findUserByEmail(email)
            // si existe, enviar email con token
            if(usuario){
                const email = usuario.email
                const token =  encrypter.createTokenToRestorePassword({email}) 
                const templateEmail = `<h4>hola ${usuario.first_name}! </h4>
                <a href='http://localhost:8080/api/users/new-password/?email=${email}&token=${token}'> 
                    <p>este es un email para que resetes tu password, te pedimos que hagas click en este enlace para crear un nuevo password </p>
                </a>`
                emailService.sendHtmlEmail(email, templateEmail, "Reseteo de password")            
            }                
        } catch (error) {
            new Error("USER NOT FOUND")
        }
    }

    async findUserByEmail(email){
        const user = this.userRepository.findUserByEmail(email)
        return user;
    }
    async validateToken(email , token){
        try {
            let validToken = false
            const userEmail = await this.userRepository.findUserByEmail(email)
            const userToken = encrypter.getDataFromToken(token)
            if(userToken.email === userEmail.email) validToken = true

            return validToken
        } catch (error) {
            throw new AuthenticationExpiredError("Token no valido")
        }
    }
    async createNewPassword(password , email){
        const userDb = await this.userRepository.findUserByEmail(email)

        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...
        // HACER VALIDACIONES DE PASSWORD.. CANTIDAD DE DIGITOS, Y OTRAS COSAS PARECIDAS...

        const validPass = !encrypter.comparePasswords(password , userDb.password)
        
        if(validPass){
            user_dao_mongo_manager.updatePasswordUser(email , password)
        }else {
            throw new Error ("Password no valido para ser ingresado")
        }
    }
} 
  export const userService = new UserService(userRepository)