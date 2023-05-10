// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerView, postUser, userLogin, productsView } from "../controllers/users/user.controller.js";
import { postSession , postSessionCookie , localRegister ,  deleteSession , sendStatus } from "../controllers/users/session.controller.js";
import { authenticator } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { authLocal , authLocalRegister , authGithub , callbackAuthGithub } from "../middlewares/passport.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";


export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))
userRouter.get("/register", registerView)
userRouter.post("/", postUser)
userRouter.get("/login", userLogin)
userRouter.get("/products", authenticator, productsView, (req, res, next)=>{})

userRouter.use(passportInitialize, passportSession)


userRouter.post("/session", postSession)
userRouter.delete("/session", deleteSession)
//--- passport con local ---
// actualmente los formularios estan seteados para trabajar con passport.. cambiar ruta del form post
userRouter.post('/session/localLogin', authLocal, postSession)
userRouter.post('/session/localRegister', authLocalRegister , sendStatus)

//--- login con github ---
userRouter.get('/session/github', authGithub)
userRouter.get('/session/githubAuth', callbackAuthGithub,(req, res, next) => { res.redirect('/api/users/products') })
userRouter.post('/session/signedCookie', postSessionCookie, sendStatus)


// --- ----- ----- DEBO ARMAR UN ROUTER DE SESSIONES  --- ----- ----- 
// --- ----- ----- DEBO ARMAR UN ROUTER DE SESSIONES  --- ----- ----- 
// --- ----- ----- DEBO ARMAR UN ROUTER DE SESSIONES  --- ----- ----- 

