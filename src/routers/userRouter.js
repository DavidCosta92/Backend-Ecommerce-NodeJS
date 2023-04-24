import { Router } from "express";
import express from "express"
import { registerView, postUser, userLogin, productsView } from "../controllers/users/user.controller.js";
import { postSession , deleteSession } from "../controllers/users/session.controller.js";
import { authenticator } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.get("/register", registerView)
userRouter.post("/", postUser)
userRouter.get("/login", userLogin)
userRouter.post("/session", postSession)
userRouter.delete("/session", deleteSession)

userRouter.get("/products", authenticator, productsView)