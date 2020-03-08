import * as Debug from 'debug';

import {
  IGetJson,
  IValidate,
  IApiRequest,
  InvalidRequest,
  IApiResponse
} from '../models';
import { IGitClient } from '../infrastructure';

import { ISearchUsers } from './i_search_users';

const debug = Debug('mooval-operations-search-users');

/**
 * Search User operation
 *
 * @export
 * @class SearchUsers
 * @implements {ISearchUsers}
 */
export class SearchUsers implements ISearchUsers {
  constructor(private readonly gitClient: IGitClient) {}

  /**
   * Execute search
   *
   * @param {(IGetJson<IApiRequest> & IValidate)} request
   * @returns {Promise<IApiResponse>}
   * @memberof SearchUsers
   */
  async search(
    request: IGetJson<IApiRequest> & IValidate
  ): Promise<IApiResponse> {
    debug('request = %o', request);

    if (!request.isValid()) {
      throw new InvalidRequest(request.getValidationErrors().join('\n'));
    }

    return this.gitClient.getResults(request.getJson());
  }
}
