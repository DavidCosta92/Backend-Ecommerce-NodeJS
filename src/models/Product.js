import { validateString , validateRealNumber , validateIntegerNumber} from "./validations/validations.js";
import { Id } from "../utils/IdGenerator.js";


export class Product{
    constructor ({title, description,code, price, stock, category, thumbnails}){
        this.id = new Id();
        this.title = validateString("Titulo",title)
        this.description = validateString("Descripcion",description);        
        this.code = validateString("Codigo del producto",code);
        this.price = validateRealNumber("Precio",price);
        this.status = true;        
        this.stock = validateIntegerNumber("Stock",stock);
        this.category = validateString(category);
        this.thumbnails = thumbnails; // CUALES SERIAN LAS VALIDACIONES CORRECTAS O NECESARIAS?
    }
}