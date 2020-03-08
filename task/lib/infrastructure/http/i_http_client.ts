export interface IHttpClient {
  /**
   * Perform HTTP Get request
   *
   * @template HttpResponse
   * @param {string} url
   * @returns {Promise<HttpResponse>}
   * @memberof IHttpClient
   */
  get<HttpResponse>(url: string): Promise<HttpResponse>;
}
