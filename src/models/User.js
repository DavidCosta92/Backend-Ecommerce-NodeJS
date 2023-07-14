import { validateString , validateEmail , validateIntegerNumber} from "./validations/validations.js"
import { Password } from "./Password.js"
export class User {
    #first_name
    #last_name
    #email
    #age
    #password
    #cart
    #role
    
    constructor ({first_name, last_name, email, age, password, role, cart=""}){
        this.#first_name = validateString("Nombre",first_name)
        this.#last_name = validateString("Apellido", last_name)
        this.#email = validateEmail("Email", email)
        this.#age = validateIntegerNumber("Edad",age)
        this.#password = new Password(password).getPassword()
        this.#cart = cart
        this.#role = validateString("Rol", role)        
    }

    getFirst_name(){ return this.#first_name}
    getLast_name(){ return this.#last_name}
    getEmail(){ return this.#email}
    getAge(){ return this.#age}
    getPassword(){ return this.#password}
    getCart(){ return this.#cart}
    getRole(){ return this.#role}
    
    getAllAttr() {
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            cart: this.#cart,
            role: this.#role,
        }
    }
    setRole(role){
        this.#role = role
    }
    setCart(cartId){
        this.#cart=cartId
    }
}

export class GithubUser {
    #username
    #cart
    #role
    
    constructor ({username,cart, role}){
        this.#username = validateString("Github username", username)
        this.#cart = cart
        this.#role = validateString("Rol", role)
    }
    getUsername(){ return this.#username}
    getCart(){ return this.#cart}
    getRole(){ return this.#role}
    
    getAllAttr() {
        return {
            username: this.#username,
            cart: this.#cart,
            role: this.#role,
        }
    }
    setRole(role){
        this.#role = role
    }
}
