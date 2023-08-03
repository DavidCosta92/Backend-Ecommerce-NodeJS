// @ts-nocheck
import { encrypter } from "../../utils/encrypter.js";
import { userModel , userModelGitHub} from "../../db/mongoose/models/userModel.js";
import { NotFoundUserWeb, RegisterError, RegisterErrorAlreadyExistUser } from "../../models/errors/register.error.js";
import { MongooseError } from "mongoose";
import { StorageError } from "../../models/errors/storageError.js";

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
    async findUserById(uid){
        return await userModel.findOne({ _id: uid }).lean() 
    } 
    async findGithubUserById(uid){
        return await userModelGitHub.findOne({ _id: uid }).lean() 
    }     
    async searchByGitHubUsername(username){
        const user = await userModelGitHub.findOne({ username: username }).lean()
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
    async updateMembership(uid , newRole){
        try {
            const update = await userModel.updateOne({ _id: uid }, {
                $set: { role: newRole }
            })  
            return update.modifiedCount > 0? {status : 200} : {status : 500}
        } catch (error) {
            throw new StorageError (error)
        }        
    }        
    async setLast_connectionByEmail(email , time){
        try {
            await userModel.updateOne({email : email}, { $set: { last_connection: time } }) 
        } catch (error) {
            throw new Error (error)
        } 
    }
    async setLast_connectionByUsername(username , time){
        try {
            await userModelGitHub.updateOne({username : username}, { $set: { last_connection: time } })  
        } catch (error) {
            throw new Error (error)
        } 
    } 
    async findInactiveUsers(time){
        try {
            const resp = []
            const users = await userModel.find({$or : [ {last_connection : {$lt : time}} , {last_connection : {$exists : false}} ] })    
            resp.push(...users)
            const githubUsers =await userModelGitHub.find( {$or : [ {last_connection : {$lt : time}} , {last_connection : {$exists : false}} ] })     
            resp.push(...githubUsers) 
            return resp
        } catch (error) {
            throw new Error (error)
        } 
    }
    async deleteUserById(uid){
        try {
            return await userModel.findByIdAndDelete(uid)
        } catch (error) {
            throw new StorageError("Error de persistencia")
        }
    }
    async deleteInactiveUsers(time){
        try {
            await userModel.deleteMany( {$or : [ {last_connection : {$lt : time}} , {last_connection : {$exists : false}} ] })             
            await userModelGitHub.deleteMany( {$or : [ {last_connection : {$lt : time}} , {last_connection : {$exists : false}} ] })   
        } catch (error) {
            throw new StorageError("Error en persistencia")
        }
    }
    async updateOneUserDocument( uid , item){
        try {
            return await userModel.updateOne({_id : uid}, { $set: { "documents": item } })
        } catch (error) {
            throw new MongooseError("Error actualizando elemento")
        }
    }
    async updateOneGithubUserDocument( uid , item){
        try {
            return await userModelGitHub.updateOne({_id : uid}, { $set: { "documents": item } })
        } catch (error) {
            throw new MongooseError("Error actualizando elemento")
        }
    }
    async getAllUsersForMembership(req){
        // podria  tildar opcion para solo mostrar un determinado rol
        const {limit, page} = req.query
        
        try {
            let searchParams = {}            
            /* paginado y ordenamiento */        
            const searchLimit = (isNaN(Number(limit)) || limit == "" ) ? 50 : limit
            const searchPage =  (isNaN(Number(page)) || page == "" ) ? 1 : page

            const pageOptions = { limit: searchLimit, page: searchPage, sort : { role : 1 , email : 1} , lean : true}  
            const users = await userModel.paginate( searchParams , pageOptions)

            const response = {
                payload : users.docs,
                totalResults : users.totalDocs,
                totalPages : users.totalPages,
                prevPage : users.prevPage,
                nextPage : users.nextPage,
                page : users.page,
                hasPrevPage : users.hasPrevPage,
                hasNextPage : users.hasNextPage,
                prevLink : users.prevPage? `/api/users/premium/?limit=${searchLimit}&page=${users.prevPage}` : null, 
                nextLink : users.nextPage? `/api/users/premium?limit=${searchLimit}&page=${users.nextPage}`: null,
                limit: searchLimit,
                hayResultados : users.docs.length > 0
            }     
            return response;     
        } catch (error) {            
            throw new Error (error)
        } 
    } 
}       
export const userDaoMongo = new UserDAOMongoose()