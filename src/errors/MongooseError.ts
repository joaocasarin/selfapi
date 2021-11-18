export class MongooseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MongooseError';
        this.message = message;

        Object.setPrototypeOf(this, MongooseError.prototype);
    }

    static projectAlreadyExists(projectName: string) {
        return new MongooseError(`Project ${projectName} already exists.`);
    }

    static projectDoesNotExist() {
        return new MongooseError('Project does not exist.');
    }
}
