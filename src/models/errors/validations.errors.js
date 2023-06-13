
export class IllegalInputArg extends Error {
    constructor(description) {
        super();
        this.type = 'Illegal Input';
        this.description = description;
    }
}