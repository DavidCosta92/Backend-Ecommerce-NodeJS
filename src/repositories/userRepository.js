import { userDaoMongo } from "../managers/mongoose/UserDAOMongoose.js"
import { UsertDAOFs } from "../managers/fileSystem/UserDAOFs.js"
import { PERSISTENCE } from "../config/config.js"

class UserRepository{
    userDao
    constructor (userDao){
        this.userDao = userDao
    }   
    async createUser({newUserObj}){    
        return await this.userDao.createUser({newUserObj})
    }    
    async existByEmail (email){    
        return this.userDao.existByEmail(email)         
    }  
    async findUserByEmail (email){            
        let user ={...await this.userDao.searchByEmail(email)}
        return user;
    }      
    async findUserById(uid){
        return await this.userDao.findUserById(uid)
    }
    async findGithubUserById(uid){
        return await this.userDao.findGithubUserById(uid)
    }
    async searchByGitHubUsername (username){    
        return this.userDao.searchByGitHubUsername(username)         
    }  
    async searchUserByField({query}){
        return this.userDao.searchUserByField({query})
    }
    async createGitHubUser (user){    
        return this.userDao.createGitHubUser(user)         
    }  
    async updatePasswordUser (email , newPassword){    
        return await this.userDao.updatePasswordUser(email , newPassword)
    } 
    async updateMembership (uid , newRole){    
        return await this.userDao.updateMembership(uid , newRole)
    }      
    async setLast_connectionByEmail (email, time){
        return await this.userDao.setLast_connectionByEmail(email, time)
    }
    async setLast_connectionByUsername(username, time){ 
        return await this.userDao.setLast_connectionByUsername(username, time)
    } 
    async getAllUsersForMembership(req){
        return await this.userDao.getAllUsersForMembership(req)
    } 
    async findInactiveUsers(time){
        return await this.userDao.findInactiveUsers(time)
    }
    async deleteUserById(uid){
        return await this.userDao.deleteUserById(uid)
    }
    async deleteInactiveUsers(time){
        return await this.userDao.deleteInactiveUsers(time)
    }
    async updateOneUserDocument( uid, item){
        return await this.userDao.updateOneUserDocument( uid, item)
    }
    async updateOneGithubUserDocument( uid, item){
        return await this.userDao.updateOneGithubUserDocument( uid, item)
    }

}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export let userRepository = new UserRepository(userDaoMongo)
if( PERSISTENCE !== "mongoose") userRepository = new UserRepository(UsertDAOFs)