// @ts-nocheck
import express, { Router } from 'express';
import { productsRouter } from './productsRouter.js';
import { cartsRouter } from './cartsRouter.js';
import { userRouter } from './userSessionRouter.js';
// import { viewsRouter } from './viewsRouter.js';
import { docsRouter } from './docsRouter.js';
import { getCurrentUser } from '../controllers/users/session.controller.js';
import { mockingproducts } from '../controllers/products/products.controller.js';
import { onlyAuthenticatedApi } from '../middlewares/authenticator.js';

export const apiRouter = Router();
apiRouter.use(express.json());

//LISTOS
// localhost:8080/api/
apiRouter.use("/docs", docsRouter)
apiRouter.get("/session/current", getCurrentUser)
apiRouter.get("/chat", onlyAuthenticatedApi /*, onlyUserWeb*/, (req, res, next)=>{

    // aca no deberia ser un render.. deberia ver la forma de enviar la info desde otra forma
    // aca no deberia ser un render.. deberia ver la forma de enviar la info desde otra forma
    // aca no deberia ser un render.. deberia ver la forma de enviar la info desde otra forma
    // aca no deberia ser un render.. deberia ver la forma de enviar la info desde otra forma

    res.render("chats", {title: "Chat"})
})

// PENDIENTES
// PENDIENTES
// PENDIENTES
apiRouter.use("/products",productsRouter);
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/users" , userRouter)
// apiRouter.use("/views", viewsRouter)


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

// apiRouter.get("/", onlyAuthenticatedApi, getProducts)
// apiRouter.get("/add/form" , onlyAuthenticatedWeb, onlyAdminOrPremiumWeb , (req, res, next)=>{    
//     const user = userSessionService.getLoguedUser(req)
//     res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
// })