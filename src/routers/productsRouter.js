// @ts-nocheck
import express, { Router } from 'express';
import { getProductsFileSystem , postProductsFileSystem , getProductsByIDFileSystem ,updateProductsByIDFileSystem , deleteProductsByIDFileSystem} from '../controllers/products/fileSystem.products.controller.js';
import { getProductsMongoose , postProductsMongoose , getProductsByIDMongoose , deleteProductsByIDMongoose , updateProductsByIDMongoose} from '../controllers/products/mongoose.products.controller.js';
import { onlyAuthenticated } from '../middlewares/authenticator.js';
import { encrypter } from '../utils/encrypter.js';
export const productsRouter = Router();

productsRouter.use(express.json()); 

// >>>>>>>> FILE SISTEM <<<<<<<<<<
productsRouter.get("/fs/" , getProductsFileSystem);

productsRouter.post('/fs/',onlyAuthenticated, postProductsFileSystem);

productsRouter.get('/fs/:pid', getProductsByIDFileSystem);

productsRouter.put('/fs/:pid',onlyAuthenticated, updateProductsByIDFileSystem);

productsRouter.delete("/fs/:pid" ,onlyAuthenticated, deleteProductsByIDFileSystem);


 // >>>>>>>> MONGOOSE ATLAS DBaaS <<<<<<<<<<

productsRouter.get("/" ,  getProductsMongoose)

productsRouter.get("/add/form" ,onlyAuthenticated, (req, res, next)=>{    
    let user = false
    /* PARA CUANDO INICIO SESSION, PORQUE USO EL ENDPOINT JWT que guarda una signed cookie */
    if(req.signedCookies.authToken !=undefined){
        const token = req.signedCookies.authToken
        const dataUser = encrypter.getDataFromToken(token)
        user = dataUser
    }
    /* PARA localRegister */
    if(req.user !=undefined){ user = req.user }    
    /* PARA CUANDO ME REGISTRO, PORQUE USO PASSPORT... */
    if(req.session?.passport !=undefined){ user = req.session.passport.user }
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
 
productsRouter.post('/', onlyAuthenticated, postProductsMongoose);

productsRouter.get('/:pid', getProductsByIDMongoose);

productsRouter.delete("/:pid" , onlyAuthenticated, deleteProductsByIDMongoose);

productsRouter.put('/:pid', onlyAuthenticated, updateProductsByIDMongoose);