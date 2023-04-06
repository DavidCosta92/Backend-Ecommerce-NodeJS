import mongoose from "mongoose";
import { Schema } from 'mongoose'

const cartsCollection = "carts"
const cartsSchema = new mongoose.Schema({
    products:[{product:{pr : {type: Schema.Types.ObjectId,ref:"products"}, q : Number}}],
    default : [],

}, { versionKey: false})

export const cartstModel = mongoose.model(cartsCollection, cartsSchema);