import mongoose from "mongoose";
import { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"

const cartsCollection = "carts"
const cartsSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: Schema.Types.ObjectId,
                ref:"products"                
            },
            quantity:Number
        }
    ],
    default : [],
}, { versionKey: false})

cartsSchema.plugin(mongoosePaginate);

export const cartstModel = mongoose.model(cartsCollection, cartsSchema);