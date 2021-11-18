import dotenv from 'dotenv';

dotenv.config();
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { projectWithApp } from '../mocks/Projects';
import { app } from '../../app';
import { Project, IProject } from '../../schemas/ProjectSchema';
import { GetProjectsService } from '../../services';
import { uuidv4Regex } from '../../utils';

describe('GetProjectsController', () => {
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

    it('should return 200 and a list of projects', async () => {
        await Project.create(projectWithApp);

        const response = await supertest(app).get('/v1/projects');

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('projects');
        expect(response.body.projects).toHaveLength(1);

        const project: IProject = response.body.projects[0];

        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('name');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('github');
        expect(project).toHaveProperty('logo');
        expect(project).toHaveProperty('app');
        expect(project.id).toMatch(uuidv4Regex);
        expect(project.name).toEqual(projectWithApp.name);
        expect(project.description).toEqual(projectWithApp.description);
        expect(project.github).toEqual(projectWithApp.github);
        expect(project.logo).toEqual(projectWithApp.logo);
        expect(project.app).toEqual(projectWithApp.app);
    });

    it('should return 200 and an empty list of projects', async () => {
        const response = await supertest(app).get('/v1/projects');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ projects: [] });
    });

    it('should return 500 and an error', async () => {
        jest.spyOn(GetProjectsService.prototype, 'execute').mockRejectedValue(new Error('Error'));

        const response = await supertest(app).get('/v1/projects');

        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('UnknownError');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual('Something went wrong.');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(500);
    });
});
