import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';

export class CreateProjectHandler {
    public async handle(req: Request, _res: Response, next: NextFunction) {
        try {
            const { body } = req;

            const { name, description, github, logo, app } = body;

            // name field verifications
            if (!name) {
                throw ApiError.badRequest('Project name is required.');
            }

            if (typeof name !== 'string') {
                throw ApiError.badRequest('Project name must be a string.');
            }

            // description field verifications
            if (!description) {
                throw ApiError.badRequest('Project description is required.');
            }

            if (typeof description !== 'string') {
                throw ApiError.badRequest('Project description must be a string.');
            }

            // github field verifications
            if (!github) {
                throw ApiError.badRequest('Project Github link is required.');
            }

            if (typeof github !== 'string') {
                throw ApiError.badRequest('Project Github link must be a string.');
            }

            // logo field verifications
            if (!logo) {
                throw ApiError.badRequest('Project logo is required.');
            }

            if (typeof logo !== 'string') {
                throw ApiError.badRequest('Project logo must be a string.');
            }

            // app field verifications
            if (app && typeof app !== 'string') {
                throw ApiError.badRequest('Project app must be a string.');
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
