import { RequestProjectBody } from '../../schemas/ProjectSchema';

export const projectOne: RequestProjectBody = {
    name: 'Test Project',
    description: 'Test Project Description',
    stack: ['react', 'typescript'],
    sourceCode: 'Source Test Project',
    livePreview: 'Live Test Project'
};

export const projectTwo: RequestProjectBody = {
    name: 'Test Project 2',
    description: 'Test Project Description 2',
    stack: ['angular', 'mongodb'],
    sourceCode: 'Source Test Project 2',
    livePreview: 'Live Test Project 2'
};
