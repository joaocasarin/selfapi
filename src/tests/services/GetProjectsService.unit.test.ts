import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IProject, Project } from '../../schemas/ProjectSchema';
import { projectWithApp, projectWithoutApp } from '../mocks/Projects';
import { GetProjectsService } from '../../services';

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
        const project: IProject = await Project.create(projectWithApp);
        const project2: IProject = await Project.create(projectWithoutApp);

        const service = new GetProjectsService();
        const result = (await service.execute()) as IProject[];

        expect(result[0].name).toEqual(project.name);
        expect(result[0].description).toEqual(project.description);
        expect(result[0].github).toEqual(project.github);
        expect(result[0].logo).toEqual(project.logo);
        expect(result[0].app).toEqual(project.app);

        expect(result[1].name).toEqual(project2.name);
        expect(result[1].description).toEqual(project2.description);
        expect(result[1].github).toEqual(project2.github);
        expect(result[1].logo).toEqual(project2.logo);
    });

    it('should return an empty list of projects', async () => {
        const service = new GetProjectsService();
        const result = (await service.execute()) as IProject[];
        expect(result).toEqual([]);
    });
});
