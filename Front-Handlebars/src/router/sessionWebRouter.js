// @ts-nocheck
/*
import { Router } from "express";
import express from "express"
import { authGithub, callbackAuthGithub } from "../../../src/middlewares/passport.js";
import { deleteSession, postSessionTokenCookie, postSessionTokenForGithub, sendStatus } from "../../../src/controllers/users/session.controller.js";
import session from "../../../src/middlewares/session.js";

export const sessionsWebRouter = Router();

sessionsWebRouter.use(session)
sessionsWebRouter.use(express.json())
sessionsWebRouter.use(express.urlencoded({ extended: true }))

// actualmente los formularios estan seteados para trabajar con signed cookies

 ENDPOINTS DE API

sessionsWebRouter.post('/signedCookie', postSessionTokenCookie, sendStatus) // =Api, Redireccion manejada desde front
sessionsWebRouter.delete('/', deleteSession)// =Api, Redireccion manejada desde front



//--- passport login con github ---
sessionsWebRouter.get('/github', authGithub)// =Api
sessionsWebRouter.get('/githubAuth', callbackAuthGithub,postSessionTokenForGithub , sendStatus) // =Api, Redireccion manejada desde front => antes hacia la direccion desde back.. revisar el fecth de front a ver si espera status o que onda => sessionsWebRouter.get('/githubAuth', callbackAuthGithub,postSessionTokenForGithub ,(req, res, next) => { res.redirect('/web/users/products') }) 


*/
