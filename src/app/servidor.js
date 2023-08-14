// @ts-nocheck
import express from "express"
import { engine } from 'express-handlebars'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { logger } from "../middlewares/loggerMiddleware.js";
import { winstonLogger } from "../utils/logger.js";
import { MONGOOSE_STRING_ATLAS, NODE_ENV, PORT } from "../config/config.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import session from "../middlewares/session.js";
import { errorHandlerAPI , errorHandlerWEB} from "../middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { onlyAuthenticatedWeb, renderHome } from "../middlewares/authenticator.js";
import { apiRouter } from "../routers/apiRouter.js";
import { webRouter } from "../../Front-Handlebars/src/router/webRouter.js";


dotenv.config({path: 'src/.env'});
mongoose.connect(MONGOOSE_STRING_ATLAS)

const app = express();
app.use(session)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(logger)

app.use(express.static('./public'))
app.use("/users", onlyAuthenticatedWeb ,express.static('./public/assets/users'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(passportInitialize, passportSession)

app.get("/", renderHome)
app.use("/api", apiRouter)
app.use("/web", webRouter)

app.use(errorHandlerWEB) 
app.use(errorHandlerAPI) 

const httpServer = app.listen(PORT, () => winstonLogger.info(`Servidor activo, entorno --->>> ${NODE_ENV} <<<--- en port ${PORT}`))



// SOCKET
// SOCKET


import {Server as IOServer} from 'socket.io'
import { productModel } from "../db/mongoose/models/productModel.js";
import { chatModel } from "../db/mongoose/models/chatModel.js";

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