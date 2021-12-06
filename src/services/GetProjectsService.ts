import { RequestProjectBody, Project } from '../schemas/ProjectSchema';

export class GetProjectsService {
    public async execute(): Promise<RequestProjectBody[]> {
        const data = await Project.find({}).select('-_id -__v');
        return data;
    }
}
