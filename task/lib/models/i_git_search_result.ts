import { IGitUser } from './i_git_user';

export interface IGitSearchResult {
  readonly incomplete_results: boolean;
  readonly items: IGitUser[];
}
