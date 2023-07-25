// @ts-nocheck
import { User } from "../models/User.js"
import { userRepository } from "../repositories/userRepository.js"
import { emailService } from "../utils/email.service.js"
import { encrypter } from "../utils/encrypter.js"
import { AuthenticationError, AuthenticationExpiredErrorWEB } from "../models/errors/authentication.error.js"
import { DocumentIncompleteError, IllegalInputArgWEB } from "../models/errors/validations.errors.js"
import { Password } from "../models/Password.js"
import { NotFoundUserWeb} from "../models/errors/register.error.js"
import { cartRepository } from "../repositories/cartRepository.js"
import { UserDTO } from "../models/UserDTO.js"
import { UserGithubDTO } from "../models/UserGithubDTO.js"
import { NotFoundError } from "../models/errors/carts.error.js"
import { validateAlphanumeric, validateEmail } from "../models/validations/validations.js"

class UserService {
    userRepository
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async createUser(first_name, last_name, email, age, password) {                
        let role = "user"
        age = parseInt(age)
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") role="admin" 
        const newClassUser = new User({first_name, last_name, email, age, password, role})
        newClassUser.setCart(await cartRepository.postCart()) // Si el usuario se valida correctamente, solo luego creo la cart
        const newUserObj = newClassUser.getAllAttr() 
        const {newUser , code} = await this.userRepository.createUser({newUserObj})   
        const newUserDto = new UserDTO({...newUser}).getAllAttr()
        return {newUserDto, code}
    }
    async sendEmailResetPassword(email){        
        try {
            const usuario = await this.findUserByEmail(email)
            if(usuario){
                const email = usuario.email
                const token =  encrypter.createTokenToRestorePassword({email}) 
                const templateEmail = `<h4>hola ${usuario.first_name}! </h4>
                <a href='http://localhost:8080/web/users/new-password/?email=${email}&token=${token}'> 
                    <p>Este es un email para que resetes tu password, te pedimos que hagas click en este enlace para crear un nuevo password </p>
                </a>`
                emailService.sendHtmlEmail(email, templateEmail, "Reseteo de password")      
                return {status:200 , mensaje: "Email enviado"}        
            }   
        } catch (error) {     
            throw new NotFoundUserWeb("Usuario no encontrado")
        }
    }
    async findUserByEmail(inputEmail){
        const email = validateEmail("Email",inputEmail)
        const user = await this.userRepository.findUserByEmail(email)
        return user;
    }  
    async searchByGitHubUsername(inputUsername){
        const username = validateAlphanumeric("Username",inputUsername)
        const user = await this.userRepository.searchByGitHubUsername(username)
        return user;
    }      
    async findUserById(inputId){
        const uid = validateAlphanumeric("User Id",inputId)
        const user = await this.userRepository.findUserById(uid)
        return user
    }

