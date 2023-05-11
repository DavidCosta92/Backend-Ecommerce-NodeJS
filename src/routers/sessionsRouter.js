// @ts-nocheck
import { Router } from "express";
import express from "express"

import { authLocal , authLocalRegister , authGithub , callbackAuthGithub } from "../middlewares/passport.js";
import { postSession , postSessionTokenCookie , localRegister ,  deleteSession , sendStatus } from "../controllers/users/session.controller.js";
import session from "../middlewares/session.js";


export const sessionsRouter = Router();

sessionsRouter.use(session)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({ extended: true }))

sessionsRouter.post("/", postSession)
sessionsRouter.delete("/", deleteSession)
//--- passport con local ---
// actualmente los formularios estan seteados para trabajar con passport.. cambiar ruta del form post
sessionsRouter.post('/localLogin', authLocal, postSession)
sessionsRouter.post('/localRegister', authLocalRegister , sendStatus)

//--- login con github ---
sessionsRouter.get('/github', authGithub)
sessionsRouter.get('/githubAuth', callbackAuthGithub,(req, res, next) => { res.redirect('/api/users/products') })
sessionsRouter.post('/signedCookie', postSessionTokenCookie, sendStatus)
