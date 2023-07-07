// @ts-nocheck
import express from "express"
import { productsRouter } from "../routers/productsRouter.js";
import { engine } from 'express-handlebars'
import { cartsRouter } from "../routers/cartsRouter.js";
import { viewsRouter } from "../routers/viewsRouter.js";
import { userRouter } from "../routers/userSessionRouter.js";
import mongoose from 'mongoose';
import {Server as IOServer} from 'socket.io'
import { productModel } from "../db/mongoose/models/productModel.js";
import { chatModel } from "../db/mongoose/models/chatModel.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import session from "../middlewares/session.js";
import { errorHandlerAPI , errorHandlerWEB} from "../middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { getCurrentUser, renderHome } from "../middlewares/authenticator.js";
import { MONGOOSE_STRING_ATLAS, NODE_ENV } from "../config/config.js";
import { mockingproducts } from "../controllers/products/products.controller.js";

import dotenv from 'dotenv'
import { logger } from "../middlewares/loggerMiddleware.js";
import { winstonLogger } from "../utils/logger.js";

dotenv.config({path: 'src/.env'});

mongoose.connect(MONGOOSE_STRING_ATLAS)

const app = express();
app.use(session)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(logger)

app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users" , userRouter);
app.use("/api/views", viewsRouter);

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(passportInitialize, passportSession)

app.get("/", renderHome)
app.get("/api/session/current", getCurrentUser)
app.get("/mockingproducts", mockingproducts);
app.get("/loggerTest", (req, res)=>{
    req.logger.debug("Este es un ejemplo de un log de nivel debug")
    req.logger.http("Este es un ejemplo de un log de nivel http")
    req.logger.info("Este es un ejemplo de un log de nivel info")
    req.logger.warning ("Este es un ejemplo de un log de nivel warning")
    req.logger.error("Este es un ejemplo de un log de nivel error")
    req.logger.fatal("Este es un ejemplo de un log de nivel fatal")
    res.send({message:"PRueba de loggers"})
});


app.use(errorHandlerWEB) 
app.use(errorHandlerAPI) 

const httpServer = app.listen(process.env.PORT, () => winstonLogger.info(`Servidor activo, entorno ${NODE_ENV} en host ${process.env.PORT}`))//console.log("Servidor activo",process.env.PORT,  "Enviroment =>", NODE_ENV))

export const io = new IOServer(httpServer)

/* envio de socket al req, PARA PODER USAR EL SOCKET EN CUALQUIER PETICION? */
app.use((req, res, next) => {
    req['io'] = io
    next()
})


io.on('connection', async clientSocket=>{ 
    //conexion chat
    io.emit('newChatClient', await chatModel.find())

    clientSocket.on('newMessage', async message=>{     
    await chatModel.create({ user:  message["user"] , message:  message["message"] })
    io.emit("updateMessages", await chatModel.find() )
    })

    clientSocket.on('newUser', async user=>{    
        clientSocket.broadcast.emit("newUser", user)
    })


    //PRODUCT SOCKET
    console.log("nuevo cliente conectado", clientSocket.id)
    io.emit('newClient',  await productModel.find())

    //ACTUALIZAR AL HABER CAMBIOS
    clientSocket.on('actualizar', async ()=>{  
        io.emit('actualizarRender', await productModel.find())
   })
   clientSocket.on('actualizarProductsRenders', async () =>{    
    const prodUpdated = await productModel.find();
    io.emit('actualizarRender', await productModel.find() )    
    })

   clientSocket.on('eliminarProducto', async id=>{
        await productModel.findByIdAndDelete(id);
        io.emit('actualizarRender', await productModel.find())
   })

   clientSocket.on('eliminarProducto', async () =>{
    io.emit('actualizarRender', await productModel.find())    
    })

})