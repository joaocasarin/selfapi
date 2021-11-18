import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';
import { MongooseError } from './MongooseError';

// eslint-disable-next-line no-unused-vars
export function ErrorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).send({
            error: {
                name: error.name,
                statusCode: error.statusCode,
                message: error.message
            }
        });
    }

    if (error instanceof MongooseError) {
        return res.status(500).send({
            error: {
                name: error.name,
                statusCode: 500,
                message: error.message
            }
        });
    }

    return res.status(500).send({
        error: {
            name: 'UnknownError',
            statusCode: 500,
            message: 'Something went wrong.'
        }
    });
}
