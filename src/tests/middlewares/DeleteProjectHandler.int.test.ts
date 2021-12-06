import dotenv from 'dotenv';

dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { ProjectModel } from '../../schemas/ProjectSchema';

describe('DeleteProjectHandler', () => {
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

    it('should delete the created project', async () => {
        const createResponse = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        const { project }: { project: ProjectModel } = createResponse.body;
        const createdProjectId = project.id;

        const response = await supertest(app)
            .delete(`/v1/projects/delete/${createdProjectId}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(204);
    });

    it('should return an error because no id was given', async () => {
        const response = await supertest(app)
            .delete('/v1/projects/delete')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(404);
    });

    it('should return an error because the given id is invalid', async () => {
        const response = await supertest(app)
            .delete('/v1/projects/delete/fakeid')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project id is invalid.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });
});
