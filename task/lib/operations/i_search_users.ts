import { IGetJson, IValidate, IApiRequest, IApiResponse } from '../models';

/**
 * Search Users operation interface
 *
 * @export
 * @interface ISearchUsers
 */
export interface ISearchUsers {
  search(request: IGetJson<IApiRequest> & IValidate): Promise<IApiResponse>;
}
