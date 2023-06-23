
export class NotFoundError extends Error {
    constructor(description) {
        super();
        this.type = 'Not Found';
        this.description = description;
    }
}