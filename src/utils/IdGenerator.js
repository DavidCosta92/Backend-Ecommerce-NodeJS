import { randomUUID } from 'crypto'

export class Id extends String{
    value
    constructor (){
        super()
        this.value =randomUUID()
    }
}