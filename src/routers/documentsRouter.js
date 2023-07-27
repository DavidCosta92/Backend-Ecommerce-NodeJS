// @ts-nocheck
import { Router } from "express";
import express from "express"
import session from "../middlewares/session.js";
import { uploadPhoto , deleteFile} from "../controllers/documents/documents.controller.js";
import multer from 'multer'
import { onlyAuthenticatedApi } from "../middlewares/authenticator.js";

export const documentsRouter = Router();

documentsRouter.use(session)
documentsRouter.use(express.json())
documentsRouter.use(express.urlencoded({ extended: true }))

const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/images/profiles')
    },
    filename: function (req, file, cb) {        
        cb(null, `profile-${Date.now()}-${file.originalname.split(" ").join("-")}`)
    }
})
const uploadProfile = multer({ storage : storageProfile })

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/images/products')
    },
    filename: function (req, file, cb) {        
        cb(null, `product-${Date.now()}-${file.originalname.split(" ").join("-")}`)
    }
})
const uploadProduct = multer({ storage : storageProduct })

const storageDocument = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/documents')
    },
    filename: function (req, file, cb) {        
        cb(null, `doc-${Date.now()}-${file.originalname.split(" ").join("-")}`)
    }
})
const uploadDocument = multer({ storage : storageDocument })

documentsRouter.post('/product', onlyAuthenticatedApi , uploadProduct.single('productPhoto'), uploadPhoto)
documentsRouter.post('/document', onlyAuthenticatedApi , uploadDocument.single('documentPhoto'), uploadPhoto)
documentsRouter.post('/profile', onlyAuthenticatedApi , uploadProfile.single('profilePhoto'), uploadPhoto)

documentsRouter.delete('/', onlyAuthenticatedApi , deleteFile)

/*
NECESITO HACER UN POST A uid/dcouments => y que se haga automaticamente la separacion en carpetas segun que field de formulario estoy enviando.. osea si es profile que guarde en la carpeta correcta.. 
const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/users/images/profiles')
    },
    filename: function (req, file, cb) {        
        cb(null, `profile-${Date.now()}-${file.originalname.split(" ").join("-")}`)
    }
})
const uploadProfile = multer({ storage : storageProfile })


documentsRouter.post('/', onlyAuthenticatedApi , uploadFile.single('profilePhoto'), uploadPhoto)

*/