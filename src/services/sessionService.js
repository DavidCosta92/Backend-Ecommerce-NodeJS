// @ts-nocheck
import { AuthenticationError } from "../models/errors/authentication.error.js"
import { encrypter } from "../utils/encrypter.js"
import { userRepository } from "../repositories/userRepository.js"

class SessionService {
    async getSessionToken(email, password) {
        const userBD = await userRepository.findUserByEmail(email)
        
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")    
        const correctPassword = encrypter.comparePasswords( password, userBD.password)
        if (!correctPassword)  throw new AuthenticationError("Error de logueo, revisa las credenciales")
        const token = encrypter.createToken(userBD)       
    
        
            

        
        return token
    }
    
    async checkUserAndPassword(email , password){
        const userBD = await userRepository.searchByEmail(email)
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")
     
         const correctPassword = encrypter.comparePasswords(password, userBD.password)
         if (!correctPassword)  throw new AuthenticationError("Error de logueo, revisa las credenciales")
         return userBD
    }

    getLoguedUser(req){
        let user = false
        /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT JWT que guarda una signed cookie */
        if(req.signedCookies.authToken !=undefined){
            const token = req.signedCookies.authToken
            const dataUser = encrypter.getDataFromToken(token)
            user = dataUser
        }
        /* PARA localRegister */
        if(req.user !=undefined){ user = req.user }    
        /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
        if(req.session?.passport !=undefined){ user = req.session.passport.user }
        return user
    }
} 
export const userSessionService = new SessionService()