import * as should from 'should';

import { ApiRequest } from './api_request';

describe('Models', () => {
  describe('ApiRequest', () => {
    it('should return false if "user" is not set', () => {
      const req = new ApiRequest('', ['lang1']);
      should(req.isValid()).false();
      should(req.getValidationErrors()).containDeep(['user name is required']);
    });

    it('should return false if "languages" are empty', () => {
      const req = new ApiRequest('user', []);
      should(req.isValid()).false();
      should(req.getValidationErrors()).containDeep([
        'at least language is required'
      ]);
    });

    it('should return false if "languages" is not an array', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req = new ApiRequest('user', '' as any);
      should(req.isValid()).false();
    });

    it('should contain all the errors', () => {
      const req = new ApiRequest('', []);
      should(req.isValid()).false();
      should(req.getValidationErrors()).containDeep([
        'user name is required',
        'at least language is required'
      ]);
    });

    it('should return the JSON structure', () => {
      const req = new ApiRequest('user', ['l1', 'l2']);
      should(req.isValid()).true();
      should(req.getValidationErrors()).containDeep([]);
      should(req.getJson()).deepEqual({
        user: 'user',
        language: ['l1', 'l2']
      });
    });
  });
});
