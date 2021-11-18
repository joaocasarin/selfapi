import dotenv from 'dotenv';

dotenv.config();
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../../app';
import { projectWithApp } from '../mocks/Projects';

describe('DeleteProjectController', () => {
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
        const createResponse = await supertest(app)
            .post('/v1/projects/create')
            .send(projectWithApp)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);
        const { id } = createResponse.body.project;

        const response = await supertest(app)
            .delete(`/v1/projects/delete/${id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(204);
    });

    it('should return a not found project error', async () => {
        const response = await supertest(app)
            .delete('/v1/projects/delete/a00bd356-fe10-4b23-832f-34bd4dadc461')
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('MongooseError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project does not exist.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(500);
    });
});
