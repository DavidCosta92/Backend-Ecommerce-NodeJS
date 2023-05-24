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


} 
  export const sessionService = new SessionService()