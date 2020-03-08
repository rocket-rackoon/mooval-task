import * as should from 'should';

import { getGitClient, getConfig } from '../infrastructure';

import { getSearchUsers } from './index';
import { SearchUsers } from './search_users';

describe('Operations', () => {
  describe('SearchUsers', () => {
    describe('getGitClient', () => {
      it('should return an instance of SearchUsers', () => {
        should(getSearchUsers(getGitClient(getConfig()))).instanceOf(
          SearchUsers
        );
      });
    });
  });
});
