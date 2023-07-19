export class UserGithubDTO{
    #username
    #cart
    #role
    #admin
    #adminOrPremium
    #cartAllowed
    constructor ({username, cart , role}){
        this.#username = username
        this.#cart = cart
        this.#role = role
        this.#admin = (role === "admin" )? true : false
        this.#adminOrPremium = (role === "admin" || role === "premium" )? true : false
        this.#cartAllowed = (role === "user" || role === "premium" )? true : false
    }
    getAllAttr(){
        return {
            username: this.#username,
            cart: this.#cart,
            role: this.#role,
            admin: this.#admin,
            adminOrPremium: this.#adminOrPremium,
            cartAllowed :this.#cartAllowed
        }
    }
}