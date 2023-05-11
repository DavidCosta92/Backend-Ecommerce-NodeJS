// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerView, postUser, userLogin, productsView } from "../controllers/users/user.controller.js";
import { authenticator } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import { sessionsRouter } from "./sessionsRouter.js";

export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))

userRouter.use("/session",sessionsRouter)

userRouter.get("/register", registerView)
userRouter.post("/", postUser)
userRouter.get("/login", userLogin)
userRouter.get("/products", authenticator, productsView, (req, res, next)=>{})

userRouter.use(passportInitialize, passportSession)
