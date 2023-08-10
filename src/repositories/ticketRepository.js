import { ticketDAOMongo } from "../db/mongoose/managers/TicketDAOMongoose.js"

class TicketRepository{
    ticketDao
    constructor (ticketDao){
        this.ticketDao = ticketDao
    }       
    async createTicket (ticket){  
        return await this.ticketDao.createTicket(ticket)
    }    

}
// TODO: Persistencia en fs, POR EL MOMENTO SOLO MONGOOSE
export const ticketRepository = new TicketRepository(ticketDAOMongo)