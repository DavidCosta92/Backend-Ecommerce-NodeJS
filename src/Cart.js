export class Cart{
    products= []; //Array que contendrá objetos que representen cada producto
    /*  [ 
        {idProduct : 123 , quantity: 10} , 
        {idProduct : 123 , quantity: 10} , 
        {idProduct : 123 , quantity: 10} 
    ]*/
        // SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
        //quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    
    
    constructor (id){
        this.id = id;
    }
}