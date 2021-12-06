import dotenv from 'dotenv';

dotenv.config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

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

    it('should return an error because there is no name field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                description: 'description',
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project name is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because name field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 1,
                description: 'description',
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project name must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because there is no description field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project description is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because description field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 1,
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project description must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because there is no stack field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project stack is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because stack field is not a string array', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['1', 2],
                sourceCode: 'sourceCode',
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project stack must be a string array.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because there is no sourceCode field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['stack'],
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project sourceCode is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because sourceCode field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['stack'],
                sourceCode: 1,
                livePreview: 'livePreview'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project sourceCode must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because there is no livePreview field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['stack'],
                sourceCode: 'sourceCode'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project livePreview is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because livePreview field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                stack: ['stack'],
                sourceCode: 'sourceCode',
                livePreview: 1
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project livePreview must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });
});
