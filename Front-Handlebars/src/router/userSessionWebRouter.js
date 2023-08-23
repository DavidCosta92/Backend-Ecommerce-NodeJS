// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerWebView, renderWebFormNewPassword, renderWebLoginView, renderWebPasswordReset, renderWebUsersMemberships } from "../controllers/userWebController.js";
import { onlyAdminWeb, onlyAuthenticatedWeb } from "../../../src/middlewares/authenticator.js";
import { passportInitialize, passportSession } from "../../../src/middlewares/passport.js";
import session from "../../../src/middlewares/session.js";
import { userSessionService } from "../../../src/services/sessionService.js";
import { userService } from "../../../src/services/userService.js";
import { AuthenticationExpiredError } from "../../../src/models/errors/authentication.error.js";

export const userWebRouter = Router();

userWebRouter.use(session)
userWebRouter.use(express.json())
userWebRouter.use(express.urlencoded({ extended: true }))

// localhost:8080/web/users
userWebRouter.get("/:uid/documents/", onlyAuthenticatedWeb, async (req, res, next)=>{        

    const user = userSessionService.getLoguedUser(req, res, next)  
    if(user){        
        const { profile , documents, products } = await userService.getUserDocuments(user._id)
        const usersProducts = await userService.getUserProducts(user._id , req, res, next)
        res.render("uploadImages", { user : user , profileFiles : profile, documentsFiles : documents, productsFiles : products , usersProducts : {...usersProducts}} )
    }  
})  
userWebRouter.get("/register", registerWebView)
userWebRouter.get("/login", renderWebLoginView)
userWebRouter.get('/', onlyAuthenticatedWeb, onlyAdminWeb, renderWebUsersMemberships)

//--- reset password --- 
userWebRouter.get('/restore-password', renderWebPasswordReset)
userWebRouter.get('/new-password/', renderWebFormNewPassword)

// --- premium ---
userWebRouter.get('/premium/', onlyAuthenticatedWeb, onlyAdminWeb, renderWebUsersMemberships)

// REVISAR SI LO DEBERIA USAR PARA ALGO.. EN TEORIA DEBERIA SER REEMPLAZADO POR localhost:8080/web/products
// userWebRouter.get("/products", productsView, (req, res, next)=>{})

userWebRouter.use(passportInitialize, passportSession)