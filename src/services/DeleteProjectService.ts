import { Project } from '../schemas/ProjectSchema';
import { MongooseError } from '../errors';

export class DeleteProjectService {
    public async execute(id: string): Promise<void> {
        const projectToDelete = await Project.findOneAndDelete({ id });

        if (!projectToDelete) {
            throw MongooseError.projectDoesNotExist();
        }
    }
}
