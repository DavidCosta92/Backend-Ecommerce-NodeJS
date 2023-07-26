// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerWebView, renderWebFormNewPassword, renderWebLoginView, renderWebPasswordReset, renderWebUsersMemberships } from "../controllers/userWebController.js";
import { authenticatorWeb, onlyAdminWeb, onlyAuthenticatedWeb } from "../../../src/middlewares/authenticator.js";
import { passportInitialize, passportSession } from "../../../src/middlewares/passport.js";
import session from "../../../src/middlewares/session.js";
import { userSessionService } from "../../../src/services/sessionService.js";

export const userWebRouter = Router();

userWebRouter.use(session)
userWebRouter.use(express.json())
userWebRouter.use(express.urlencoded({ extended: true }))

// localhost:8080/web/users
userWebRouter.get("/:uid/documents/", authenticatorWeb, onlyAuthenticatedWeb, (req, res, next)=>{    
    const user = userSessionService.getLoguedUser(req)   
    console.log(user)
    res.render("uploadImages", { user : user})
})
userWebRouter.get("/register", registerWebView)
userWebRouter.get("/login", renderWebLoginView)

//--- reset password --- 
userWebRouter.get('/restore-password', renderWebPasswordReset)
userWebRouter.get('/new-password/', renderWebFormNewPassword)

// --- premium ---
userWebRouter.get('/premium/',authenticatorWeb, onlyAuthenticatedWeb, onlyAdminWeb, renderWebUsersMemberships)

// REVISAR SI LO DEBERIA USAR PARA ALGO.. EN TEORIA DEBERIA SER REEMPLAZADO POR localhost:8080/web/products
// userWebRouter.get("/products", authenticatorWeb, productsView, (req, res, next)=>{})

userWebRouter.use(passportInitialize, passportSession)