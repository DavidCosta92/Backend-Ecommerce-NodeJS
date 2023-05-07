
export class AuthenticationError extends Error {
    constructor(mensaje = 'Autenticacion ERRONEA') {
        super(mensaje);
        this.type = 'AUTHETICATION_ERROR';
    }
}
