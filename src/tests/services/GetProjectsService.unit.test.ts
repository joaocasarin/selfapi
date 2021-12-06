import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProjectModel, Project } from '../../schemas/ProjectSchema';
import { projectOne, projectTwo } from '../mocks/Projects';
import { GetProjectsService } from '../../services';
import { uuidv4Regex } from '../../utils';

describe('GetProjectsService', () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    afterEach(async () => {
        await mongoose.connection.dropDatabase();
        jest.resetAllMocks();
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should return a list of projects', async () => {
        const project: ProjectModel = await Project.create(projectOne);
        const project2: ProjectModel = await Project.create(projectTwo);

        const service = new GetProjectsService();
        const [resultOne, resultTwo] = (await service.execute()) as ProjectModel[];

        expect(resultOne.id).toMatch(uuidv4Regex);
        expect(resultOne.name).toEqual(project.name);
        expect(resultOne.description).toEqual(project.description);
        expect(resultOne.stack).toEqual(project.stack);
        expect(resultOne.sourceCode).toEqual(project.sourceCode);
        expect(resultOne.livePreview).toEqual(project.livePreview);

        expect(resultTwo.id).toMatch(uuidv4Regex);
        expect(resultTwo.name).toEqual(project2.name);
        expect(resultTwo.description).toEqual(project2.description);
        expect(resultTwo.stack).toEqual(project2.stack);
        expect(resultTwo.sourceCode).toEqual(project2.sourceCode);
        expect(resultTwo.livePreview).toEqual(project2.livePreview);
    });

    it('should return an empty list of projects', async () => {
        const service = new GetProjectsService();
        const result = (await service.execute()) as ProjectModel[];
        expect(result).toEqual([]);
    });
});
