import { RequestProjectBody, Project } from '../schemas/ProjectSchema';
import { MongooseError } from '../errors';

export class CreateProjectService {
    public async execute(project: RequestProjectBody): Promise<RequestProjectBody> {
        const newProject = new Project(project);

        if (await Project.findOne({ name: project.name })) {
            throw MongooseError.projectAlreadyExists(project.name);
        }

        const data = await newProject.save();

        return data;
    }
}
