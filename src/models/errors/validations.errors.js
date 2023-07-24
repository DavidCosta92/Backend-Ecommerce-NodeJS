
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
export class TicketErrorWEB extends Error {
    constructor(description) {
        super();
        this.type = 'Ticket Error WEB';
        this.description = description;
    } 
}
// ERRORES WEB
export class IllegalInputArgWEB extends Error {
    constructor(description) {
        super();
        this.type = 'Illegal Input WEB';
        this.description = description;
    }
}

export class DocumentIncompleteError extends Error {
    constructor (description){
        super()
        this.type = 'Documentation incomplete';
        this.description = description;
    }
}