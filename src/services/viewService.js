// @ts-nocheck

import { productService } from "./productService.js"
import { userService } from "./userService.js"

class ViewService {
    async getProducts(req, res, next){
        let dataRender = {}

        const user = await userService.getLoguedUser(req)
        const paginatedProducts = await productService.getProducts(user, req, res, next)

        dataRender["loguedUser"] = true
        dataRender["paginatedProducts"] = paginatedProducts


        if(user !== undefined){
            dataRender["title"] =`${user.first_name} - productos`
            dataRender["user"] =user
         } else {         
            dataRender["title"] =`${req.session['user'].first_name} - productos`
            dataRender["user"] =req.session['user']
         }
        return dataRender
    }
} 
  export const viewService = new ViewService()