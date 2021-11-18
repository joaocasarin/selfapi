import { MongooseError } from '../../errors';

describe('MongooseError', () => {
    it('should create an already existing error', () => {
        const error = MongooseError.projectAlreadyExists('name');

        expect(error.message).toEqual('Project name already exists.');
        expect(error.name).toEqual('MongooseError');
        expect(error instanceof MongooseError).toBeTruthy();
    });

    it('should create a project not found error', () => {
        const error = MongooseError.projectDoesNotExist();

        expect(error.message).toEqual('Project does not exist.');
        expect(error.name).toEqual('MongooseError');
        expect(error instanceof MongooseError).toBeTruthy();
    });
});
