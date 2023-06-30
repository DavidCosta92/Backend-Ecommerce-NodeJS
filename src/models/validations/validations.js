import { IllegalInputArg , TicketError} from "../errors/validations.errors.js";

export function noEmpty(field, value){
    if (!value ) throw new IllegalInputArg(`¡${field} es un dato obligatorio!`) 
    return value
}

export function validateString(field, value){
    noEmpty(field, value)
    if (typeof value !== 'string' ) throw new IllegalInputArg(`${field} debe ser una cadena de caracteres`) 
    return value
}
export function validatePasswords(field, value){
    validateString(field, value)    
    if (value.length<5) throw new IllegalInputArg(`${field} debe tener al menos 5 caracteres`) 
    return value
}
export function validateEmail(field, value){
    validateString(field, value)
    if (!value.includes('@') && !value.includes('github-user')) throw new IllegalInputArg(`${field} debe contener el simbolo '@'`) 
    return value
}

export function validateIntegerNumber(field, value){
    noEmpty(field, value)    
    if( typeof value !== "number" ) throw new IllegalInputArg(`${field} es un campo numerico`) 
    if( !Number.isInteger(Number(value)) || value<0 ) throw new IllegalInputArg(`${field} debe ser entero, mayor a cero`) 
    return value
}
export function validateAge(field, value){
    noEmpty(field, value)    
    validateIntegerNumber(field, value)    
    if(value<120 ) throw new IllegalInputArg(`${field} no puede ser mayor a 120`) 
    return value
}
export function validateRealNumber(field, value){
    noEmpty(field, value)    
    if( typeof value !== "number" ) throw new IllegalInputArg(`${field} es un campo numerico`) 
    if( value<0) throw new IllegalInputArg(`${field} debe ser mayor a cero`) 
    return value
}

// validaciones especificas de tickets
export function validateAcceptedProd(acceptedProds){    
    if(acceptedProds.length==0) throw new TicketError("No existen productos en condiciones de ser comprados, no puede continuar con la compra")
    return acceptedProds
}