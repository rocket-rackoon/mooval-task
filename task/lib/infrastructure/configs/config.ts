import * as dotenv from 'dotenv';
import * as Debug from 'debug';

import { InvalidConfiguration } from '../../models';

import { IConfig } from './i_config';

const debug = Debug('mooval-config');

/**
 * Configuration handler
 *
 * @export
 * @class Config
 * @implements {IConfig}
 */
export class Config implements IConfig {
  /**
   * Initialize the configuration
   *
   * @param {string} configFilePath
   * @returns {IConfig}
   * @memberof Config
   */
  initConfig(configFilePath: string): IConfig {
    debug('path = %s', configFilePath);
    dotenv.config({ path: configFilePath });

    return this;
  }

  /**
   * Get GitHub endpoint
   *
   * @returns {string}
   * @memberof Config
   */
  getGitHubApiEndPoint(): string {
    const gitHubEndpoint = process.env['github_endpoint'] as string;

    debug('github_endpoint = %s', gitHubEndpoint);

    if (!gitHubEndpoint) {
      throw new InvalidConfiguration('missing Github endpoint');
    }

    return gitHubEndpoint;
  }

  /**
   * Get server port
   *
   * @returns {number}
   * @memberof Config
   */
  getServerPort(): number {
    const serverPort = parseInt(process.env['server_port'] as string, 10);

    debug('server_port = %s', serverPort);

    if (Number.isNaN(serverPort) || serverPort < 0) {
      throw new InvalidConfiguration('invalid server port');
    }

    return serverPort;
  }

  /**
   * Get Github token if set
   *
   * @returns {(string | undefined)}
   * @memberof Config
   */
  getGitHubToken(): string | undefined {
    const gitHubToken = process.env['github_token'] as string;

    debug('github_token = %s', gitHubToken ? 'set' : 'not set');

    return gitHubToken;
  }
}
