function validateEmpty(value){
    
}

function validateString(value){
    validateEmpty(value)
}

function validateInteger(value){
    validateEmpty(value)
    // corroborar que es numero, entero y positivo
}
function validateEmail(value){
    validateString(value)
    // corroborar que tenga @...
    // largo del mail.. ects--
}

export class DataUser{
    #first_name
    #last_name
    #email
    #age
    #password
    #cart
    #role
    constructor ({first_name, last_name, email, age, password, cart, role}){
        this.#first_name = validateString(first_name)
        this.#last_name = validateString(last_name)
        this.#email = validateEmail(email)
        this.#age = validateInteger(age)
        this.#password = password
        this.#cart = cart
        this.#role = validateString(role)
    }
}
