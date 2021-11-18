import { Router } from 'express';
import {
    CreateProjectController,
    DeleteProjectController,
    GetProjectsController
} from '../controllers';
import { CreateProjectHandler, DeleteProjectHandler, ProjectAuthentication } from '../middlewares';

const router = Router();
const projectAuthentication = new ProjectAuthentication();

const getProjectsController = new GetProjectsController();

const createProjectController = new CreateProjectController();
const createProjectHandler = new CreateProjectHandler();

const deleteProjectController = new DeleteProjectController();
const deleteProjectHandler = new DeleteProjectHandler();

router.get('/projects', getProjectsController.handle);
router.post(
    '/projects/create',
    projectAuthentication.handle,
    createProjectHandler.handle,
    createProjectController.handle
);
router.delete(
    '/projects/delete/:id',
    projectAuthentication.handle,
    deleteProjectHandler.handle,
    deleteProjectController.handle
);

export { router };
