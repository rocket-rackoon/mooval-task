import { IGitUser } from './i_git_user';

export interface IApiResponse {
  readonly incomplete_results: boolean;
  readonly users: IGitUser[];
}
