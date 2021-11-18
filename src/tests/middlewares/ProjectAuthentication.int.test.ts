import dotenv from 'dotenv';

dotenv.config();
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../../app';
import { projectWithApp, projectWithoutApp } from '../mocks/Projects';

describe('ProjectAuthentication', () => {
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

    it('should return an error telling to pass the authorization token in the headers', async () => {
        const response = await supertest(app).post('/v1/projects/create').send(projectWithApp);

        expect(response.status).toEqual(403);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('You must be authenticated.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(403);
    });

    it('should return an error if user passed incorrect token', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .set('authorization', 'Bearer faketoken')
            .send(projectWithoutApp);

        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Invalid token.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(401);
    });
});
