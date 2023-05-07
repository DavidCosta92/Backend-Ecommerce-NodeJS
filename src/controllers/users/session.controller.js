import { userManager } from "../../managers/UserManager.js"
import { comparePasswords } from "../../utils/encrypter.js"
import { AuthenticationError } from "../../entities/error/authenticationError.js"


export async function postSession(req, res, next) {  
    try {
        const userBD = await userManager.searchByEmail(req.body.email)
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")
     
         const correctPassword = comparePasswords(req.body.password , userBD.password)
         if (!correctPassword)  throw new AuthenticationError("Error de logueo, revisa las credenciales")
     
         req.session.user = {
             first_name: userBD.first_name,
             last_name: userBD.last_name,
             email: userBD.email,
             age: userBD.age,
             rol : userBD.rol
         }  
         res.status(201).json(req.session.user)
        
    } catch (error) {
        next(error)
    }
  }
  

export async function deleteSession (req, res, next){
    req.session.destroy(err => {
        res.sendStatus(200)
      })

}
export async function localRegister (req, res, next){
    req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        rol : req.body.rol
    }
    res.redirect('/api/users/products') 
}
export async function sendStatus (req, res, next){
    res.status(201).json(req.session.user)
}