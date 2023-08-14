import { validateString , validateRealNumber , validateIntegerNumber} from "./validations/validations.js";

export class Product{
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
        this.#title = validateString("Titulo",title)
        this.#description = validateString("Descripcion",description);        
        this.#code = validateString("Codigo del producto",code);
        this.#price = validateRealNumber("Precio",price);
        this.#status = true;        
        this.#stock = validateIntegerNumber("Stock",stock);
        this.#category = validateString("Categoria",category);
        this.#thumbnails = thumbnails; // CUALES SERIAN LAS VALIDACIONES CORRECTAS O NECESARIAS?
        this.#owner = owner
    }
    getAllAttr() {
        return {
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