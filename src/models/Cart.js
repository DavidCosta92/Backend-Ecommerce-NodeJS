import { validateString } from "./validations/validations.js"

export class Cart{
    products= [];
    constructor (id){
        this.id = validateString("ID Carta",id);
    }
}