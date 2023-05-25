// @ts-nocheck
import express, { Router } from 'express';
import { getProductsFileSystem , postProductsFileSystem , getProductsByIDFileSystem ,updateProductsByIDFileSystem , deleteProductsByIDFileSystem} from '../controllers/products/fileSystem.products.controller.js';
import { getProductsMongoose , postProductsMongoose , getProductsByIDMongoose , deleteProductsByIDMongoose , updateProductsByIDMongoose} from '../controllers/products/mongoose.products.controller.js';
import { onlyAuthenticated } from '../middlewares/authenticator.js';
import { encrypter } from '../utils/encrypter.js';
import { sessionService } from '../services/sessionService.js';
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
    const user = sessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
 
productsRouter.post('/', onlyAuthenticated, postProductsMongoose);

productsRouter.get('/:pid', getProductsByIDMongoose);

productsRouter.delete("/:pid" , onlyAuthenticated, deleteProductsByIDMongoose);

productsRouter.put('/:pid', onlyAuthenticated, updateProductsByIDMongoose);