// @ts-nocheck
import express, { Router } from 'express';
import { productsRouter } from './productsRouter.js';
import { cartsRouter } from './cartsRouter.js';
import { userRouter } from './userSessionRouter.js';
import { docsRouter } from './docsRouter.js';
import { getCurrentUser } from '../controllers/session.controller.js';
import { mockingproducts } from '../controllers/products.controller.js';
import { onlyAuthenticatedApi } from '../middlewares/authenticator.js';

export const apiRouter = Router();
apiRouter.use(express.json());

apiRouter.use("/docs", docsRouter)
apiRouter.use("/users" , userRouter)
apiRouter.use("/products",productsRouter);
apiRouter.use("/carts", cartsRouter)

apiRouter.get("/session/current", getCurrentUser)
apiRouter.get("/chat", onlyAuthenticatedApi, (req, res, next)=>{

    // aca no deberia ser un render.. deberia refactorizarlo para poder enviar la info desde otra forma, por otro front o api directameente

    res.render("chats", {title: "Chat"})
})
// Preguntar si estos endpoints para final
apiRouter.get("/mockingproducts", mockingproducts)
apiRouter.get("/loggerTest", (req, res)=>{
    req.logger.debug("Este es un ejemplo de un log de nivel debug")
    req.logger.http("Este es un ejemplo de un log de nivel http")
    req.logger.info("Este es un ejemplo de un log de nivel info")
    req.logger.warning ("Este es un ejemplo de un log de nivel warning")
    req.logger.error("Este es un ejemplo de un log de nivel error")
    req.logger.fatal("Este es un ejemplo de un log de nivel fatal")
    res.send({message:"PRueba de loggers"})
});
