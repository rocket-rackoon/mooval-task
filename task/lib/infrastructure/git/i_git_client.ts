import { IApiResponse, IApiRequest } from '../../models';

export interface IGitClient {
  /**
   * Get search result for user search
   *
   * @param {IApiRequest} request
   * @returns {Promise<IApiResponse>}
   * @memberof IGitClient
   */
  getSearUsersResults(request: IApiRequest): Promise<IApiResponse>;
}
