// @ts-nocheck
import { Router } from "express";
import express from "express"

import { authGithub , callbackAuthGithub } from "../middlewares/passport.js";
import { postSessionTokenCookie,  deleteSession , sendStatus } from "../controllers/users/session.controller.js";
import session from "../middlewares/session.js";
import { postSessionTokenForGithub } from "../controllers/users/session.controller.js";

export const sessionsRouter = Router();

sessionsRouter.use(session)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({ extended: true }))

// actualmente los formularios estan seteados para trabajar con signed cookies
sessionsRouter.post('/signedCookie', postSessionTokenCookie, sendStatus)
sessionsRouter.delete('/', deleteSession) 

//--- passport login con github ---
sessionsRouter.get('/github', authGithub)
// sessionsRouter.get('/githubAuth', callbackAuthGithub,postSessionTokenForGithub , sendStatus) 
sessionsRouter.get('/githubAuth', callbackAuthGithub,postSessionTokenForGithub ,(req, res, next) => { res.redirect('/web/products') })


