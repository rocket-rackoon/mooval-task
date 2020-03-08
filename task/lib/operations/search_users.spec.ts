import * as sinon from 'sinon';
import * as should from 'should';

import { GitClient } from '../infrastructure';
import {
  IApiResponse,
  IApiRequest,
  ApiRequest,
  IGitUser,
  InvalidRequest
} from '../models';

import { SearchUsers } from './search_users';

describe('Operations', () => {
  describe('SearchUsers', () => {
    let gitClientSearUsersResults: sinon.SinonStub<
      [IApiRequest],
      Promise<IApiResponse>
    >;
    let searchUsers: SearchUsers;

    beforeEach(() => {
      gitClientSearUsersResults = sinon.stub<
        [IApiRequest],
        Promise<IApiResponse>
      >();
      searchUsers = new SearchUsers(
        sinon.createStubInstance(GitClient, {
          getSearUsersResults: gitClientSearUsersResults
        })
      );
    });

    it('should send results', async () => {
      const gitUser: IGitUser = {
        login: 'login',
        name: 'name',
        avatar_url: 'avatar_url',
        followers: 1
      };
      const requestParams: IApiRequest = {
        user: 'user',
        language: ['lang1']
      };
      const gitResponse: IApiResponse = {
        incomplete_results: true,
        users: [gitUser]
      };

      gitClientSearUsersResults.resolves(gitResponse);

      const request = new ApiRequest(
        requestParams.user,
        requestParams.language
      );

      const results = await searchUsers.search(request);

      should(results).deepEqual(gitResponse);
    });

    it('should throw InvalidRequest for invalid request', async () => {
      const request = new ApiRequest('', []);

      should(request.isValid()).false();

      await should(searchUsers.search(request)).rejectedWith(
        new InvalidRequest(request.getValidationErrors().join('\n'))
      );
    });
  });
});
