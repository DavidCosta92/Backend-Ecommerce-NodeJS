// @ts-nocheck
import { AuthenticationError } from "../models/errors/authentication.error.js"
import { encrypter } from "../utils/encrypter.js"
import { userRepository } from "../repositories/userRepository.js"
import { userService } from "./userService.js"
import { UserGithubDTO } from "../models/UserGithubDTO.js"
import { UserDTO } from "../models/UserDTO.js"

class SessionService {
    async getSessionToken(email, password) {
        try {
            const userBD = await userRepository.findUserByEmail(email)  
            const correctPassword = encrypter.comparePasswords( password, userBD.password)
            if(correctPassword){
                const userDto = new UserDTO ({...userBD}).getAllAttr()
                return encrypter.createToken(userDto) 
            }
            throw new Error()
        } catch (error) {
            throw new AuthenticationError("Error de logueo, revisa las credenciales")
        }
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
    async updateLastConnection(req , res , next){
        if(req.body.email){
            await userService.setLast_connectionByEmail(req.body.email)
        } else if(req.usernameGithub){
            await userService.setLast_connectionByUsername(req.usernameGithub)
        }
    }
} 
export const userSessionService = new SessionService()