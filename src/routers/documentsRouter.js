// @ts-nocheck
import { Router } from "express";
import express from "express"
import session from "../middlewares/session.js";
import { uploadPhoto } from "../controllers/documents/documents.controller.js";
import multer from 'multer'


export const documentsRouter = Router();

documentsRouter.use(session)
documentsRouter.use(express.json())
documentsRouter.use(express.urlencoded({ extended: true }))

// multer multer multer multer multer
// multer multer multer multer multer
const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/images/profiles')
    },
    filename: function (req, file, cb) {        
        cb(null, `profile-${Date.now()}-${file.originalname}`)
    }
})
const uploadProfile = multer({ storage : storageProfile })

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/images/products')
    },
    filename: function (req, file, cb) {        
        cb(null, `product-${Date.now()}-${file.originalname}`)
    }
})
const uploadProduct = multer({ storage : storageProduct })

const storageDocument = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/documents')
    },
    filename: function (req, file, cb) {        
        cb(null, `doc-${Date.now()}-${file.originalname}`)
    }
})
const uploadDocument = multer({ storage : storageDocument })

documentsRouter.post('/product', uploadProduct.single('productPhoto'), uploadPhoto)
documentsRouter.post('/document', uploadDocument.single('documentPhoto'), uploadPhoto)
documentsRouter.post('/profile', uploadProfile.single('profilePhoto'), uploadPhoto)

// uploadProfile.single('nombreDelCampoDeDondeQuieroExtraerElArchivo') 
// uploadProfile.array('nombreDelCampoDeDondeQuieroExtraerLosArchivos') 
//uploadProfile.any() => EXTRAE TODO, POR CUESTIONES DE SEGUIRDAD, NO SERIA RECOMENDABLE...
documentsRouter.get('/profile', (req, res, next) => {
    res.json(`HOLLAAAA ${uid}`)
})

// A ESTAS RUTAS FALTA PROTEGERLAS CON MIDD DE AUTHENTICADS 
// A ESTAS RUTAS FALTA PROTEGERLAS CON MIDD DE AUTHENTICADS
// A ESTAS RUTAS FALTA PROTEGERLAS CON MIDD DE AUTHENTICADS
// A ESTAS RUTAS FALTA PROTEGERLAS CON MIDD DE AUTHENTICADS



// documentsRouter.get('/githubAuth' /*, callbackAuthGithub,postSessionTokenForGithub, updateLastConnection */,(req, res, next) => {
//      res.redirect('/web/products') 
// })


