import { ApiError } from '../../errors';

describe('ApiError', () => {
    it('should create a bad request error', () => {
        const error = ApiError.badRequest('bad request message');

        expect(error.message).toEqual('bad request message');
        expect(error.name).toEqual('ApiError');
        expect(error instanceof ApiError).toBeTruthy();
    });

    it('should create an unauthorized error', () => {
        const error = ApiError.unauthorized('unauthorized message');

        expect(error.message).toEqual('unauthorized message');
        expect(error.name).toEqual('ApiError');
        expect(error instanceof ApiError).toBeTruthy();
    });

    it('should create a forbidden error', () => {
        const error = ApiError.forbidden('forbidden message');

        expect(error.message).toEqual('forbidden message');
        expect(error.name).toEqual('ApiError');
        expect(error instanceof ApiError).toBeTruthy();
    });
});
