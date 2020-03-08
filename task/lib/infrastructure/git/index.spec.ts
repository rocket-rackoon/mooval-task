import * as should from 'should';

import { getConfig } from '../configs';

import { getGitClient } from './index';
import { GitClient } from './git_client';

describe('Infrastructure', () => {
  describe('GitClient', () => {
    describe('getGitClient', () => {
      beforeEach(() => {
        process.env['github_endpoint'] = 'http://gh';
      });

      it('should return an instance of GitClient', () => {
        should(getGitClient(getConfig())).instanceOf(GitClient);
      });
    });
  });
});
