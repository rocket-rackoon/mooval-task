import * as should from 'should';

import { getConfig } from '../configs';

import { HttpClient } from './http_client';
import { getAxiosInstance, getHttpClient } from './index';

describe('Infrastructure', () => {
  describe('http', () => {
    beforeEach(() => {
      process.env['github_endpoint'] = 'http://gh';
    });

    describe('getAxiosInstance', () => {
      it('should return an axios instance with timeout', () => {
        const instance = getAxiosInstance(getConfig());

        should(instance.defaults.timeout).equal(1000);
      });

      it('should return an axios instance with base url', () => {
        const gh = 'http://gh';
        process.env['github_endpoint'] = gh;

        const instance = getAxiosInstance(getConfig());

        should(instance.defaults.baseURL).equal(gh);
      });

      it('should return an axios instance with auth header if Github toke is set', () => {
        const token = 'token';
        process.env['github_token'] = token;

        const instance = getAxiosInstance(getConfig());

        should(instance.defaults.headers.Authorization).eql(`token ${token}`);
      });

      it('should return an axios instance without auth header if Github toke is not set', () => {
        delete process.env['github_token'];

        const instance = getAxiosInstance(getConfig());

        should(instance.defaults.headers.Authorization).undefined();
      });
    });

    describe('getHttpClient', () => {
      it('should return instance of HttpClient', () => {
        should(getHttpClient(getConfig())).instanceOf(HttpClient);
      });
    });
  });
});
