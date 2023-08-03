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
    #documents
    #last_connection
    
    constructor ({first_name, last_name, email, age, password, role, cart=""}){
        this.#first_name = validateString("Nombre",first_name)
        this.#last_name = validateString("Apellido", last_name)
        this.#email = validateEmail("Email", email)
        this.#age = validateIntegerNumber("Edad",age)
        this.#password = new Password(password).getPassword()
        this.#cart = cart
        this.#role = validateString("Rol", role)        
        this.#documents = []
        this.#last_connection = new Date(Date.now()).toLocaleString()
    }

    getFirst_name(){ return this.#first_name}
    getLast_name(){ return this.#last_name}
    getEmail(){ return this.#email}
    getAge(){ return this.#age}
    getPassword(){ return this.#password}
    getCart(){ return this.#cart}
    getRole(){ return this.#role}
    getLast_connection(){ return this.#last_connection}
    getDocuments(){ return this.#documents}
    
    getAllAttr() {
        const data= {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            cart: this.#cart,
            role: this.#role,
            last_connection: this.#last_connection,
            documents: this.#documents,
        }
        return data
    }
    setRole(role){
        this.#role = role
    }
    setCart(cartId){
        this.#cart=cartId
    }
    setLast_connection(){
        this.#last_connection = new Date(Date.now()).toUTCString()
    }
}

export class GithubUser {
    #username
    #cart
    #role
    #documents
    #last_connection
    
    constructor ({username,cart, role}){
        this.#username = validateString("Github username", username)
        this.#cart = cart
        this.#role = validateString("Rol", role)
        this.#documents = [] // [ { name : "" , reference : "" } , {} ]
        this.#last_connection = new Date(Date.now()).toUTCString()
    }
    getUsername(){ return this.#username}
    getCart(){ return this.#cart}
    getRole(){ return this.#role}
    getLast_connection(){ return this.#last_connection}
    getDocuments(){ return this.#documents}
    
    getAllAttr() {
        return {
            username: this.#username,
            cart: this.#cart,
            role: this.#role,
            last_connection: this.#last_connection,
            documents: this.#documents,
        }
    }
    setRole(role){
        this.#role = role
    }
    setLast_connection(){
        this.#last_connection=new Date(Date.now()).toUTCString()
    }
}
