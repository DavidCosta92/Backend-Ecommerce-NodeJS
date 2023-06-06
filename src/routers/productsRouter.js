// @ts-nocheck
import express, { Router } from 'express';
import { getProducts , postProducts , getProductsByID , deleteProductsByID , updateProductsByID} from '../controllers/products/products.controller.js';
import { onlyAuthenticated , onlyAdmin, onlyUser} from '../middlewares/authenticator.js';
import { sessionService } from '../services/sessionService.js';

export const productsRouter = Router();
productsRouter.use(express.json()); 

productsRouter.get("/",  getProducts)
productsRouter.get("/add/form" , onlyAuthenticated, onlyAdmin , (req, res, next)=>{    
    const user = sessionService.getLoguedUser(req)
    res.render("formularioProductos", {loguedUser : user!=undefined, user : user})
})
productsRouter.post('/', onlyAuthenticated, onlyAdmin, postProducts);
productsRouter.get('/:pid', onlyAuthenticated, onlyAdmin , getProductsByID);
productsRouter.delete("/:pid" , onlyAuthenticated, onlyAdmin , deleteProductsByID);
productsRouter.put('/:pid', onlyAuthenticated, onlyAdmin , updateProductsByID);





// ESTOS IMPORT LOS DEBO BORRAR Y CAMBIAR TODO SOLO POR product CONTROLERS, pero antes debo migrar la logica al repositorio quien determinara si va a ser fs o mongo, y debo elimianr todas las rutas al pedo de fs ya que dejaran de existir..
import { getProductsFileSystem , postProductsFileSystem , getProductsByIDFileSystem ,updateProductsByIDFileSystem , deleteProductsByIDFileSystem} from '../controllers/products/fileSystem.products.controller.js';


// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
productsRouter.get("/fs/" , getProductsFileSystem);
productsRouter.post('/fs/', postProductsFileSystem);
productsRouter.get('/fs/:pid', getProductsByIDFileSystem);
productsRouter.put('/fs/:pid', updateProductsByIDFileSystem);
productsRouter.delete("/fs/:pid" , deleteProductsByIDFileSystem);
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS
// TODAS ESTAS RUTAS DEBEN BORRARSE Y METERSE AL DAO DE FS, YA QUE EL REPOSITORIO ELIGIRA A QUE DAO SE CONECTARA SI MONGO O FS