// @ts-nocheck
import session from "express-session"
import MongoStore from "connect-mongo"
import { MONGOOSE_STRING_ATLAS ,MONGO_SECRET} from "../config/config.js"

export default session({
    store: MongoStore.create({
        mongoUrl: MONGOOSE_STRING_ATLAS,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30
    }),
    saveUninitialized:false,
    resave:false,
    secret:MONGO_SECRET
 })
