// @ts-nocheck
import { Router } from "express";
import express from "express"
import { postUser, sendEmailResetPassword , createNewPassword, getUsersMemberships , changeMembership, deleteInactiveUsers, deleteUserById} from "../controllers/user.controller.js";
import { onlyAuthenticatedWeb , onlyAuthenticatedApi , onlyAdminWeb, onlyAdminApi } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import { sessionsRouter } from "./sessionsRouter.js";
import { documentsRouter } from "./documentsRouter.js";

export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))

userRouter.use("/session",sessionsRouter)
userRouter.use("/:uid/documents/", documentsRouter)

userRouter.get("/", onlyAuthenticatedWeb, onlyAdminWeb, getUsersMemberships)
userRouter.post("/", postUser)
userRouter.delete("/", onlyAuthenticatedApi, onlyAdminApi, deleteInactiveUsers)
userRouter.delete("/:uid", onlyAuthenticatedApi, onlyAdminApi, deleteUserById)

//--- reset password ---
userRouter.post('/restore-password', sendEmailResetPassword)
userRouter.post('/new-password/', createNewPassword)

// --- premium ---
userRouter.get('/premium/', onlyAuthenticatedApi, onlyAdminApi, getUsersMemberships)
userRouter.put('/premium/:uid', onlyAuthenticatedApi, onlyAdminApi, changeMembership)

userRouter.use(passportInitialize, passportSession)