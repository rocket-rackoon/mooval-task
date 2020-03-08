import { AxiosInstance } from 'axios';
import * as Debug from 'debug';

import { OperationError } from '../../models';

import { IHttpClient } from './i_http_client';

const debug = Debug('mooval-http-client');

/**
 * HTTP client to handle HTTP requests
 *
 * @export
 * @class HttpClient
 * @implements {IHttpClient}
 */
export class HttpClient implements IHttpClient {
  constructor(private axios: AxiosInstance) {}

  /**
   * Perform HTTP Get request
   *
   * @template HttpResponse
   * @param {string} url
   * @returns {Promise<HttpResponse>}
   * @memberof HttpClient
   */
  async get<HttpResponse>(url: string): Promise<HttpResponse> {
    debug('url = %s', url);

    try {
      const { data } = await this.axios.get<HttpResponse>(url, {
        responseType: 'json'
      });

      debug('response data = %o', data);

      return data;
    } catch (error) {
      if (error.response) {
        debug('response error = %o', error.toJSON());

        throw new OperationError(
          error.response.data.message,
          error.response.status
        );
      }

      debug('response error = %o', error);

      throw new OperationError('Unexpected error', 500);
    }
  }
}
