export class AuthorizationError extends Error {
    constructor(mensaje = 'Autorizacion ERRONEA') {
        super(mensaje);
        this.type = 'AUTHORIZATION_ERROR';
    }
}
