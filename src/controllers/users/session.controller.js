import { userManager } from "../../managers/UserManager.js"
import { comparePasswords } from "../../utils/encrypter.js"
import { AuthenticationError } from "../../entities/error/authenticationError.js"


export async function postSession(req, res, next) {  
    try {
        const userBD = await userManager.searchByEmail(req.body.email)

        // if (!userBD) return res.sendStatus(401)  
        if (!userBD) throw new AuthenticationError("Error de logueo, revisa las credenciales")
     
         const correctPassword = comparePasswords(req.body.password , userBD.password)
         // if (!correctPassword)  return res.sendStatus(401)  
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
    console.log("REGISTRO EXITOSO...")
    req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        rol : req.body.rol
    }
    /*

    REVISAR CLASE DEL 24-4, A LAS 02:00HS DICE QUE AL PRINCIPIO DE LA CLASE SE HABLA DEL EJEMPLO DE LOCAL registerView, DICE ALGO COMO Req.LOGIN?
    SOLUCIONAR ESTA PARTE.. ME ESTA DANDO ERROR EL REDIRECIONAMIENTO... TAMPOCO PUEDO ARMAR UNA ALERTA!
*/
    console.log("localRegister EXITOSO...")
    alert("localRegister EXITOSO...")

    res.redirect('/api/users/products') 
}