import { ticketDAOMongo } from "../managers/mongoose/TicketDAOMongoose.js"
import { TicketErrorWEB } from "../models/errors/validations.errors.js"

class TicketRepository{
    ticketDao
    constructor (ticketDao){
        this.ticketDao = ticketDao
    }       
    async createTicket (ticket){  
        return await this.ticketDao.createTicket(ticket)
    }    

}
// en esta parte debo elegir si es mongo o fs o otra persistencia... POR EL MOMENTO SOLO MONGOOSE
export const ticketRepository = new TicketRepository(ticketDAOMongo)