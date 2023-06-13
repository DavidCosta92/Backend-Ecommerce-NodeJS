import { IllegalInputArg , TicketError} from "../models/errors/validations.errors.js"

import { AuthenticationError , AuthenticationExpiredError} from "../models/errors/authentication.error.js"

import { AuthorizationError } from "../models/errors/authorization.error.js"

import { RegisterError , RegisterErrorAlreadyExistUser} from "../models/errors/register.error.js"

export function errorHandlerAPI(error, req, res , next){    
    if (error instanceof IllegalInputArg) res.status(400)
    else if (error instanceof TicketError) res.status(400)   
    else if (error instanceof AuthenticationError) res.status(400) 
    else if (error instanceof AuthenticationExpiredError) res.status(401)
    else if (error instanceof AuthorizationError) res.status(403)
    else if (error instanceof RegisterError) res.status(400)   
    else if (error instanceof RegisterErrorAlreadyExistUser) res.status(409) 

    else res.status(500) 

    console.log(error)

    res.json({ type: error.type , errorMessage: error.description })
}
