import * as should from 'should';
import * as sinon from 'sinon';
import axios, { AxiosInstance } from 'axios';

import { OperationError } from '../../models';

import { HttpClient } from './http_client';

describe('Infrastructure', () => {
  describe('http', () => {
    describe('HttpClient', () => {
      let axiosInstance: AxiosInstance;
      let httpClient: HttpClient;
      let sinonStub: sinon.SinonStub;

      beforeEach(() => {
        sinonStub = sinon.stub();
        axiosInstance = axios.create();
        axiosInstance.get = sinonStub;
        httpClient = new HttpClient(axiosInstance);
      });

      it('should return proper response', async () => {
        const response = {
          data: 'user'
        };
        sinonStub.resolves(response);

        const result = await httpClient.get('http://test');
        should(result).eql(response.data);
      });

      it('should throw OperationError with response data', async () => {
        const error = {
          toJSON(): string {
            return 'test';
          },
          response: {
            data: {
              message: 'message'
            },
            status: 400
          }
        };

        sinonStub.rejects(error);

        return should(httpClient.get('http://test')).rejectedWith(
          new OperationError(error.response.data.message, error.response.status)
        );
      });

      it('should throw OperationError with default error message', async () => {
        sinonStub.rejects(new Error());

        await should(httpClient.get('http://test')).rejectedWith(
          new OperationError('Unexpected error', 500)
        );
      });
    });
  });
});
