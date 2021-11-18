import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors';
import { uuidv4Regex } from '../utils';

export class DeleteProjectHandler {
    public async handle(req: Request, _res: Response, next: NextFunction): Promise<void> {
        try {
            const { params } = req;
            const { id } = params;

            if (!uuidv4Regex.test(id)) {
                throw ApiError.badRequest('Project id is invalid.');
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
