import express, { Router } from 'express';



export const viewsRouter = Router();

viewsRouter.use(express.json()); 


viewsRouter.get("/products", (req, res, next)=>{
    res.render("products", {title: "Productos"})
})

viewsRouter.get("/carts", (req, res, next)=>{
    res.render("carts", {title: "Carrito"})
})

viewsRouter.get("/chat", (req, res, next)=>{
    res.render("chats", {title: "Chat"})
})