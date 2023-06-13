export class RegisterErrorAlreadyExistUser extends Error {
    constructor(description) {
        super();
        this.type = 'REGISTER_ERROR_USER_EXIST';
        this.description = description;
    }
}
export class RegisterError extends Error {
    constructor(description) {
        super();
        this.type = 'REGISTER_ERROR';
        this.description = description;
    }
}