import * as path from 'path';

import { getApp, getConfig } from './lib';

const config = getConfig().initConfig(path.resolve(process.cwd(), '.env'));

getApp(config).listen(config.getServerPort(), () => {
  console.log('started in port %s', config.getServerPort());
});
