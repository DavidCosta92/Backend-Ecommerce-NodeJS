// @ts-nocheck
import { hashPassword , comparePasswords } from "../utils/encrypter.js";
import { userModel , userModelGitHub} from "../../Dao/DBaaS/models/userModel.js";
import { RegisterErrorAlreadyExistUser } from "../entities/error/registerError.js";
       
export class UserManager{
    // revisar en user.controller.js los metodos que deberian estar aqui... se supone que en el controller no deberian haber llamados directos al modelo ( no debe haber cosas como estas => userModel.create(user))
    async createUser({user}){
        const alreadyExistUser = await this.searchByEmail(user.email)

       if(alreadyExistUser) throw new RegisterErrorAlreadyExistUser("Error de registro, usuario YA EXISTE")
       
        user.password = hashPassword(user.password);  
        await userModel.create(user)   
        const newUser = await this.searchByEmail(user.email)
        return {newUser , code:201}
    }   
    
    // async postUser(user){    }   
    // async postUser(user){    }   
    // async postUser(user){    }   

    async searchByEmail(email){
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