import { Id } from "../utils/IdGenerator.js";

export class Cart{
    products= [];
    constructor (){
        this.id = new Id()
    }
}