
export class NotFoundError extends Error {
    constructor(description) {
        super();
        this.type = 'Not Found';
        this.description = description;
    }
}
export class NotFoundErrorWeb extends Error {
    constructor(description) {
        super();
        this.type = 'Not Found web';
        this.description = description;
    }
}