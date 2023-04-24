import { userModel } from "../../../Dao/DBaaS/models/userModel.js"


export async function postSession(req, res, next) {  
    const userBD = await userModel.findOne({ email: req.body.email }).lean()

    if (!userBD) return res.sendStatus(401)  
    if (userBD.password !== req.body.password)  return res.sendStatus(401)
  
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