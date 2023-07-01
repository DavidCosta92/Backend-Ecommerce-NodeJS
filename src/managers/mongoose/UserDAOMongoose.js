// @ts-nocheck
import { encrypter } from "../../utils/encrypter.js";
import { userModel , userModelGitHub} from "../../db/mongoose/models/userModel.js";
import { NotFoundUserWeb, RegisterError, RegisterErrorAlreadyExistUser } from "../../models/errors/register.error.js";

export class UserDAOMongoose{ 
    
    async createUser({newUserObj}){
        const alreadyExistUser = await this.existByEmail(newUserObj.email)
        if(alreadyExistUser) throw new RegisterErrorAlreadyExistUser("Error de registro, usuario YA EXISTE")     

        newUserObj.password = encrypter.hashPassword(newUserObj.password); 

        await userModel.create(newUserObj)   
        const newUser = await this.searchByEmail(newUserObj.email)

        if (!newUser) throw new RegisterError("Error al crear nuevo usuario")
        return {newUser , code:201}
    }
    async existByEmail(email){
        return await userModel.findOne({ email: email }) !==null? true : false;        
    }
    async searchByEmail(email){
        const user = await userModel.findOne({ email: email }).lean()    
        if (!user) throw new NotFoundUserWeb("Usuario no encontrado")
        return user;        
    }
    async searchByGitHubUsername(username){
        const user = await userModelGitHub.findOne({ email: username }).lean()
        return user;        
    }
    async createGitHubUser(user){
        const gitHubUser = await userModelGitHub.create(user)
        return {gitHubUser , code:201}
    }        
    async updatePasswordUser(email , password){
        try {
            const user = await userModel.findOne({email : email})
            const encryptedPassword = encrypter.hashPassword(password)
            await userModel.updateOne({ email: email }, {
                $set: { password: encryptedPassword }
            })
            user.save()
            return await userModel.findOne({email : email})
        } catch (error) {
            throw new Error (error)
        }
    }
}       
export const userDaoMongo = new UserDAOMongoose()