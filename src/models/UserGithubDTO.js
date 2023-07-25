export class UserGithubDTO{
    #_id
    #username
    #cart
    #role
    #documents
    #last_connection
    #admin
    #adminOrPremium
    #cartAllowed
    constructor ({_id, username, cart , role, documents, last_connection}){
        this.#_id = _id
        this.#username = username
        this.#cart = cart
        this.#role = role
        this.#documents = documents
        this.#last_connection = last_connection
        this.#admin = (role === "admin" )? true : false
        this.#adminOrPremium = (role === "admin" || role === "premium" )? true : false
        this.#cartAllowed = (role === "user" || role === "premium" )? true : false

    }
    getAllAttr(){
        return {
            _id: this.#_id,
            username: this.#username,
            cart: this.#cart,
            role: this.#role,
            admin: this.#admin,
            adminOrPremium: this.#adminOrPremium,
            cartAllowed :this.#cartAllowed,
            documents : this.#documents,
            last_connection : this.#last_connection
        }
    }
}