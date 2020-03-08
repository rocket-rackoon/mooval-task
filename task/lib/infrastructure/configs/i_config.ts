export interface IConfig {
  /**
   * Initialize the configuration
   *
   * @param {string} configFilePath
   * @returns {IConfig}
   * @memberof IConfig
   */
  initConfig(configFilePath: string): IConfig;

  /**
   * Get GitHub endpoint
   *
   * @returns {string}
   * @memberof IConfig
   */
  getGitHubApiEndPoint(): string;

  /**
   * Get server port
   *
   * @returns {number}
   * @memberof IConfig
   */
  getServerPort(): number;

  /**
   * Get Github token if set
   *
   * @returns {(string | undefined)}
   * @memberof IConfig
   */
  getGitHubToken(): string | undefined;
}
