import { Request, Response, NextFunction } from 'express';
import { RequestProjectBody } from '../schemas/ProjectSchema';
import { ApiError } from '../errors';

export class CreateProjectHandler {
    public async handle(req: Request, _res: Response, next: NextFunction) {
        try {
            const { body }: { body: RequestProjectBody } = req;

            const { name, description, stack, sourceCode, livePreview } = body;

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

            // stack field verifications
            if (!stack) {
                throw ApiError.badRequest('Project stack is required.');
            }

            let stackItemNotString = false;

            stack.forEach((item) => {
                if (typeof item !== 'string') stackItemNotString = true;
            });

            if (Array.isArray(stack) && stackItemNotString) {
                throw ApiError.badRequest('Project stack must be a string array.');
            }

            // sourceCode field verifications
            if (!sourceCode) {
                throw ApiError.badRequest('Project sourceCode is required.');
            }

            if (typeof sourceCode !== 'string') {
                throw ApiError.badRequest('Project sourceCode must be a string.');
            }

            // livePreview field verifications
            if (!livePreview) {
                throw ApiError.badRequest('Project livePreview is required.');
            }

            if (typeof livePreview !== 'string') {
                throw ApiError.badRequest('Project livePreview must be a string.');
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
