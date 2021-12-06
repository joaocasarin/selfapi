import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MongooseError } from '../../errors';
import { ProjectModel, Project } from '../../schemas/ProjectSchema';
import { DeleteProjectService } from '../../services';
import { projectOne } from '../mocks/Projects';

describe('DeleteProjectService', () => {
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

    it('should delete the project with the given id', async () => {
        const result: ProjectModel = await Project.create(projectOne);

        const delService = new DeleteProjectService();
        const delResult = await delService.execute(result.id);

        expect(delResult).toBeUndefined();
    });

    it('should throw an error if the project does not exist', async () => {
        const service = new DeleteProjectService();
        await expect(service.execute('fakeid')).rejects.toThrow(
            MongooseError.projectDoesNotExist()
        );
    });
});
