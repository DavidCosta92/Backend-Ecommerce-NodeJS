// @ts-nocheck
import express, { Router } from 'express';
import { renderCartsView, renderProductsView, renderCartViewById } from '../controllers/views/views.controller.js';
import { onlyAuthenticatedWeb , onlyAdminWeb, onlyUserWeb , authenticator
} from '../middlewares/authenticator.js';

export const viewsRouter = Router();

viewsRouter.use(express.json()); 

viewsRouter.get("/products", authenticator, onlyAuthenticatedWeb, renderProductsView)
viewsRouter.get("/carts", authenticator, onlyAuthenticatedWeb, onlyAdminWeb, renderCartsView)
viewsRouter.get("/carts/:cid", authenticator, onlyAuthenticatedWeb, onlyAdminWeb, renderCartViewById)

viewsRouter.get("/chat", authenticator, onlyAuthenticatedWeb, onlyUserWeb,(req, res, next)=>{
    res.render("chats", {title: "Chat"})
})