
export class RegisterErrorAlreadyExistUser extends Error {
    constructor(mensaje = 'Autenticacion ERRONEA') {
        super(mensaje);
        this.type = 'REGISTER_ERROR_USER_EXIST';
    }
}

export class RegisterError extends Error {
    constructor(mensaje = 'Autenticacion ERRONEA') {
        super(mensaje);
        this.type = 'REGISTER_ERROR';
    }
}
