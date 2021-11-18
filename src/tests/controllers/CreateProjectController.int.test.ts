import dotenv from 'dotenv';

dotenv.config();
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Project } from '../../schemas/ProjectSchema';
import { projectWithApp, projectWithoutApp } from '../mocks/Projects';
import { uuidv4Regex } from '../../utils';

describe('CreateProjectController', () => {
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

    it('should create a project without app', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectWithoutApp)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('project');
        expect(response.body.project).toHaveProperty('id');
        expect(response.body.project.id).toMatch(uuidv4Regex);
        expect(response.body.project).toHaveProperty('name');
        expect(response.body.project.name).toEqual(projectWithoutApp.name);
        expect(response.body.project).toHaveProperty('description');
        expect(response.body.project.description).toEqual(projectWithoutApp.description);
        expect(response.body.project).toHaveProperty('github');
        expect(response.body.project.github).toEqual(projectWithoutApp.github);
        expect(response.body.project).toHaveProperty('logo');
        expect(response.body.project.logo).toEqual(projectWithoutApp.logo);
        expect(response.body.project).not.toHaveProperty('app');
    });

    it('should create a project with app', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectWithApp)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('project');
        expect(response.body.project).toHaveProperty('id');
        expect(response.body.project.id).toMatch(uuidv4Regex);
        expect(response.body.project).toHaveProperty('name');
        expect(response.body.project.name).toEqual(projectWithApp.name);
        expect(response.body.project).toHaveProperty('description');
        expect(response.body.project.description).toEqual(projectWithApp.description);
        expect(response.body.project).toHaveProperty('github');
        expect(response.body.project.github).toEqual(projectWithApp.github);
        expect(response.body.project).toHaveProperty('logo');
        expect(response.body.project.logo).toEqual(projectWithApp.logo);
        expect(response.body.project).toHaveProperty('app');
        expect(response.body.project.app).toEqual(projectWithApp.app);
    });

    it('should return 500 and not create when project name is found in database', async () => {
        await Project.create(projectWithApp);

        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectWithApp)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('MongooseError');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(500);
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual(
            `Project ${projectWithApp.name} already exists.`
        );
    });
});
