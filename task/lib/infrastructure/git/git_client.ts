import * as Debug from 'debug';

import {
  IApiResponse,
  IApiRequest,
  IGitUser,
  IGitSearchResult
} from '../../models';
import { IHttpClient } from '../http';

import { IGitClient } from './i_git_client';

const debug = Debug('mooval-git-client');

/**
 * Git Client
 *
 * @export
 * @class GitClient
 * @implements {IGitClient}
 */
export class GitClient implements IGitClient {
  constructor(private readonly client: IHttpClient) {}

  /**
   * Get search result
   *
   * @param {IApiRequest} request
   * @returns {Promise<IApiResponse>}
   * @memberof GitClient
   */
  async getResults(request: IApiRequest): Promise<IApiResponse> {
    debug('getResults request = %o', request);

    const searchResults = await this.searchUsers(request);

    debug('getResults search results = %o', searchResults);

    const fetchedUsers = await Promise.all(
      searchResults.items.map((result) => this.fetchProfile(result.login))
    );

    debug('getResults fetched users = %o', fetchedUsers);

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      incomplete_results: searchResults.incomplete_results,
      users: fetchedUsers.filter(
        (fetchedUser: Partial<IGitUser>) =>
          fetchedUser.login &&
          fetchedUser.name &&
          fetchedUser.avatar_url &&
          fetchedUser.followers !== undefined
      ) as IGitUser[]
    };
  }

  /**
   * Search users based on the request
   *
   * @private
   * @param {IApiRequest} request
   * @returns {Promise<IGitSearchResult>}
   * @memberof GitClient
   */
  private async searchUsers(request: IApiRequest): Promise<IGitSearchResult> {
    const endpoint = '/search/users?q=';

    const language = request.language.map((l) => `language:${l}`).join('+');
    const encodedUrl = encodeURIComponent(
      `${request.user} in:login+${language}`
    );
    const query = `${endpoint}${encodedUrl}`;

    debug('searchUsers request = %o', request);
    debug('searchUsers built query = %o', query);

    return this.client.get<IGitSearchResult>(query);
  }

  /**
   * Fetch a single profile
   *
   * @private
   * @param {string} loginName
   * @returns {Promise<Partial<IGitUser>>}
   * @memberof GitClient
   */
  private async fetchProfile(loginName: string): Promise<Partial<IGitUser>> {
    const endpoint = '/users/';

    const query = `${endpoint}${loginName}`;

    debug('fetchProfile loginName = %o', loginName);
    debug('fetchProfile built query = %o', query);

    const { login, name, avatar_url, followers } = await this.client.get<
      Partial<IGitUser>
    >(query);

    return {
      login,
      name,
      avatar_url,
      followers
    };
  }
}
