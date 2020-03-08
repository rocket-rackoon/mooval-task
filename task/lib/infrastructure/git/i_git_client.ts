import { IApiResponse, IApiRequest } from '../../models';

export interface IGitClient {
  /**
   * Get search result
   *
   * @param {IApiRequest} request
   * @returns {Promise<IApiResponse>}
   * @memberof IGitClient
   */
  getResults(request: IApiRequest): Promise<IApiResponse>;
}
