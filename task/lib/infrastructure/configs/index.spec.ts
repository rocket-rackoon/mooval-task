import * as should from 'should';

import { Config } from './config';
import { getConfig } from './index';

describe('Infrastructure', () => {
  describe('Configs', () => {
    describe('getConfig', () => {
      it('should return an instance of Config', () => {
        should(getConfig()).instanceOf(Config);
      });
    });
  });
});
