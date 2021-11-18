import { IProject } from '../../schemas/ProjectSchema';

export const projectWithApp: IProject = {
    name: 'Test Project',
    description: 'Test Project Description',
    app: 'Test App',
    github: 'Test Github',
    logo: 'Test Logo'
};

export const projectWithoutApp: IProject = {
    name: 'Test Project 2',
    description: 'Test Project Description 2',
    github: 'Test Github 2',
    logo: 'Test Logo 2'
};
