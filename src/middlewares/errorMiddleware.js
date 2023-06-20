// @ts-nocheck
import { IllegalInputArg , TicketError} from "../models/errors/validations.errors.js"
import { AuthenticationError , AuthenticationExpiredError} from "../models/errors/authentication.error.js"
import { AuthorizationError } from "../models/errors/authorization.error.js"
import { RegisterError , RegisterErrorAlreadyExistUser} from "../models/errors/register.error.js"

export function errorHandlerAPI(error, req, res , next){    
    

    if (error instanceof IllegalInputArg) {
        req.logger.debug(`*** ${error.type} -->> ${error.description}`)
        res.status(400).json({errorMessage: error.description })
    }
    else if (error instanceof TicketError) {
        req.logger.error(`*** ${error.type} -->> ${error.description}`)
        res.status(400).json({errorMessage: error.description })   
    }
    else if (error instanceof AuthenticationError) {
        req.logger.info(`*** ${error.type} -->> ${error.description}`)
        res.status(400).json({errorMessage: error.description }) 
    }
    else if (error instanceof AuthenticationExpiredError) {
        req.logger.http(`*** ${error.type} -->> ${error.description}`)
        res.status(401).json({errorMessage: error.description })
    }
    else if (error instanceof AuthorizationError) {
        req.logger.info(`*** ${error.type} -->> ${error.description}`)
        res.status(403).json({errorMessage: error.description })
    }
    else if (error instanceof RegisterError) {
        req.logger.error(`*** ${error.type} -->> ${error.description}`)
        res.status(400).json({errorMessage: error.description })   
    }
    else if (error instanceof RegisterErrorAlreadyExistUser) {
        req.logger.warning(`*** ${error.type} -->> ${error.description}`)
        res.status(409).json({errorMessage: error.description }) 
    }
    // pendiente manejo de errores de integridad de mongo
    else {
        req.logger.fatal(`*** ${error.type} -->> ${error.description}`)
        res.status(500).json(error) 
    }
}
