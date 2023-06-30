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
export class NotFoundUserWeb extends Error {
    constructor(description) {
        super();
        this.type = 'NOT_FOUND_USER_ERROR_WEB';
        this.description = description;
    }
}