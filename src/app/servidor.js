import express from "express"
import { PORT } from "../config/servidor.config.js"
import { productsRouter } from "../routers/productsRouter.js";
import { engine } from 'express-handlebars'
import { cartsRouter } from "../routers/cartsRouter.js";
import mongoose, { Mongoose } from 'mongoose';


const app = express();

app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);


mongoose.connect("mongodb+srv://davidcst2991:davidcst2991coder@ecommerce.3iptaqr.mongodb.net/?retryWrites=true&w=majority") ///ecommerce

// SETEAR CARPETA PUBLICA PARA LEVANTARLA DESDE FRONT
app.use(express.static('./public'))

// CONFIG INICIAL HANDLEBARS
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')



app.use((error, req, res , next)=>{

    switch (error.message){
        case "ID no encontrado" : 
            res.status(404).json({menssage: error.message});
            break;
        case "Producto no encontrado" : 
            res.status(404).json({menssage: error.message});
            break;
        case "Cantidad incorrecta, la cantidad debe ser un numero, entero y mayor a 0" : 
            res.status(400).json({menssage: error.message});
            break;
        case "Producto con campos incompletos o erroneos" : 
            res.status(400).json({menssage: error.message});
            break;
        case "Producto ya se encuentra en base de datos" : 
            res.status(400).json({menssage: error.message});
            break;
        case "Limite incorrecto, el limite debe ser un numero, entero y mayor a 0" : 
            res.status(404).json({menssage: error.message});
            break;
        default : 
            res.status(500).json({menssage: error.message});
    }
})







app.listen(PORT, () => console.log("Servidor activo"))