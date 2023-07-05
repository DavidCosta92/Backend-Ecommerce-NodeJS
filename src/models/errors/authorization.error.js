export class AuthorizationError extends Error {
    constructor(description) {
        super();
        this.type = 'AUTHORIZATION_ERROR';
        this.description = description;
    }
}
export class AuthorizationErrorWEB extends Error {
    constructor(description) {
        super();
        this.type = 'AUTHORIZATION_ERROR_WEB';
        this.description = description;
    }
}