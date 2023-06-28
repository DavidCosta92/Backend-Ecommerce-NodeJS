import { AuthenticationError } from "../../models/errors/authentication.error.js"
import { sessionService } from "../../services/sessionService.js"
import { emailService } from "../../utils/email.service.js"


export async function postSession(req, res, next) {  
    try {
         const userBD = await sessionService.checkUserAndPassword(req.body.email , req.body.password)

         req.session.user = {
             first_name: userBD.first_name,
             last_name: userBD.last_name,
             email: userBD.email,
             age: userBD.age,
             cart : userBD.cart,
             role : userBD.role
         }
         req.logger.http(`Inicio de session de ${userBD}`)
         res.status(201).json(req.session.user)
        
    } catch (error) {
        next(error)
    }
  }
  
export async function postSessionTokenCookie(req, res, next) {  
    try {
        const token = await sessionService.getSessionToken(req.body.email , req.body.password)
         res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })         
         req.logger.http(`Inicio de session por token`)

         emailService.sendTextEmail("davidcst2991@gmail.com", "hola este es uin segundo maaaaillll diciendo que alguien se logueo en el tp")         
         emailService.sendHtmlEmail("davidcst2991@gmail.com", "<a href='http://localhost:8080/api/users/products'> <h1> hola este es uin segundo maaaaillll diciendo que alguien se logueo en el tp </h1> </a>")
         
         req.logger.warning(`Inicio de session por token`)

         res.status(201).json(req.session.user)
         next()
    } catch (error) {
        next(new AuthenticationError("Error de logueo, revisa las credenciales"))
    }
}

export async function deleteSession (req, res, next){    
    /* CUANDO ESTANDO REGISTRADO, INICIO SESION SOLAMENTE*/
    if(req.signedCookies?.authToken!==undefined) {   
        req.logger.http(`Session cerrada por signedCookies`)
        res.clearCookie('authToken')    
    }
     else if(req.session?.user !==undefined) {   
        req.logger.http(`Session cerrada`)
        req.session.destroy()        
    }
    /* CUANDO ME REGISTRO, Y QUEDO LOGUEADO -- REGISTRO Y LOGOUT DE GITHUB*/
    else if(req.session?.passport!==undefined) {   
        req.logger.http(`Session cerrada por GITHUB`)
        req.session.destroy()    
    }   
    res.sendStatus(200)
}
export async function localRegister (req, res, next){
    req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        cart : req.body.cart,
        role : req.body.role
    }
    res.redirect('/api/users/products') 
}
export async function sendStatus (req, res, next){
    res.status(201).json(req.session.user)
}