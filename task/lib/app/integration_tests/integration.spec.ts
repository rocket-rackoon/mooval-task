import { Server } from 'http';
import * as should from 'should';
import * as nock from 'nock';
import * as request from 'supertest';

import { getConfig, IConfig } from '../../infrastructure';
import { IGitSearchResult, IGitUser } from '../../models';

import { getApp } from '../index';

const gitHubApi = 'http://gh';
const userSearchUsersEndpoint = '/api/user.searchUsers';

describe('Integration test', () => {
  let config: IConfig;
  let app: Server;

  before((done) => {
    process.env['github_endpoint'] = gitHubApi;
    process.env['server_port'] = '8989';

    config = getConfig();
    app = getApp(config).listen(config.getServerPort(), done);
  });

  after((done) => {
    delete process.env['github_endpoint'];
    delete process.env['server_port'];

    app.close(done);
  });

  describe('Specification related paths', () => {
    it('should have /spec/docs path', () => {
      return request(app)
        .get('/spec/docs')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });

    it('should have /spec/def path', () => {
      return request(app)
        .get('/spec/def')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    describe('api endpoints', () => {
      it(`should have ${userSearchUsersEndpoint}`, () => {
        return request(app)
          .get('/spec/def')
          .then((response) => {
            should(response.body.paths).have.property(userSearchUsersEndpoint);
          });
      });
    });
  });

  describe('Operation related paths', () => {
    const gitUser: IGitUser = {
      login: 'login',
      name: 'name',
      avatar_url: 'avatar_url',
      followers: 1
    };
    const gitResults: IGitSearchResult = {
      incomplete_results: true,
      items: [gitUser]
    };

    let nockScope: nock.Scope;

    before(() => {
      nockScope = nock(gitHubApi);
    });

    after(() => {
      nockScope.done();
      nock.cleanAll();
    });

    it('should perform search', () => {
      nockScope.get(/search\/users/).reply(200, gitResults);
      nockScope.get(/users\/login/).reply(200, gitUser);

      return request(app)
        .post(userSearchUsersEndpoint)
        .set('Accept', 'application/json')
        .send({
          user: 'test',
          language: ['javascript']
        })
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((response) => {
          should(response.body).deepEqual({
            incomplete_results: gitResults.incomplete_results,
            users: [gitUser]
          });
        });
    });

    it('should send error responses properly if supplier throws error', () => {
      nockScope.get(/search\/users/).reply(400, {
        message: 'invalid request'
      });

      return request(app)
        .post(userSearchUsersEndpoint)
        .set('Accept', 'application/json')
        .send({
          user: 'test',
          language: ['javascript']
        })
        .expect('Content-Type', /application\/json/)
        .expect(400)
        .then((response) => {
          should(response.body).deepEqual({
            code: 400,
            message: 'invalid request'
          });
        });
    });

    it('should send error responses properly for invalid response', () => {
      return request(app)
        .post(userSearchUsersEndpoint)
        .set('Accept', 'application/json')
        .send({
          user: 'test'
        })
        .expect('Content-Type', /application\/json/)
        .expect(400)
        .then((response) => {
          should(response.body).deepEqual({
            code: 400,
            message: 'at least language is required'
          });
        });
    });
  });
});
