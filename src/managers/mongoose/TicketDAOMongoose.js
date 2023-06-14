// @ts-nocheck
import { productModel } from "../../db/mongoose/models/productModel.js";
import { ticketModel } from "../../db/mongoose/models/ticketModel.js";
import { Ticket } from "../../models/Ticket.js";

class TicketDAOMongoose{
    model
    constructor(model){
        this.model = model;
    }

    async createTicket (acceptedProds , rejectedProds , amount , purchaser,req, res, next){
        try {
            const ticket = new Ticket (acceptedProds , rejectedProds , amount , purchaser).getAllAttr()
            const newTicket = await ticketModel.create(ticket)
            return newTicket
        } catch (error) {            
            console.log("ERROR >",error)
            next(error);
        }
    }
}

export const ticketDAOMongo = new TicketDAOMongoose(productModel);