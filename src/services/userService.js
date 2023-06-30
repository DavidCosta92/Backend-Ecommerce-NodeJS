// @ts-nocheck
import { User } from "../models/User.js"
import { userRepository } from "../repositories/userRepository.js"
import { emailService } from "../utils/email.service.js"
import { encrypter } from "../utils/encrypter.js"
import { AuthorizationError } from "../models/errors/authorization.error.js"
import { AuthenticationExpiredError , AuthenticationExpiredErrorWEB } from "../models/errors/authentication.error.js"
import { IllegalInputArgWEB } from "../models/errors/validations.errors.js"
import { Password } from "../models/Password.js"
import { NotFoundUserWeb } from "../models/errors/register.error.js"
import { cartRepository } from "../repositories/cartRepository.js"

class UserService {
    userRepository
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async createUser(req,next) {
        const idNewCart = await cartRepository.postCart()
        let {first_name, last_name, email, age, password, cart, role} = req.body  
        if ( req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123") role="admin"     
        cart = idNewCart;
        const newUser = new User({first_name, last_name, email, age, password, cart, role})
        const {user , code} = await userRepository.createUser({newUser})
        return {user, code}
    }
    async sendEmailResetPassword(email){        
        try {
            const usuario = await this.findUserByEmail(email)
            if(usuario){
                const email = usuario.email
                const token =  encrypter.createTokenToRestorePassword({email}) 
                const templateEmail = `<h4>hola ${usuario.first_name}! </h4>
                <a href='http://localhost:8080/api/users/new-password/?email=${email}&token=${token}'> 
                    <p>este es un email para que resetes tu password, te pedimos que hagas click en este enlace para crear un nuevo password </p>
                </a>`
                emailService.sendHtmlEmail(email, templateEmail, "Reseteo de password")      
                return {status:200 , mensaje: "Email enviado"}        
            }   
        } catch (error) {     
            throw new NotFoundUserWeb("Usuario no encontrado")
        }
    }
    async findUserByEmail(email){
        const user = this.userRepository.findUserByEmail(email)
        return user;
    }
    async validateToken(email , token){
        // Solo valido para restaurar contraseña por web
        try {
            let validToken = false
            const userEmail = await this.userRepository.findUserByEmail(email)
            const userToken = encrypter.getDataFromToken(token)
            if(userToken.email === userEmail.email) validToken = true
            return validToken
        } catch (error) {
            throw new AuthenticationExpiredErrorWEB("Token no valido")
        }
    }
    async createNewPassword(password , email){
        const userDb = await this.userRepository.findUserByEmail(email)

        const newPassword = new Password(password).getPassword()

        const validPass = !encrypter.comparePasswords(newPassword , userDb.password)

        if(validPass){
            userRepository.updatePasswordUser(email , newPassword)
        }else {
            throw new IllegalInputArgWEB("Password no valido para ser ingresado")
        }
    }
} 
  export const userService = new UserService(userRepository)