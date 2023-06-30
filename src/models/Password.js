import { validatePasswords } from "./validations/validations.js"

// Pensar otras validaciones especiales para password.. no permitir escaleras o parecidas
export class Password {
    #password
    
    constructor (password){
        this.#password = validatePasswords("Password",password)
    }
    getPassword(){ return this.#password}
}

