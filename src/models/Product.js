import { validateString , validateRealNumber , validateIntegerNumber} from "./validations/validations.js";
import { Id } from "../utils/IdGenerator.js";


export class Product{
    #id
    #title
    #description       
    #code
    #price
    #status        
    #stock
    #category
    #thumbnails
    #owner
    constructor ({title, description,code, price, stock, category, thumbnails, owner ="admin"}){
        this.#id = new Id();
        this.#title = validateString("Titulo",title)
        this.#description = validateString("Descripcion",description);        
        this.#code = validateString("Codigo del producto",code);
        this.#price = validateRealNumber("Precio",price);
        this.#status = true;        
        this.#stock = validateIntegerNumber("Stock",stock);
        this.#category = validateString("Categoria",category);
        this.#thumbnails = thumbnails; // CUALES SERIAN LAS VALIDACIONES CORRECTAS O NECESARIAS?
        this.#owner = owner // email de owner
    }
    getAllAttr() {
        return {
            id : this.#id,
            title : this.#title,
            description : this.#description, 
            code : this.#code,
            price : this.#price,
            status : this.#status,        
            stock : this.#stock,
            category : this.#category,
            thumbnails : this.#thumbnails,
            owner : this.#owner
        }
    }

}