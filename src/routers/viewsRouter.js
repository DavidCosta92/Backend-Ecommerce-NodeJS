// @ts-nocheck
import express, { Router } from 'express';
import { onlyAuthenticated} from '../middlewares/authenticator.js';
import { renderCartsView, renderProductsView, renderCartViewById } from '../controllers/views/views.controller.js';


export const viewsRouter = Router();

viewsRouter.use(express.json()); 

/* http://localhost:8080/api/views/products?limit=2&page=3 */
viewsRouter.get("/products", onlyAuthenticated, renderProductsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts", onlyAuthenticated, renderCartsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
//viewsRouter.get("/carts/:cid", onlyAuthenticated, renderProductsViewById)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts/:cid", onlyAuthenticated, renderCartViewById)

viewsRouter.get("/chat", (req, res, next)=>{
    res.render("chats", {title: "Chat"})
})