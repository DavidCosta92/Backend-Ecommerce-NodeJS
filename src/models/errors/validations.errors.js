
export class IllegalInputArg extends Error {
    constructor(description) {
        super();
        this.type = 'Illegal Input';
        this.description = description;
    }
}

export class TicketError extends Error {
    constructor(description) {
        super();
        this.type = 'Ticket Error';
        this.description = description;
    } 
}