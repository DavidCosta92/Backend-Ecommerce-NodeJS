import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email  : { type: String, required: true, unique : true, },
    password  : { type: String, required: true},
    first_name : { type: String, required: true},
    last_name  : { type: String, required: true},
    age  : { type: Number, required: true},
    cart  : { type: String, required: false},  // REALIZE CAMBIOS, REVISAR FUNCIONAMIENTO GENERAL
    role : {   // REALIZE CAMBIOS, REVISAR FUNCIONAMIENTO GENERAL
        type: String,
        enum: {
            values: ['user', 'admin'],   // REALIZE CAMBIOS, REVISAR FUNCIONAMIENTO GENERAL
            default:'user',
            message: '{VALUE} no es correcto'
            },
        required:true
        }       
        
}, {versionKey : false})

export const userModel = mongoose.model("users", userSchema)



const userSchemaGitHub = new mongoose.Schema({
    email  : { type: String, required: true, unique : true, },
    password  : { type: String, required: false},
    first_name : { type: String, required: false},
    last_name  : { type: String, required: false},
    age  : { type: Number, required: false},
    cart  : { type: String, required: false},   // REALIZE CAMBIOS, REVISAR FUNCIONAMIENTO GENERAL
    role : {    // REALIZE CAMBIOS, REVISAR FUNCIONAMIENTO GENERAL
        type: String,
        default:'user',
        required:true
        }       
        
}, {versionKey : false})

export const userModelGitHub = mongoose.model("gitHubUsers", userSchemaGitHub)