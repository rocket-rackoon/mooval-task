import * as express from 'express';

import { def } from './def';
import { docs } from './docs';

/**
 * Get /spec/ router
 *
 * @export
 * @param {express.Router} router
 * @returns {express.Router}
 */
export function getSpec(router: express.Router): express.Router {
  return router.use('/spec/', def(router), docs(router));
}
