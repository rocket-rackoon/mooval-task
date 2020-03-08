import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { IConfig } from '../configs';

import { IHttpClient } from './i_http_client';
import { HttpClient } from './http_client';

export * from './i_http_client';

/**
 * Get an instance of Axios
 *
 * @export
 * @param {IConfig} config
 * @returns {AxiosInstance}
 */
export function getAxiosInstance(config: IConfig): AxiosInstance {
  const options: AxiosRequestConfig = {
    timeout: 1000,
    baseURL: config.getGitHubApiEndPoint()
  };

  if (config.getGitHubToken()) {
    options.headers = {
      Authorization: `token ${config.getGitHubToken()}`
    };
  }

  return axios.create(options);
}

/**
 * Get an instance of HTTP client
 *
 * @export
 * @param {IConfig} config
 * @returns {IHttpClient}
 */
export function getHttpClient(config: IConfig): IHttpClient {
  return new HttpClient(getAxiosInstance(config));
}
