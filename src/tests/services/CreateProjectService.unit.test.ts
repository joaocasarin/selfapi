import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IProject } from '../../schemas/ProjectSchema';
import { projectWithApp } from '../mocks/Projects';
import { CreateProjectService } from '../../services';
import { MongooseError } from '../../errors';
import { uuidv4Regex } from '../../utils';

describe('CreateProjectService', () => {
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

    it('should create a project', async () => {
        const service = new CreateProjectService();
        const result = (await service.execute(projectWithApp)) as IProject;

        expect(result.name).toEqual(projectWithApp.name);
        expect(result.description).toEqual(projectWithApp.description);
        expect(result.github).toEqual(projectWithApp.github);
        expect(result.logo).toEqual(projectWithApp.logo);
        expect(result.app).toEqual(projectWithApp.app);
        expect(result.id).toMatch(uuidv4Regex);
    });

    it('should throw an error if the project is found in the database', async () => {
        const service = new CreateProjectService();
        (await service.execute(projectWithApp)) as IProject;

        await expect(service.execute(projectWithApp)).rejects.toThrow(
            MongooseError.projectAlreadyExists(projectWithApp.name)
        );
    });
});
