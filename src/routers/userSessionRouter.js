// @ts-nocheck
import { Router } from "express";
import express from "express"
import { postUser, sendEmailResetPassword , createNewPassword, getUsersMemberships , changeMembership} from "../controllers/users/user.controller.js";
import { authenticatorWeb, onlyAuthenticatedWeb , onlyAuthenticatedApi , onlyAdminWeb } from "../middlewares/authenticator.js";
import session from "../middlewares/session.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import { sessionsRouter } from "./sessionsRouter.js";
import { documentsRouter } from "./documentsRouter.js";

export const userRouter = Router();

userRouter.use(session)
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true })) // para obtener datos desde los formularios
userRouter.use("/session",sessionsRouter)
userRouter.post("/", postUser)
userRouter.use("/:uid/documents/", documentsRouter)
/* Crear un endpoint POST  en el router de usuarios api/users/:uid/documents que permita subir uno o múltiples archivos. Utilizar el middleware de Multer  =>  El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban (si es imagen de perfil, deberá guardarlo en una carpeta profiles///  imagen de un producto en products ///  documento en una carpeta documents. */
//userRouter.post('/:uid/documents', onlyAuthenticatedApi /*, uploadFiles*/)



// REVISAR SI LO DEBERIA USAR PARA ALGO.. EN TEORIA DEBERIA SER REEMPLAZADO POR localhost:8080/api/products
// userRouter.get("/products", authenticatorWeb, productsView, (req, res, next)=>{})

//--- reset password ---
userRouter.post('/restore-password', sendEmailResetPassword)
userRouter.post('/new-password/', createNewPassword)

// --- premium ---
userRouter.get('/premium/',authenticatorWeb, onlyAuthenticatedWeb, onlyAdminWeb, getUsersMemberships)
userRouter.put('/premium/:uid', onlyAuthenticatedApi, onlyAdminWeb, changeMembership)

userRouter.use(passportInitialize, passportSession)