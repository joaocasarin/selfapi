import { NextFunction, Request, Response } from 'express';
import { RequestProjectBody, ProjectModel } from '../schemas/ProjectSchema';
import { CreateProjectService } from '../services';

export class CreateProjectController {
    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const project: RequestProjectBody = body;
            const service = new CreateProjectService();
            const result = (await service.execute(project)) as ProjectModel;

            const { id, name, description, stack, sourceCode, livePreview } = result;

            const createdProject: ProjectModel = {
                id,
                name,
                description,
                stack,
                sourceCode,
                livePreview
            };

            res.status(200).send({ project: createdProject });
        } catch (error) {
            next(error);
        }
    }
}
