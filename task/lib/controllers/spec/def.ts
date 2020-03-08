import * as express from 'express';

import * as apiJson from './api.json';

/**
 * Add Swagger definition to the app
 *
 * @export
 * @param {express.Router} router
 * @returns {express.Router}
 */
export function def(router: express.Router): express.Router {
  router.get('/def', async (req: express.Request, res: express.Response) =>
    res.status(200).json(apiJson)
  );

  return router;
}
