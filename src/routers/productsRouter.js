import express, { Router } from 'express';
import { getProductsFileSystem , postProductsFileSystem , getProductsByIDFileSystem ,updateProductsByIDFileSystem , deleteProductsByIDFileSystem} from '../controllers/products/fileSystem.products.controller.js';
import { getProductsMongoose , postProductsMongoose , getProductsByIDMongoose , deleteProductsByIDMongoose , updateProductsByIDMongoose} from '../controllers/products/mongoose.products.controller.js';
export const productsRouter = Router();

productsRouter.use(express.json()); 

// >>>>>>>> FILE SISTEM <<<<<<<<<<
productsRouter.get("/fs/" , getProductsFileSystem);

productsRouter.post('/fs/', postProductsFileSystem);

productsRouter.get('/fs/:pid', getProductsByIDFileSystem);

productsRouter.put('/fs/:pid', updateProductsByIDFileSystem);

productsRouter.delete("/fs/:pid" , deleteProductsByIDFileSystem);


 // >>>>>>>> MONGOOSE ATLAS DBaaS <<<<<<<<<<

productsRouter.get("/" , getProductsMongoose)
 
productsRouter.post('/',postProductsMongoose);

productsRouter.get('/:pid', getProductsByIDMongoose);

productsRouter.delete("/:pid" , deleteProductsByIDMongoose);

productsRouter.put('/:pid', updateProductsByIDMongoose);