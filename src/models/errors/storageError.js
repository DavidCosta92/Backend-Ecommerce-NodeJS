export class StorageError extends Error {
    constructor(description) {
        super();
        this.type = 'STORAGE_ERROR';
        this.description = description;
    }
}