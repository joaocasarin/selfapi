import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';

export class ProjectAuthentication {
    public async handle(req: Request, _res: Response, next: NextFunction) {
        try {
            const { headers } = req;
            const { authorization } = headers;

            if (!authorization) {
                throw ApiError.forbidden('You must be authenticated.');
            }

            const [, token] = (authorization as string).split(' ');

            if (token !== process.env.AUTH_TOKEN) {
                throw ApiError.unauthorized('Invalid token.');
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
