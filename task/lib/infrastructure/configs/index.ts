import { Config } from './config';
import { IConfig } from './i_config';

export { Config, IConfig };
/**
 * Get an instance of configuration library
 *
 * @export
 * @returns {IConfig}
 */
export function getConfig(): IConfig {
  return new Config();
}
