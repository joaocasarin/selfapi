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
                github: 'github',
                logo: 'logo'
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
                github: 'github',
                logo: 'logo'
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
                github: 'github',
                logo: 'logo'
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
                github: 'github',
                logo: 'logo'
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

    it('should return an error because there is no github field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                logo: 'logo'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project Github link is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because github field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                github: 1,
                logo: 'logo'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project Github link must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because there is no logo field', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                github: 'github'
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project logo is required.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because logo field is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                github: 'github',
                logo: 1
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project logo must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });

    it('should return an error because app field was used and it is not a string', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send({
                name: 'name',
                description: 'description',
                github: 'github',
                logo: 'logo',
                app: 1
            })
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('ApiError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Project app must be a string.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(400);
    });
});
