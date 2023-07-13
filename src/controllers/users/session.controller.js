import { userSessionService } from "../../services/sessionService.js"

export async function postSessionTokenCookie(req, res, next) {  
    try {
        req.logger.warning(`Session INICIADA por signedCookies`)
        const token = await userSessionService.getSessionToken(req.body.email , req.body.password)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })    
        next()
    } catch (error) {
        next(error)
    }
}
export async function deleteSession (req, res, next){    
     if(req.signedCookies?.authToken!==undefined) {   
         req.logger.warning(`Session cerrada por signedCookies`)
         res.clearCookie('authToken')    
     }       
     else if(req.session?.passport!==undefined) {   
    /* PARA GITHUB*/
         req.logger.http(`Session cerrada por GITHUB`)
         req.session.destroy()    
     }   
     res.sendStatus(200)
}
export async function sendStatus (req, res, next){
    res.status(201).json(req.session.user)
}