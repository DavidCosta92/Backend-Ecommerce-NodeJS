import { userSessionService } from "../../services/sessionService.js"
import { userService } from "../../services/userService.js"

export async function postSessionTokenCookie(req, res, next) {  
    try {
        const token = await userSessionService.getSessionToken(req.body.email , req.body.password)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })    
        next()
    } catch (error) {
        next(error)
    }
}
export async function postSessionTokenForGithub(req, res, next) {  
    try {
        const githubUsername = req.usernameGithub
        const tokenGithub = await userSessionService.getSessionTokenForGithub(githubUsername)    
        res.cookie('authToken', tokenGithub, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })    
        next()
    } catch (error) {
        next(error)
    }
}
export async function deleteSession (req, res, next){    
     /*if(req.signedCookies?.authToken!==undefined)  */res.clearCookie('authToken') 
     res.sendStatus(200)
}
export async function sendStatus (req, res, next){
    res.status(201).json(req.session.user)
}
export async function getCurrentUser (req, res, next){    
    try {      
       let user = await userService.getLoguedUser(req , next)
       res.status(200).json(user)
    } catch (error) {
       res.status(400).json({ errorMessage : error.description})
       //next(error)
    }  
}
