// @ts-nocheck
import { IllegalInputArg , TicketError , IllegalInputArgWEB} from "../models/errors/validations.errors.js"
import { AuthenticationError , AuthenticationExpiredError , AuthenticationErrorWEB, AuthenticationExpiredErrorWEB} from "../models/errors/authentication.error.js"
import { AuthorizationError } from "../models/errors/authorization.error.js"
import { RegisterError , RegisterErrorAlreadyExistUser , NotFoundUserWeb} from "../models/errors/register.error.js"


export function errorHandlerWEB(error, req, res , next){
    if (error instanceof AuthenticationExpiredErrorWEB) { 
        console.log("a")
        req.logger.warning(`*** ${error.type} -->> ${error.description}`)
        res.render("restore-password", {pageTitle: "Error de token", error : true})
    }    
    else if (error instanceof AuthenticationErrorWEB) {
        console.log("b")
        req.logger.info(`*** ${error.type} -->> ${error.description}`)
        res.render("userLogin", {pageTitle: "Error de autenticacion", error : true})
    }     
    else if (error instanceof IllegalInputArgWEB) {
        console.log("c")
        req.logger.info(`*** ${error.type} -->> ${error.description}`)
        res.render("create-new-password", {pageTitle: "Error de password", error : true})
    }     
    else if (error instanceof NotFoundUserWeb) {
        console.log("d")
        req.logger.info(`*** ${error.type} -->> ${error.description}`)
        res.status(404).json({errorMessage: error.description })

        //res.render("create-new-password", {pageTitle: "Error de password", error : true})
    }
    else{
        next(error)
    }
    
}

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
        
        console.log("EL ERROR ENTRON EN => AuthenticationError")
        
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
