// @ts-nocheck
import express, { Router } from 'express';
import { renderCartsView, renderProductsView, renderCartViewById } from '../controllers/views/views.controller.js';
import { onlyAuthenticatedWeb , onlyAdminWeb, onlyUser , authenticator
} from '../middlewares/authenticator.js';

export const viewsRouter = Router();

viewsRouter.use(express.json()); 

/* http://localhost:8080/api/views/products?limit=2&page=3 */
viewsRouter.get("/products", authenticator, onlyAuthenticatedWeb, renderProductsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts", authenticator, onlyAuthenticatedWeb, onlyAdminWeb, renderCartsView)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
//viewsRouter.get("/carts/:cid", onlyAuthenticatedWeb, renderProductsViewById)

/* http://localhost:8080/api/views/carts?limit=1&page=2 */
viewsRouter.get("/carts/:cid", authenticator, onlyAuthenticatedWeb, onlyAdminWeb, renderCartViewById)

viewsRouter.get("/chat", authenticator, onlyAuthenticatedWeb, onlyUser,(req, res, next)=>{
    res.render("chats", {title: "Chat"})
})