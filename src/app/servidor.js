import express from "express"
import { PORT , mongooseConnectStringToAtlas } from "../config/servidor.config.js"
import { productsRouter } from "../routers/productsRouter.js";
import { engine } from 'express-handlebars'
import { cartsRouter } from "../routers/cartsRouter.js";
import { viewsRouter } from "../routers/viewsRouter.js";
import { userRouter } from "../routers/userSessionRouter.js";
import { cartsRouterFileSystem } from "../routers/cartsRouterFileSystem.js";
import mongoose from 'mongoose';
import {Server as IOServer} from 'socket.io'
import { productModel } from "../../Dao/DBaaS/models/productModel.js";
import { chatModel } from "../../Dao/DBaaS/models/chatModel.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import session from "../middlewares/session.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

mongoose.connect(mongooseConnectStringToAtlas) // =>  REEMPLAZAR PARA CONECTAR A BD ATLAS..

const app = express();
app.use(session)
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/views",viewsRouter);

app.use("/api/fs/carts",cartsRouterFileSystem);
app.use("/api/users" ,userRouter) 
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(passportInitialize, passportSession)

app.get("/", (req, res, next)=>{
    res.render("home")
})

app.use(errorMiddleware)


const httpServer = app.listen(PORT, () => console.log("Servidor activo"))

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