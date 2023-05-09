
export class AuthenticationError extends Error {
    constructor(mensaje = 'Autenticacion ERRONEA') {
        super(mensaje);
        this.type = 'AUTHETICATION_ERROR';
    }
}


export class AuthenticationExpiredError extends Error {
    constructor(mensaje = 'Autenticacion expirada') {
        super(mensaje);
        this.type = 'AUTHETICATION_EXPIRED_ERROR';
    }
}