export class Product{
    constructor ({id, title, description,code, price, stock, category, thumbnails}){
        this.id = id;
        this.title = title;
        this.description = description;        
        this.code = code;
        this.price = price; // number
        this.status = true;        
        this.stock = stock; // number
        this.category = category;
        this.thumbnails = thumbnails; // NO ES OBLIGATORIO => array de strings con rutas donde estan las imagenes
    }
}