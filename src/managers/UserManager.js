import { hashPassword , comparePasswords } from "../utils/encrypter.js";
import { userModel } from "../../Dao/DBaaS/models/userModel.js";
import { RegisterErrorAlreadyExistUser } from "../entities/error/registerError.js";
       
export class UserManager{
    // revisar en user.controller.js los metodos que deberian estar aqui... se supone que en el controller no deberian haber llamados directos al modelo ( no debe haber cosas como estas => userModel.create(user))
    async createUser({user}){ 
        const alreadyExistUser = await this.searchByEmail(user.email)

       if(alreadyExistUser) throw new RegisterErrorAlreadyExistUser("Error de registro, usuario YA EXISTE")
       
        user.password = hashPassword(user.password);  
        const newUser = await userModel.create(user)      
        return {newUser , code:201}
    }   
    
    // async postUser(user){    }   
    // async postUser(user){    }   
    // async postUser(user){    }   

    async searchByEmail(email){
        const user = await userModel.findOne({ email: email }).lean()
        return user;        
    }    
}       
export const userManager = new UserManager()