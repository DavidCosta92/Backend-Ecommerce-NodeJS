import { user_dao_mongo_manager } from "../managers/mongoose/UserDAOMongoose.js"
import { UsertDAOFs } from "../managers/fileSystem/UserDAOFs.js"
import { PERSISTENCE } from "../config/config.js"

class UserRepository{
    userDao

    constructor (userDao){
        this.userDao = userDao
    }   
    
    async findUserByEmail (email){    
        let user ={...await this.userDao.searchByEmail(email)}
        return user;
    }    

}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export let userRepository = new UserRepository(user_dao_mongo_manager)

// if( PERSISTENCE !== "mongoose") userRepository = new UserRepository(UsertDAOFs)