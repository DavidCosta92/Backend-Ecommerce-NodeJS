import { createTransport } from "nodemailer"
import { winstonLogger } from "./logger.js"
import { EMAIL_CONFIG } from "../config/config.js"
import { validateEmail } from "../models/validations/validations.js"


class EmailService {
    #nodeMailer

    constructor(config){
        this.#nodeMailer = createTransport(config)
    }
    async sendTextEmail (to , msj , subject = "TP Final Coderhouse Nodejs"){
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : to ,
            subject : subject ,
            text : msj             
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            winstonLogger.info("Envio de email a =>", sentEmail.accepted)
            return sentEmail
        } catch (error) {
            winstonLogger.warning("Error en envio email ", error)
            throw error
        }

    }
    async sendHtmlEmail (to , html , subject = "TP Final Coderhouse Nodejs"){        
        const email = validateEmail(to)
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : email ,
            subject : subject ,
            html : html ,      
            attachments:[] // para enviar los archivos que necesite, ver info en carpeta "pendientes coder"
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            winstonLogger.warning("SUPUESTAMENTE ENVIE MAIL => ",sentEmail.accepted)
            return sentEmail
        } catch (error) {
            winstonLogger.warning("Error en envio mail => ", error)
            throw error
        }

    }
}
export const emailService = new EmailService(EMAIL_CONFIG)