    // Solo valido para restaurar contraseña por web
    async validateToken(inputEmail , token){
        try {
            const email = validateEmail("Email",inputEmail)
            let validToken = false
            const userEmail = await this.userRepository.findUserByEmail(email)
            const userToken = encrypter.getDataFromToken(token)
            if(userToken.email === userEmail.email) validToken = true
            return validToken
        } catch (error) {
            throw new AuthenticationExpiredErrorWEB("Token no valido")
        }
    }
    async createNewPassword(password , email, token){
        await this.validateToken(email , token)        
        const userDb = await this.findUserByEmail(email)
        const newPassword = new Password(password).getPassword()
        const validPass = !encrypter.comparePasswords(newPassword , userDb.password)

        if(validPass){
            this.userRepository.updatePasswordUser(email , newPassword)
        }else {
            throw new IllegalInputArgWEB("Password no valido para ser ingresado")
        }
    }
    async getLoguedUser(req ,res, next){
        try {
            let user 
            if (req.signedCookies.authToken) user = encrypter.getDataFromToken(req.signedCookies.authToken)
            if (user?.username) return new UserGithubDTO({...user}).getAllAttr()
            const resp = user?.first_name? new UserDTO ({...user}).getAllAttr() : undefined
            return resp
        } catch (error) {
            next(error)
        }
    }    
    async getAllUsersForMembership(req){
        const listUsers = await this.userRepository.getAllUsersForMembership(req)
        listUsers.payload.forEach(user => {

            // aca deberia corroborar quienes tienen tal o cual documentacion para renderizarlo en el front!
            // podria agregar un tilde a los completos, o simplemente, cambiar el color a los botones que no esten con la doc coimpleta
            
            // aca deberia corroborar quienes tienen tal o cual documentacion para renderizarlo en el front!
            // podria agregar un tilde a los completos, o simplemente, cambiar el color a los botones que no esten con la doc coimpleta



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
    async changeMembership(inputId){         
        const uid = validateAlphanumeric("User Id",inputId)
        const isComplete = await this.documentationIsComplete(uid)
        const user = await this.findUserById(uid)
        if( user.role == "user"){
            if (isComplete){
                return await this.userRepository.updateMembership(uid , "premium")
            } else {
             throw new DocumentIncompleteError ("¡Falta completar documentacion!")
            }   
        } else if ( user.role == "premium") {
            return await this.userRepository.updateMembership(uid , "user")
        }     
    }
    async setLast_connectionByEmail(inputEmail){
        const email = validateEmail("Email",inputEmail)
        await this.userRepository.setLast_connectionByEmail(email)  
    }
    async setLast_connectionByUsername(inputUsername){
        const username = validateAlphanumeric("Username",inputUsername)
        await this.userRepository.setLast_connectionByUsername(username)  
    }
    async uploadDocument(req ,res, next){
        try {
            // debo validar para que incluyan "-" y "/" => const uid = validateAlphanumeric("User Id",req.baseUrl.split("/api/users/")[1].split("/documents")[0])
            // debo validar para que incluyan "-" y "/" => const fileName = validateAlphanumeric("Filename",req.file.filename)
            // debo validar para que incluyan "-" y "/" => const path = validateAlphanumeric("Path",req.file.path)
            const uid = req.baseUrl.split("/api/users/")[1].split("/documents")[0]
            const fileName = req.file.filename
            const path = req.file.path
            let user = await this.findUserById(uid)
            let update
            if(user){
            // es un user normal
                const loguedUser = await this.getLoguedUser(req ,res, next)
                if(user.email != loguedUser.email) throw new AuthenticationError ("Usuario debe estar logueado para agregar sus propios documentos")
                const userDocs = user.documents != undefined? user.documents : [] // este codigo es para los usuarios creados antes de la implementacion de documents de usuarios, para no droppear la bd                
                userDocs.push({ name : fileName , reference : path })
                update = await this.userRepository.updateOneUserDocument(uid , userDocs)
            }else if(!user){
            // es un user github 
                const loguedUser = await this.getLoguedUser(req ,res, next)
                if(user.username != loguedUser.username) throw new AuthenticationError ("Usuario debe estar logueado para agregar sus propios documentos")
                user = await userModelGitHub.findOne({ _id: uid }).lean() 

                if(!user) throw new NotFoundError("No se encontro el usuario")
                const userDocs = user.documents != undefined? user.documents : [] // este codigo es para los usuarios creados antes de la implementacion de documents de usuarios, para no droppear la bd 
                userDocs.push({ name : fileName , reference : path })
                update = await this.userRepository.updateOneGithubUserDocument(uid , userDocs)                
            }
            return update.modifiedCount > 0 ? {message: "Archivo subido correctamente",status : 201} : {message: "ERROR",status : 500}
        } catch (error) {
            throw new Error (error)
        } 
    }
    async getUserDocuments(inputId){
        try {            
            const uid = validateAlphanumeric("User Id",inputId)
            const user = await this.findUserById(uid)
            let profileImages = []
            let documentsImages = []
            let productsImages = []

            user.documents?.forEach(item => {
                if (item.name.includes("profile-")) profileImages.push({name : item.name , reference : item.reference})
                if (item.name.includes("doc-")) documentsImages.push({name : item.name , reference : item.reference})
                if (item.name.includes("product-")) productsImages.push({name : item.name , reference : item.reference})
            })
            return { profile : profileImages , documents : documentsImages , products : productsImages }
        } catch (error) {
            throw new NotFoundError("Usuario no encontrado")
        }
    }
    async documentationIsComplete (inputId){
        const uid = validateAlphanumeric("User Id",inputId)
        const {documents} = await this.getUserDocuments(uid)
        let hasIdentificacion = false
        let hasDomicilio = false
        let hasEstadoCuenta = false
        documents.forEach((doc =>{
            if (doc.name.toLowerCase().includes("identificacion")) hasIdentificacion = true
            if (doc.name.toLowerCase().includes("domicilio")) hasDomicilio = true
            if (doc.name.toLowerCase().includes("cuenta")) hasEstadoCuenta = true
        }))
        if( hasIdentificacion && hasDomicilio && hasEstadoCuenta) return true
        return false
    }
} 
  export const userService = new UserService(userRepository)

