import { IProject, Project } from '../schemas/ProjectSchema';
import { MongooseError } from '../errors';

export class CreateProjectService {
    public async execute(project: IProject): Promise<IProject> {
        const newProject = new Project(project);

        if (await Project.findOne({ name: project.name })) {
            throw MongooseError.projectAlreadyExists(project.name);
        }

        const data = await newProject.save();

        return data;
    }
}
