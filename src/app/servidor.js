// @ts-nocheck
import express from "express"
import { engine } from 'express-handlebars'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { logger } from "../middlewares/loggerMiddleware.js";
import { winstonLogger } from "../utils/logger.js";
import { NODE_ENV_TEST, MONGOOSE_STRING_ATLAS,MONGOOSE_STRING_ATLAS_TEST, NODE_ENV, PORT } from "../config/config.js";
import { passportInitialize , passportSession } from "../middlewares/passport.js";
import session from "../middlewares/session.js";
import { errorHandlerAPI , errorHandlerWEB} from "../middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { onlyAuthenticatedWeb, renderHome } from "../middlewares/authenticator.js";
import { apiRouter } from "../routers/apiRouter.js";
import { webRouter } from "../../Front-Handlebars/src/router/webRouter.js";


dotenv.config({path: 'src/.env'});
if(NODE_ENV_TEST=="true"){
    mongoose.connect(MONGOOSE_STRING_ATLAS_TEST)
}else{    
    mongoose.connect(MONGOOSE_STRING_ATLAS)
}

const app = express();
app.use(session)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(logger)

app.use(express.static('./public'))
app.use("/users", onlyAuthenticatedWeb ,express.static('./public/assets/users'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(passportInitialize, passportSession)

app.get("/", renderHome)
app.use("/api", apiRouter)
app.use("/web", webRouter)

app.use(errorHandlerWEB) 
app.use(errorHandlerAPI) 

const httpServer = app.listen(PORT, () => winstonLogger.info(`Servidor activo, entorno --->>> ${NODE_ENV} - Testing : ${NODE_ENV_TEST} <<<--- en port ${PORT}`))

