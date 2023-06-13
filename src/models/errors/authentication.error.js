
export class AuthenticationError extends Error {
    constructor(description) {
        super();
        this.type = 'AUTHETICATION_ERROR';
        this.description = description;
    }
}
export class AuthenticationExpiredError extends Error {
    constructor(description) {
        super();
        this.type = 'AUTHETICATION_EXPIRED_ERROR';
        this.description = description;
    }
}
