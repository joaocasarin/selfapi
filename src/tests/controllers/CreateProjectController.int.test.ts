import dotenv from 'dotenv';

dotenv.config();
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Project, ProjectModel } from '../../schemas/ProjectSchema';
import { projectOne, projectTwo } from '../mocks/Projects';
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

    it('should create a project', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectOne)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        const project = response.body.project as ProjectModel;

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('project');
        expect(project).toHaveProperty('id');
        expect(project.id).toMatch(uuidv4Regex);
        expect(project).toHaveProperty('name');
        expect(project.name).toEqual(projectOne.name);
        expect(project).toHaveProperty('description');
        expect(project.description).toEqual(projectOne.description);
        expect(project).toHaveProperty('stack');
        expect(project.stack).toEqual(projectOne.stack);
        expect(project).toHaveProperty('sourceCode');
        expect(project.sourceCode).toEqual(projectOne.sourceCode);
        expect(project).toHaveProperty('livePreview');
        expect(project.livePreview).toEqual(projectOne.livePreview);
    });

    it('should create a second project', async () => {
        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectTwo)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        const project = response.body.project as ProjectModel;

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('project');
        expect(project).toHaveProperty('id');
        expect(project.id).toMatch(uuidv4Regex);
        expect(project).toHaveProperty('name');
        expect(project.name).toEqual(projectTwo.name);
        expect(project).toHaveProperty('description');
        expect(project.description).toEqual(projectTwo.description);
        expect(project).toHaveProperty('stack');
        expect(project.stack).toEqual(projectTwo.stack);
        expect(project).toHaveProperty('sourceCode');
        expect(project.sourceCode).toEqual(projectTwo.sourceCode);
        expect(project).toHaveProperty('livePreview');
        expect(project.livePreview).toEqual(projectTwo.livePreview);
    });

    it('should return 500 and not create when project name is found in database', async () => {
        await Project.create(projectOne);

        const response = await supertest(app)
            .post('/v1/projects/create')
            .send(projectOne)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`);

        expect(response.status).toEqual(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('name');
        expect(response.body.error.name).toEqual('MongooseError');
        expect(response.body.error).toHaveProperty('statusCode');
        expect(response.body.error.statusCode).toEqual(500);
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toEqual(`Project ${projectOne.name} already exists.`);
    });
});
