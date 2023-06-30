import { validateString , validateEmail , validateIntegerNumber} from "./validations/validations.js"

export class Password {
    #password
    
    constructor (password){
        this.#password = validateString("Password",password)
    }
    getPassword(){ return this.#password}
}

