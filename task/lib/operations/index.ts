import { IGitClient } from '../infrastructure';

import { SearchUsers } from './search_users';
import { ISearchUsers } from './i_search_users';

export { SearchUsers, ISearchUsers };
/**
 * Get an instance of Search User operation
 *
 * @export
 * @param {IGitClient} gitClient
 * @returns {SearchUsers}
 */
export function getSearchUsers(gitClient: IGitClient): ISearchUsers {
  return new SearchUsers(gitClient);
}
