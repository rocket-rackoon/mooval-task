import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Debug from 'debug';
import * as express from 'express';

import * as controllers from '../controllers';
import { IConfig } from '../infrastructure';

const debug = Debug('mooval-app');

/**
 * Get complete Express application with routers configured
 *
 * @export
 * @param {IConfig} config
 * @returns {express.Application}
 */
export function getApp(config: IConfig): express.Application {
  const app = express();

  app.use(cors());
  debug('added cors');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  debug('added body parser');

  app.use(controllers.getApi(config, express.Router()));
  debug('added api');

  app.use(controllers.getSpec(express.Router()));
  debug('added spec');

  controllers.setError(app);
  debug('added error handler');

  return app;
}
