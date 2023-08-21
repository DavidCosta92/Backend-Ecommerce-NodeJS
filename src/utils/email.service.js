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

        
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>intentando enviar EMAIL >>>>>>>>>>>>>>>>>>>>>>>>")

        let rejected = ""
         if(response.rejectedProds){
            let rejectedProducst = 
            array.forEach(pr => {
                const prod =
                `<tr>                
                    <td>${pr.product.title}</td>
                    <td>${pr.quantity}</td>
                </tr>`           
                rejectedProducst.concat(prod)     
            });

            rejected = 
            `            
            <h5 class="text-center">Listado de productos rechazados, quedaran guardados en el carrito para la proxima compra</h6>
            <table class="table table-striped text-center">
                <thead>
                    <tr>                
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${rejectedProducst}
                </tbody>
            </table>
            `
         }

         let accepted = ""
         if(response.acceptedProds){
            let acceptedProducst = 
            array.forEach(pr => {
                const prod =
                `<tr>                
                    <td>${pr.product.title}</td>
                    <td>${pr.quantity}</td>
                </tr>`           
                acceptedProducst.concat(prod)     
            });

            accepted = 
            `
            <div> 
                <h5 class="text-center">Listado de productos Aceptados</h5>
                <table class="table table-striped text-center">
                    <thead>
                        <tr>                
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${acceptedProducst}
                    </tbody>
                </table>
            </div>

            <div class=" border border-success rounded p-4 m-4">
                <ul class="list-group list-group-horizontal w-100">
                <li class="list-group-item  w-50">Precio productos comprados</li>
                <li class="list-group-item  w-50 text-center">${response.amount}</li>
                </ul>
                <ul class="list-group list-group-horizontal w-100">
                <li class="list-group-item  w-50">Comprador</li>
                <li class="list-group-item  w-50 text-center">${response.purcharser}</li>
                </ul>
                <ul class="list-group list-group-horizontal w-100">
                <li class="list-group-item  w-50">Codigo de Ticket</li>
                <li class="list-group-item  w-50 text-center">${response.code}</li>
                </ul>
                <ul class="list-group list-group-horizontal w-100">
                <li class="list-group-item  w-50">Fecha compra</li>
                <li class="list-group-item  w-50 text-center">${response.purchase_datetime}</li>
                </ul>
            </div>
            `
         }


        const templateEmail = rejected.concat(accepted)
        
        const email = validateEmail("Email",response.purcharser)
        const options ={
            from : "Email desde TP Final Coderhouse Nodejs",
            to : email ,
            subject : "Resumen de compra" ,
            html : templateEmail ,      
            attachments:[]
        }
        console.log("************* ENVIANDO EMAIL *************")
        console.log(options)
        console.log("************* ENVIANDO EMAIL *************")
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