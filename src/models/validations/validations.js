import { IllegalInputArg } from "../errors/validations.errors.js";

export function noEmpty(field, value){
    if (!value ) throw new IllegalInputArg(`¡${field} es un dato obligatorio!`) 
}

export function validateString(field, value){
    noEmpty(field, value)
    if (typeof value !== 'string' ) throw new IllegalInputArg(`${field} debe ser una cadena de caracteres`) 
}
export function validateEmail(field, value){
    validateString(field, value)
    if (!value.includes('@')) throw new IllegalInputArg(`${field} debe contener el simbolo '@'`) 
}

export function validateIntegerNumber(field, value){
    noEmpty(field, value)    
    if( typeof value !== "number" ) throw new IllegalInputArg(`${field} es un campo numerico`) 
    if( !Number.isInteger(Number(value)) || value<0 || value > 120) throw new IllegalInputArg(`${field} debe ser entero, mayor a cero y menor a 120 años.`) 
}
export function validateRealNumber(field, value){
    noEmpty(field, value)    
    if( typeof value !== "number" ) throw new IllegalInputArg(`${field} es un campo numerico`) 
    if( value<0) throw new IllegalInputArg(`${field} debe ser mayor a cero`) 
}