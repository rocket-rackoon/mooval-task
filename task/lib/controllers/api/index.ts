import * as express from 'express';

import { getSearchUsers } from '../../operations';
import { IConfig, getGitClient } from '../../infrastructure';

import { searchUsersController } from './search_users_controller';

/**
 * Add /api/ router
 *
 * @export
 * @param {IConfig} config
 * @param {express.Router} router
 * @returns {express.Router}
 */
export function getApi(
  config: IConfig,
  router: express.Router
): express.Router {
  return router.use(
    '/api/',
    searchUsersController(getSearchUsers(getGitClient(config)), router)
  );
}
