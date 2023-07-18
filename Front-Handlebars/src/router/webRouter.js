// @ts-nocheck
import express, { Router } from 'express';
import { productsWebRouter } from './productsWebRouter.js';
import { authenticatorWeb, onlyAuthenticatedWeb, onlyUserWeb } from '../../../src/middlewares/authenticator.js';
import { docsRouter } from '../../../src/routers/docsRouter.js';
import { mockingproductsWEB } from '../controllers/products.web.controller.js';
import { getCurrentUserWeb } from '../controllers/session.web.controller.js';
import { cartsWebRouter } from './cartWebRouter.js';

export const webRouter = Router();
webRouter.use(express.json());

//LISTOS
// localhost:8080/web/
webRouter.use("/docs", docsRouter)
webRouter.use("/products", productsWebRouter);  
webRouter.use("/carts", cartsWebRouter)
// Preguntar si estos endpoints para final
webRouter.get("/mockingproducts", mockingproductsWEB)
webRouter.get("/loggerTest", (req, res)=>{
    req.logger.debug("Este es un ejemplo de un log de nivel debug")
    req.logger.http("Este es un ejemplo de un log de nivel http")
    req.logger.info("Este es un ejemplo de un log de nivel info")
    req.logger.warning ("Este es un ejemplo de un log de nivel warning")
    req.logger.error("Este es un ejemplo de un log de nivel error")
    req.logger.fatal("Este es un ejemplo de un log de nivel fatal")
    res.send({message:"PRueba de loggers"})
});


webRouter.get("/session/current", authenticatorWeb, onlyAuthenticatedWeb,  getCurrentUserWeb)
webRouter.get("/chat", authenticatorWeb, onlyAuthenticatedWeb /*, onlyUserWeb*/, (req, res, next)=>{
    res.render("chats", {title: "Chat"})
})


// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES

import { userRouter } from '../../../src/routers/userSessionRouter.js';
webRouter.use("/users" , userRouter)  // hago nuevos routers??? se llenaria mucho de archivos pero seria la forma mas organizada de hacerlos
// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES
// PENDIENTES
