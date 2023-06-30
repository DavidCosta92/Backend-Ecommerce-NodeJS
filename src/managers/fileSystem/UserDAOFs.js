import fs from 'fs/promises';
// REVISAR SI HAY ALGUN OTRO ERROR LOGICO O DE CODIGO

// AL FINAL, BORRAR EL ARCHIVO "ProductManager.js"

import { validateRealNumber , validateIntegerNumber , validateString} from '../../models/validations/validations.js';

export class UsertDAOFs{
    path = "";
    #products = [];

    constructor (path){
        this.path = path +"/products.json";
    }

    async readProductsFile(){
        try {
            const productsFileJson = await fs.readFile(this.path, "utf-8");
            this.#products = JSON.parse(productsFileJson);            
        } catch (error) {
            throw new Error (error.message);            
        }
    }

    async saveProductsFile(){
        try {
            const productsFileJson = JSON.stringify(this.#products, null, 2);
            await fs.writeFile(this.path, productsFileJson);
        } catch (error) {
            throw new Error (error.message);  
        }
    }
    
    productoValido(product){
        validateRealNumber("Precio",product.price)
        validateIntegerNumber("Stock",product.stock)
        validateString("ID",product.id)
        validateString("Title",product.title)
        validateString("Descripcion",product.description)
        validateString("Codigo",product.code)
        validateString("Categoria",product.category)
        if(product.thumbnail !== undefined && !Array.isArray(product.thumbnail)) throw new Error("Input de thumbnails erroneo, debe ser un Array")
        return true;
    }

    isProductComplete(product){
        let productComplete = false;
        if(!product.title && !product.description && !product.price && !product.thumbnail && !product.code && !product.stock && !product.category){ 
            productComplete = true;
        }
        return productComplete;
    }

    async addProduct(product){
        await this.readProductsFile();
        if (this.productoValido(product)){
            if (this.#products.length === 0){
                this.#products.push(product);
                await this.saveProductsFile();
                return product;
            } else {
                for (const pr of this.#products){
                    if(pr.code === product.code) throw new Error ("Producto ya se encuentra en base de datos")
                }
                this.#products.push(product);
                await this.saveProductsFile();
                return product;
            }
        }
    }

    async getProducts(limit){ 
        await this.readProductsFile();
        if((limit) === undefined || limit === "") return this.#products; 
        const limite = Number(limit);
        validateIntegerNumber("limite",limite) 
        if(limit<1 ) throw new Error ("Limite incorrecto, debe ser mayor a 0");
        return this.#products.slice(0,limit);        
    }

    async getProductById(id){
        await this.readProductsFile();
        const productSearch = this.#products.find(product => product.id === id);            
        if(productSearch === undefined) throw new Error("ID no encontrado");              
        return productSearch;
    }

    async updateProductById(id, product){
        try {
            await this.readProductsFile();  
            let indexToUpdate = this.#products.findIndex(pr => pr.id === id);

            if(this.isProductComplete(product)){
                this.#products.splice(indexToUpdate, 1, product);
            } else {
                let productUpdated = this.#products[indexToUpdate];
                if(product.title) productUpdated.title=product.title; 
                if(product.description) productUpdated.description=product.description; 
                if(product.price) productUpdated.price=product.price; 
                if(product.thumbnail) productUpdated.thumbnail=product.thumbnail; 
                if(product.code) productUpdated.code=product.code; 
                if(product.stock) productUpdated.stock=product.stock; 
                if(product.category) productUpdated.category=product.category; 
                if(product.thumbnails) productUpdated.thumbnails=product.thumbnails; 
            }
            await this.saveProductsFile(); 
            return await this.getProductById(id);           
        } catch (error) {
            throw new Error (error.message);            
        }
    }

    async deleteById (id){
        await this.readProductsFile();
        let indexToDelete = this.#products.findIndex(pr => pr.id === id);
        if (indexToDelete === -1) throw new Error("Producto no encontrado");
        const [productDeleted] =  this.#products.splice(indexToDelete,1);
        await this.saveProductsFile();
        return productDeleted;
    }
}