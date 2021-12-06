import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProjectModel } from '../../schemas/ProjectSchema';
import { projectOne } from '../mocks/Projects';
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
        const result = (await service.execute(projectOne)) as ProjectModel;

        expect(result.id).toMatch(uuidv4Regex);
        expect(result.name).toEqual(projectOne.name);
        expect(result.description).toEqual(projectOne.description);
        expect(result.stack).toEqual(projectOne.stack);
        expect(result.sourceCode).toEqual(projectOne.sourceCode);
        expect(result.livePreview).toEqual(projectOne.livePreview);
    });

    it('should throw an error if the project is found in the database', async () => {
        const service = new CreateProjectService();
        (await service.execute(projectOne)) as ProjectModel;

        await expect(service.execute(projectOne)).rejects.toThrow(
            MongooseError.projectAlreadyExists(projectOne.name)
        );
    });
});
