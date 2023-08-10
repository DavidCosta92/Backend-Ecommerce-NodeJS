// @ts-nocheck
import { productModel } from "../models/productModel.js";
import { ticketModel } from "../models/ticketModel.js";
import { StorageError } from "../../../models/errors/storageError.js";

class TicketDAOMongoose{
    model
    constructor(model){
        this.model = model;
    }

    async createTicket (ticket){
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            throw new StorageError(error)
        }
    }
}

export const ticketDAOMongo = new TicketDAOMongoose(productModel);