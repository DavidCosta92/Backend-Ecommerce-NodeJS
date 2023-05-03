
export class AuthenticationError extends Error {
    constructor(mensaje = 'Autenticacion ERRONEA') {
        super(mensaje);
        this.tipo = 'AUTHE_ERROR';
    }
}
