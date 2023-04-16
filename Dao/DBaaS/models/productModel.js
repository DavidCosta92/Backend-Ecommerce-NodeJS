import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products"
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:String,
    code:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    }, 
    status: Boolean,
    stock:{
        type:Number,
        required:true,
        min:1
    }, 
    category:{
        type: String,
        enum: {
          values: ['comestibles', 'varios'],
          message: '{VALUE} no es una categoria correcta, elige entre: comestibles o varios'
        },
        required:true
      }, 
    thumbnails:Array    
}, { versionKey: false})

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);

