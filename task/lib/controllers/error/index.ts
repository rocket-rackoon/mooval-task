import * as express from 'express';
import * as Debug from 'debug';

import { IError } from '../../models';

const debug = Debug('mooval-app-error-handler');

/**
 * Set error handler to the Express app
 *
 * @export
 * @param {express.Application} expressApp
 */
export function setError(expressApp: express.Application): void {
  expressApp.use(
    (
      error: IError,
      req: express.Request,
      res: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction
    ) => {
      debug('getApp error ocurred = %o', error);

      res.status(error.code).send({
        code: error.code,
        message: error.message
      });
    }
  );
}
