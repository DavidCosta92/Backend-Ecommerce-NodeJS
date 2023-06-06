
import { randomUUID } from "crypto";

// validaciones tickets.

function validateAcceptedProd(acceptedProds){    
    if(acceptedProds.length==0){
        throw new Error("DEBEN HABER PRODUCTOS ACCEPTADOS PARA CONTINUAR")
    }
    return acceptedProds
}

function validateAmount(amount){
    if(isNaN(amount) || amount<0){
        throw new Error("AMOUNT DEBE SER UN NUMERO, MAYOR A 0")
    }
    return amount
}
function validatePurcharser(purcharser){
    if(purcharser == undefined ||purcharser.length<5){
        throw new Error("SE REQUIERE EMAIL DE COMPRADOR, REVISA EL CAMPO PURCHARSER")
    }
    return purcharser
}
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
        this.#purchase_datetime = Date.now()
        this.#amount = validateAmount(amount)
        this.#purcharser = validatePurcharser(purcharser)
    }
    
    // al ser persitido reciEn ID (de mongo db),   
    
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

