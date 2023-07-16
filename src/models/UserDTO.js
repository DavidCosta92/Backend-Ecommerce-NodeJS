export class UserDTO{
    #first_name
    #last_name
    #email
    #age
    #cart
    #role
    #admin
    #adminOrPremium
    #cartAllowed
    constructor ({first_name , last_name , email , age , cart , role}){
        this.#first_name = first_name
        this.#last_name = last_name
        this.#email = email
        this.#age = age
        this.#cart = cart
        this.#role = role
        this.#admin = (role === "admin" )? true : false
        this.#adminOrPremium = (role === "admin" || role === "premium" )? true : false
        this.#cartAllowed = (role === "user" || role === "premium" )? true : false
    }
    getAllAttr(){
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            cart: this.#cart,
            role: this.#role,
            admin: this.#admin,
            adminOrPremium: this.#adminOrPremium,
            cartAllowed :this.#cartAllowed
        }
    }
}