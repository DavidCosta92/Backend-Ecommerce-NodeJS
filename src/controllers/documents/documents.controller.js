// @ts-nocheck
import { userService } from "../../services/userService.js"

export async function uploadPhoto(req,res,next){    
    try {
        const uid = req.baseUrl.split("/API/users/")[1].split("/documents")[0]
        const fileName = req.file.filename
        const path =  req.file.path
        const resp = await userService.uploadDocument( uid , fileName , path )
        res.status(resp.status).json(resp);
    } catch (error) {
        next(error)
    }
}