// @ts-nocheck
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
        const email = validateEmail("Email",to)
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : email ,
            subject : subject ,
            html : html ,      
            attachments:[]
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            winstonLogger.warning("Envio de email a => ",sentEmail.accepted)
            return sentEmail
        } catch (error) {
            winstonLogger.warning("Error en envio mail => ", error)
            throw error
        }

    }
    async sendTicketEmail (response){  
        const title = `<h4> Hola, gusto en saludarte! Te dejamos tu resumen de compra abajo: </h4>`   
        let rejected = "<h5>Todos los productos fueron confirmados para la compra</h5>"
         if(response.rejectedProds.length>0){
            let rejectedProducst = ""
            response.rejectedProds.forEach(pr => {
                const prod = `<li>${pr.product.title}, cantidad: ${pr.quantity}</li>`   
                rejectedProducst += prod     
            });
            rejected = 
            `<h5>Listado de productos rechazados (No te preocupes, quedaran guardados en el carrito para la proxima compra)</h5>
            <ul>              
                ${rejectedProducst}
            </ul>`
         }

         let accepted = ""
         if(response.acceptedProds){
            let acceptedProducst = ""
            response.acceptedProds.forEach(pr => {
                const prod = `<li>${pr.product.title}, cantidad: ${pr.quantity}</li>`   
                acceptedProducst += prod    
            });
            accepted = 
            `<div> 
                <h5>Listado de productos Aceptados</h5>   
                <ul>              
                    ${acceptedProducst}
                </ul>
            </div>
            
            <div> 
            <h4>Detalles</h4>  
                <p>Precio productos comprados: ${response.amount}</p>
                <p>Comprador: ${response.purcharser} </p>
                <p>Codigo de Ticket: ${response.code}</p>
                <p>Fecha compra: ${response.purchase_datetime}</p>
            </div>
            
            <h4>¡Que tengas un excelente dia, saludos!</h4>  
            `
         }


        const templateEmail = title.concat(rejected.concat(accepted))  
        
        const email = validateEmail("Email",response.purcharser)
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : email ,
            subject : "Resumen de compra" ,
            html : templateEmail ,      
            attachments:[]
        }
        try {
            const sentEmail = await this.#nodeMailer.sendMail(options)
            winstonLogger.warning("Envio de email a => ",sentEmail.accepted)
            return sentEmail
        } catch (error) {
            winstonLogger.warning("Error en envio mail => ", error)
            throw error
        }

    }
}
export const emailService = new EmailService(EMAIL_CONFIG)