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
    async searchByGitHubUsername (username){    
        return this.userDao.searchByGitHubUsername(username)         
    }  
    async createGitHubUser (user){    
        return this.userDao.createGitHubUser(user)         
    }  
    async updatePasswordUser (email , newPassword){    
        return await this.userDao.updatePasswordUser(email , newPassword)
    } 
    async updateMembership (uid){    
        return await this.userDao.updateMembership(uid)
    }      

    async getAllUsersForMembership(req){
        return await this.userDao.getAllUsersForMembership(req)
    }


}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export let userRepository = new UserRepository(userDaoMongo)
if( PERSISTENCE !== "mongoose") userRepository = new UserRepository(UsertDAOFs)