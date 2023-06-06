import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const ticketCollection = "tickets"
const ticketSchema = new mongoose.Schema({
    code:{ type:String, unique:true, required:true},
    purchase_datetime:{ type:String, required:true}, // date
    amount:{ type:Number, required:true, min:0}, 
    purcharser:{ type:String, required:true, min:1}, 
    acceptedProds:Array,    
    rejectedProds:Array    
}, { versionKey: false})

ticketSchema.plugin(mongoosePaginate);
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

