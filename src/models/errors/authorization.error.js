export class AuthorizationError extends Error {
    constructor(description) {
        super();
        this.type = 'AUTHORIZATION_ERROR';
        this.description = description;
    }
}