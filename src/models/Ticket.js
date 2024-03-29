
import { randomUUID } from "crypto";
import { validateAcceptedProd , validateRealNumber , validateEmail } from "./validations/validations.js";

export class Ticket {
    #code
    #purchase_datetime
    #amount
    #purcharser
    #acceptedProds
    #rejectedProds

    constructor (acceptedProds , rejectedProds , amount, purcharser){
        this.#acceptedProds = validateAcceptedProd(acceptedProds)
        this.#rejectedProds = rejectedProds
        this.#code = randomUUID();
        this.#purchase_datetime = new Date(Date.now()).toUTCString()
        this.#amount = validateRealNumber("Precio total de compra",amount)
        this.#purcharser = purcharser // Email no es validado, para permitir compras de usuarios github que no tengan email
    }
    getAcceptedProds(){ return this.#acceptedProds}
    getRejectedProds(){ return this.#rejectedProds}
    getCode(){ return this.#code}
    getPurchase_datetime(){ return this.#purchase_datetime}
    getAmount(){ return this.#amount}
    getPurcharser(){ return this.#purcharser}
    
    getAllAttr() {
        return {
            acceptedProds: this.#acceptedProds,
            rejectedProds: this.#rejectedProds,
            code: this.#code,
            purchase_datetime: this.#purchase_datetime,
            amount: this.#amount,
            purcharser: this.#purcharser,
        }
    }
}

