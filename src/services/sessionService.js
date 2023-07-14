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
    async getSessionTokenForGithub(username) {
        const userGithubBD = await userRepository.searchByGitHubUsername(username)
        if (!userGithubBD) throw new AuthenticationError("Error de logueo mediante Github, intenta nuevamente")    
        const token = encrypter.createToken(userGithubBD)       
        return token
    }    
    async checkUserAndPassword(email , password){
        const userBD = await userRepository.searchByEmail(email)
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")
        const correctPassword = encrypter.comparePasswords(password, userBD.password)
        if (!correctPassword)  throw new AuthenticationError("Error de logueo, revisa las credenciales")
        return userBD
    }
    getLoguedUser(req , res , next){
        let user = false
        if(req.signedCookies.authToken !=undefined){
            const token = req.signedCookies.authToken
            const dataUser = encrypter.getDataFromToken(token)
            user = dataUser
        }
        return user
    }
} 
export const userSessionService = new SessionService()