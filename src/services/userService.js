// @ts-nocheck
import { User } from "../models/User.js"
import { userRepository } from "../repositories/userRepository.js"
import { emailService } from "../utils/email.service.js"
import { encrypter } from "../utils/encrypter.js"
import { AuthenticationExpiredErrorWEB } from "../models/errors/authentication.error.js"
import { IllegalInputArgWEB } from "../models/errors/validations.errors.js"
import { Password } from "../models/Password.js"
import { NotFoundUserWeb} from "../models/errors/register.error.js"
import { cartRepository } from "../repositories/cartRepository.js"

class UserService {
    userRepository
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async createUser(first_name, last_name, email, age, password) {                
        let role = "user"
        age = parseInt(age)
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") role="admin"   

        const newUserObj = new User({first_name, last_name, email, age, password, role}).getAllAttr()
        newUserObj.setCart(await cartRepository.postCart()) // Si el usuario se valida correctamente, solo luego creo la cart
        const {newUser , code} = await this.userRepository.createUser({newUserObj})       
        
        return {newUser, code}
    }
    async sendEmailResetPassword(email){        
        try {
            const usuario = await this.findUserByEmail(email)
            if(usuario){
                const email = usuario.email
                const token =  encrypter.createTokenToRestorePassword({email}) 
                const templateEmail = `<h4>hola ${usuario.first_name}! </h4>
                <a href='http://localhost:8080/api/users/new-password/?email=${email}&token=${token}'> 
                    <p>Este es un email para que resetes tu password, te pedimos que hagas click en este enlace para crear un nuevo password </p>
                </a>`
                emailService.sendHtmlEmail(email, templateEmail, "Reseteo de password")      
                return {status:200 , mensaje: "Email enviado"}        
            }   
        } catch (error) {     
            throw new NotFoundUserWeb("Usuario no encontrado")
        }
    }
    async findUserByEmail(email){
        const user = await this.userRepository.findUserByEmail(email)
        return user;
    }    
    async findUserById(uid){
        return await this.userRepository.findUserById(uid)
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
            this.userRepository.updatePasswordUser(email , newPassword)
        }else {
            throw new IllegalInputArgWEB("Password no valido para ser ingresado")
        }
    }
    async getLoguedUser(req , next){
        try {
            let user 
            if (req.signedCookies.authToken){  
               user = encrypter.getDataFromToken(req.signedCookies.authToken);
            } 
            // ATRIBUTOS SOLO PARA RENDERIZAR BOTONES DE ACCION EN Handlebars
            if(user !== undefined){             
                if(user?.role === "admin") user.admin = true
                if(user?.role === "admin" || user.role === "premium" ) user.adminOrPremium = true
                if(user?.role === "user" || user.role === "premium" ) user.cartAllowed = true
            }
            return user
        } catch (error) {
            next(error)
        }
    }    
    async getAllUsersForMembership(req){
        const listUsers = await this.userRepository.getAllUsersForMembership(req)
        listUsers.payload.forEach(user => {
            if(user.role == "admin"){
                user.administrador = true
            } else if(user.role == "user"){
                user.usuario = true
            } else if(user.role == "premium"){
                user.premium = true
            }            
        });
        return listUsers
    }
    async changeMembership(uid){        
        return await this.userRepository.updateMembership(uid)        
    }
} 
  export const userService = new UserService(userRepository)