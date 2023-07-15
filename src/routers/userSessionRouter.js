// @ts-nocheck
import { Router } from "express";
import express from "express"
import { registerView, postUser, renderLoginView, productsView , renderPasswordReset , sendEmailResetPassword , renderFormNewPassword , createNewPassword, renderUsersMemberships , changeMembership} from "../controllers/users/user.controller.js";
import { authenticator, onlyAuthenticatedWeb , onlyAuthenticatedApi , onlyAdminWeb } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import { sessionsRouter } from "./sessionsRouter.js";

export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))
userRouter.use("/session",sessionsRouter)

userRouter.get("/register", registerView)
userRouter.get("/login", renderLoginView)
userRouter.post("/", postUser)

userRouter.get("/products", authenticator, productsView, (req, res, next)=>{})

//--- reset password ---
userRouter.get('/restore-password', renderPasswordReset)
userRouter.post('/restore-password', sendEmailResetPassword)
userRouter.get('/new-password/', renderFormNewPassword)
userRouter.post('/new-password/', createNewPassword)

// --- premium ---
userRouter.get('/premium/',authenticator, onlyAuthenticatedApi /* onlyAuthenticatedWeb */ , onlyAdminWeb, renderUsersMemberships)
userRouter.put('/premium/:uid', authenticator, onlyAuthenticatedApi /* onlyAuthenticatedWeb */ , onlyAdminWeb, changeMembership)

userRouter.use(passportInitialize, passportSession)