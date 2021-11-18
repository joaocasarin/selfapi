export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.message = message;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message: string): ApiError {
        return new ApiError(400, message);
    }

    static unauthorized(message: string): ApiError {
        return new ApiError(401, message);
    }

    static forbidden(message: string): ApiError {
        return new ApiError(403, message);
    }
}
