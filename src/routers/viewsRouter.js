// @ts-nocheck
import express, { Router } from 'express';
import { renderCartsView, renderProductsView, renderCartViewById } from '../controllers/views/views.controller.js';
import { onlyAuthenticated , onlyAdmin, onlyUser , authenticator
} from '../middlewares/authenticator.js';


export const viewsRouter = Router();

viewsRouter.use(express.json()); 

/* http://localhost:8080/api/views/products?limit=2&page=3 */
viewsRouter.get("/products", authenticator, onlyAuthenticated, renderProductsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts", authenticator, onlyAuthenticated, onlyAdmin , renderCartsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
//viewsRouter.get("/carts/:cid", onlyAuthenticated, renderProductsViewById)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts/:cid", authenticator, onlyAuthenticated, onlyAdmin, renderCartViewById)

viewsRouter.get("/chat", authenticator, onlyAuthenticated, onlyUser,(req, res, next)=>{
    res.render("chats", {title: "Chat"})
})