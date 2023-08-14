// @ts-nocheck
import winston from 'winston'
import { NODE_ENV } from '../config/config.js'

// custom levels
const levels = {
    debug : 5, 
    http : 4, 
    info : 3, 
    warning : 2,
    error : 1, 
    fatal : 0
}
const colors = {
    debug : 'white', 
    http : 'green', 
    info : 'green', 
    warning : 'blue',
    error : 'yellow', 
    fatal : 'red'
}
//development
const loggerDev = winston.createLogger({
    levels,
    transports:[
        new winston.transports.Console({
            level : "debug"
        }),
        //Tambien deberia guardar data en archivo?
        new winston.transports.File({
            level: "warning",
            filename: "dev_errors.log"
        })
    ],
    format: winston.format.combine(
        winston.format.colorize( {
            colors:colors,
            all : true
        }),
        winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            winston.format.simple()
        ),
    )
})

//production
const loggerProd = winston.createLogger({
    levels,
    transports:[
        new winston.transports.Console({
            level : "info"
        }),
        new winston.transports.File({
            level: "error",
            filename: "errors.log"
        })

    ],
    format: winston.format.combine(
        winston.format.colorize( {
            colors:colors,
            all : true
        }),
        winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            winston.format.simple()
        ),
    )
})

export let winstonLogger = loggerDev
if( NODE_ENV === "production") winstonLogger = loggerProd