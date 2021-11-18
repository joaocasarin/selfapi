import { NextFunction, Request, Response } from 'express';
import { IProject } from '../schemas/ProjectSchema';
import { CreateProjectService } from '../services';

export class CreateProjectController {
    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;
            const project: IProject = body;
            const service = new CreateProjectService();
            const result = await service.execute(project);
            res.status(200).send({ project: result });
        } catch (error) {
            next(error);
        }
    }
}
