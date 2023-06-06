// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { ticketModel } from "../../db/mongoose/models/ticketModel.js";
import { Ticket } from "../../models/Ticket.js";

class TicketDAOMongoose{
    model
    constructor(model){
        this.model = model;
    }

    async createTicket (acceptedProds , rejectedProds , amount , purchaser, next){
        try {
            const ticket = new Ticket (acceptedProds , rejectedProds , amount , purchaser).getAllAttr()
            return await ticketModel.create(ticket)            
        } catch (error) {            
            console.log("ERROR >",error)
            next(error);
        }
    }
}

export const ticketDAOMongo = new TicketDAOMongoose(productModel);