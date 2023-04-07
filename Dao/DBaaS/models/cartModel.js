import mongoose from "mongoose";
import { Schema } from 'mongoose'

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

export const cartstModel = mongoose.model(cartsCollection, cartsSchema);