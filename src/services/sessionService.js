// @ts-nocheck
import { AuthenticationError } from "../entities/error/authenticationError.js"
import { User_dao_mongo_manager } from "../managers/mongoose/UserManager.js"
import { encrypter } from "../utils/encrypter.js"

class SessionService {
    async getSessionToken(email, password) {
        const userBD = await User_dao_mongo_manager.searchByEmail(email)
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")     
         const correctPassword = encrypter.comparePasswords(password , userBD.password)
         if (!correctPassword)  throw new AuthenticationError("Error de logueo, revisa las credenciales")
         const token = encrypter.createToken(userBD)
         return token
    }
    
    async checkUserAndPassword(email , password){
        const userBD = await User_dao_mongo_manager.searchByEmail(email)
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
  export const sessionService = new SessionService()