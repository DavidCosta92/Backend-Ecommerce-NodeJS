export class AuthorizationError extends Error {
    constructor(mensaje = 'Autorizacion ERRONEA') {
        super(mensaje);
        this.tipo = 'AUTHO_ERROR';
    }
}
