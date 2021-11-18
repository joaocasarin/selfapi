import { NextFunction, Request, Response } from 'express';
import { DeleteProjectService } from '../services';

export class DeleteProjectController {
    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { params } = req;

            const { id } = params;

            const service = new DeleteProjectService();
            await service.execute(id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
