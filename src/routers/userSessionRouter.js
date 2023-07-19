// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerView, postUser, renderLoginView, /*productsView ,*/ renderPasswordReset , sendEmailResetPassword , renderFormNewPassword , createNewPassword, getUsersMemberships , changeMembership} from "../controllers/users/user.controller.js";
import { authenticatorWeb, onlyAuthenticatedWeb , onlyAuthenticatedApi , onlyAdminWeb } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import { sessionsRouter } from "./sessionsRouter.js";

export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))
userRouter.use("/session",sessionsRouter)
userRouter.post("/", postUser)

// REVISAR SI LO DEBERIA USAR PARA ALGO.. EN TEORIA DEBERIA SER REEMPLAZADO POR localhost:8080/api/products
// userRouter.get("/products", authenticatorWeb, productsView, (req, res, next)=>{})

//////   userRouter.get('/restore-password', renderPasswordReset) // los render los deberia borrar una vez termine la migracion...
//////   userRouter.get('/new-password/', renderFormNewPassword) // los render los deberia borrar una vez termine la migracion...
//////   userRouter.get("/register", registerView) // los render los deberia borrar una vez termine la migracion...
//////   userRouter.get("/login", renderLoginView) // los render los deberia borrar una vez termine la migracion...

//--- reset password ---
userRouter.post('/restore-password', sendEmailResetPassword)
userRouter.post('/new-password/', createNewPassword)

// --- premium ---
userRouter.get('/premium/',authenticatorWeb, onlyAuthenticatedWeb, onlyAdminWeb, getUsersMemberships)
userRouter.put('/premium/:uid', onlyAuthenticatedApi, onlyAdminWeb, changeMembership)

userRouter.use(passportInitialize, passportSession)