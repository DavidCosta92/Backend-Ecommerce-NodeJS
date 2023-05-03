import { hashPassword , comparePasswords } from "../utils/encrypter.js";
import { userModel } from "../../Dao/DBaaS/models/userModel.js";
       
export class UserManager{
    // revisar en user.controller.js los metodos que deberian estar aqui... se supone que en el controller no deberian haber llamados directos al modelo ( no debe haber cosas como estas => userModel.create(user))
    async createUser({user}){ 
        user.password = hashPassword(user.password);        
        return await userModel.create(user)
    }   
    // async postUser(user){    }   
    // async postUser(user){    }   
    // async postUser(user){    }   

    async searchByEmail(email){
        console.log("entrando a user...")
        const user = await userModel.findOne({ email: email }).lean()
        return user;        
    }    
}       
export const userManager = new UserManager()