// @ts-nocheck
import { hashPassword , comparePasswords } from "../utils/encrypter.js";
import { userModel , userModelGitHub} from "../../Dao/DBaaS/models/userModel.js";
import { RegisterError, RegisterErrorAlreadyExistUser } from "../entities/error/registerError.js";
       
export class UserManager{
    async createUser({user}){
        const alreadyExistUser = await this.searchByEmail(user.email)

       if(alreadyExistUser) throw new RegisterErrorAlreadyExistUser("Error de registro, usuario YA EXISTE")
       
        user.password = hashPassword(user.password);  
        await userModel.create(user)   
        const newUser = await this.searchByEmail(user.email).lean()

        if (!newUser) throw new RegisterError("Error al crear nuevo usuario")

        return {newUser , code:201}
    }   

    async searchByEmail(email){
        if (!user) throw new Error("USER NOT FOUND")
        const user = await userModel.findOne({ email: email }).lean()
        return user;        
    }
    async searchByGitHubUsername(username){
        const user = await userModelGitHub.findOne({ email: username }).lean()
        return user;        
    }
    async createGitHubUser({user}){
        const gitHubUser = await userModelGitHub.create(user)
        return {gitHubUser , code:201}
    }        
}       
export const userManager = new UserManager()