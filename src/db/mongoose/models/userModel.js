import mongoose from "mongoose";
import { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"

const userSchema = new mongoose.Schema({
    email  : { type: String, required: true, unique : true, index:true},
    password  : { type: String, required: true},
    first_name : { type: String, required: true},
    last_name  : { type: String, required: true},
    age  : { type: Number, required: true},
    cart  : { type: Schema.Types.ObjectId, ref:"carts" , required: false},
    documents : Array ,
    last_connection :{ type : String , required : true} ,
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
userSchema.plugin(mongoosePaginate);
export const userModel = mongoose.model("users", userSchema)



const userSchemaGitHub = new mongoose.Schema({
    username  : { type: String, required: true, unique : true, },
    cart  : { type: Schema.Types.ObjectId, ref:"carts" , required: false},
    documents : Array ,
    last_connection :{ type : String , required : true} ,  
    role : {
        type: String,
        default:'user',
        required:true
        }              
}, {versionKey : false})

export const userModelGitHub = mongoose.model("gitHubUsers", userSchemaGitHub)