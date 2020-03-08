import { IConfig } from '../configs';
import { getHttpClient } from '../http';
import { GitClient } from './git_client';
import { IGitClient } from './i_git_client';

export { IGitClient, GitClient };

/**
 * Get an instance of Git client
 *
 * @export
 * @param {IConfig} config
 * @returns {IGitClient}
 */
export function getGitClient(config: IConfig): IGitClient {
  return new GitClient(getHttpClient(config));
}
