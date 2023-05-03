import { userManager } from "../../managers/UserManager.js"
import { comparePasswords } from "../../utils/encrypter.js"


export async function postSession(req, res, next) {  
    const userBD = await userManager.searchByEmail(req.body.email)

    if (!userBD) return res.sendStatus(401)  
    const correctPassword = comparePasswords(req.body.password , userBD.password)
    if (!correctPassword)  return res.sendStatus(401)  

    req.session.user = {
        first_name: userBD.first_name,
        last_name: userBD.last_name,
        email: userBD.email,
        age: userBD.age,
        rol : userBD.rol
    }  
    res.status(201).json(req.session.user)
  }
  

export async function deleteSession (req, res, next){
    req.session.destroy(err => {
        res.sendStatus(200)
      })
}