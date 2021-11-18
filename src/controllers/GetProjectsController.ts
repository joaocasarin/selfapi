import { NextFunction, Request, Response } from 'express';
import { GetProjectsService } from '../services';

export class GetProjectsController {
    public async handle(_req: Request, res: Response, next: NextFunction) {
        try {
            const service = new GetProjectsService();
            const result = await service.execute();
            res.status(200).send({ projects: result });
        } catch (error) {
            next(error);
        }
    }
}
