import mongoose from "mongoose";
import { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    email  : { type: String, required: true, unique : true, index:true},
    password  : { type: String, required: true},
    first_name : { type: String, required: true},
    last_name  : { type: String, required: true},
    age  : { type: Number, required: true},
    cart  : { type: Schema.Types.ObjectId, ref:"carts" , required: false},  
    role : {
        type: String,
        enum: {
            values: ['user', 'admin' , 'premium'],
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
    cart  : { type: Schema.Types.ObjectId, ref:"carts" , required: false},  
    role : {
        type: String,
        default:'user',
        required:true
        }              
}, {versionKey : false})

export const userModelGitHub = mongoose.model("gitHubUsers", userSchemaGitHub)