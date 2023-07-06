import { ticketRepository } from "../repositories/ticketRepository.js";
import { Ticket } from "../models/Ticket.js";

class TicketService{
    ticketRepository

    constructor(ticketRepository){    
        this.ticketRepository = ticketRepository;
    }

    async newTicket (acceptedProd , rejectedProd , totalAmount , user, req, res, next){
        try {            
            const ticket = new Ticket (acceptedProd , rejectedProd  , totalAmount , user).getAllAttr() 
            return await this.ticketRepository.createTicket(ticket) 
        } catch (error) {
            next(error)
        }
    }
}
export const ticketService = new TicketService(ticketRepository)