import { validateString , validateEmail , validateIntegerNumber} from "./validations/validations.js"

export class DataUser{
    #first_name
    #last_name
    #email
    #age
    #password
    #cart
    #role
    constructor ({first_name, last_name, email, age, password, cart, role}){
        this.#first_name = validateString("Nombre", first_name)
        this.#last_name = validateString("Apellido", last_name)
        this.#email = validateEmail("Email", email)
        this.#age = validateIntegerNumber("Edad", age)
        this.#password = validateString("Contraseña",password)
        this.#cart = cart
        this.#role = validateString("Rol", role)
    }
}
