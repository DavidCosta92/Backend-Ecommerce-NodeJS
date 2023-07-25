// @ts-nocheck
import { userService } from "../../services/userService.js"

export async function uploadPhoto(req,res,next){    
    try {
        const resp = await userService.uploadDocument(req ,res, next)
        res.status(resp.status).json(resp);
    } catch (error) {
        next(error)
    }
}