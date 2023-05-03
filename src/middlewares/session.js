// @ts-nocheck
import session from "express-session"
import MongoStore from "connect-mongo"
import { mongooseConnectStringToAtlas } from "../config/servidor.config.js"

export default session({
    store: MongoStore.create({
        mongoUrl: mongooseConnectStringToAtlas,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30
    }),
    saveUninitialized:false,
    resave:false,
    secret:"soy el secreto"
 })
