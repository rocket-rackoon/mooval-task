import * as qs from 'querystring';

import * as sinon from 'sinon';
import * as should from 'should';

import { IHttpClient } from '../http';
import { IGitUser, IGitSearchResult, IApiRequest } from '../../models';

import { GitClient } from './git_client';

function getHttpClient(): IHttpClient {
  const getGetStub = sinon.stub();

  return {
    get: getGetStub
  };
}

describe('Infrastructure', () => {
  describe('GitClient', () => {
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
    const request: IApiRequest = {
      user: 'test',
      language: ['lang1', 'lang2']
    };

    let httpClient: IHttpClient;
    let getStub: sinon.SinonStub;
    let gitClient: GitClient;

    beforeEach(() => {
      httpClient = getHttpClient();
      getStub = httpClient.get as sinon.SinonStub;

      // fake HTTP calls
      getStub.onCall(0).resolves(gitResults);
      getStub.onCall(1).resolves(gitUser as Partial<IGitUser>);

      // Git client
      gitClient = new GitClient(httpClient);
    });

    it('should send results', async () => {
      const result = await gitClient.getSearUsersResults({
        user: 'test',
        language: ['lang']
      });

      should(result).deepEqual({
        incomplete_results: gitResults.incomplete_results,
        users: [gitUser]
      });
    });

    it('should send empty results if no users found', async () => {
      getStub.onCall(0).resolves({
        incomplete_results: true,
        items: []
      });

      const result = await gitClient.getSearUsersResults({
        user: 'test',
        language: ['lang']
      });

      should(result).deepEqual({
        incomplete_results: gitResults.incomplete_results,
        users: []
      });
    });

    it('should call "/search/users" api properly', async () => {
      await gitClient.getSearUsersResults(request);

      const decodedStr = qs.unescape(getStub.getCall(0).args[0]);
      should(decodedStr).eql(
        `/search/users?q=${request.user} in:login+language:${request.language[0]}+language:${request.language[1]}`
      );
    });

    it('should call "/users/" api properly', async () => {
      await gitClient.getSearUsersResults(request);

      const decodedStr = qs.unescape(getStub.getCall(1).args[0]);
      should(decodedStr).eql(`/users/${gitUser.login}`);
    });

    describe('Response validation', () => {
      async function testCase(
        gitUser1: Partial<IGitUser>,
        gitUser2: Partial<IGitUser>
      ): Promise<void> {
        getStub.onCall(0).resolves({
          incomplete_results: true,
          items: [gitUser1, gitUser2]
        });
        getStub.onCall(1).resolves(gitUser1);
        getStub.onCall(2).resolves(gitUser2);

        const result = await gitClient.getSearUsersResults(request);
        should(result).deepEqual({
          incomplete_results: true,
          users: [gitUser1]
        });
      }

      it('should filter out users if "login" is not set', async () => {
        await testCase(gitUser, {
          name: 'name',
          avatar_url: 'avatar_url',
          followers: 1
        });
      });

      it('should filter out users if "name" is not set', async () => {
        await testCase(gitUser, {
          login: 'login',
          avatar_url: 'avatar_url',
          followers: 1
        });
      });

      it('should filter out users if "avatar_url" is not set', async () => {
        await testCase(gitUser, {
          login: 'login',
          name: 'name',
          followers: 1
        });
      });

      it('should filter out users if "followers" is not set', async () => {
        await testCase(gitUser, {
          login: 'login',
          name: 'name',
          avatar_url: 'avatar_url'
        });
      });

      it('should not filter out users if "follower" are 0', async () => {
        await testCase(
          {
            login: 'login',
            name: 'name',
            avatar_url: 'avatar_url',
            followers: 0
          },
          {
            login: 'login',
            name: 'name'
          }
        );
      });
    });
  });
});
