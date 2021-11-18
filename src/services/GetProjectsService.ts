import { IProject, Project } from '../schemas/ProjectSchema';

export class GetProjectsService {
    public async execute(): Promise<IProject[]> {
        const data = await Project.find({}).select('-_id -__v');
        return data;
    }
}
