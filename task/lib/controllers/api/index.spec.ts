import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { Config } from '../../infrastructure';

import { getApi } from './index';

describe('Controllers', () => {
  describe('api', () => {
    describe('Add controllers to /api/ endpoint', () => {
      let sandBox: sinon.SinonSandbox;
      let useStub: sinon.SinonSpy<
        [expressStatic.PathParams, express.Application],
        express.Router
      >;
      let router: express.Router;

      beforeEach(() => {
        router = express.Router();
        sandBox = sinon.createSandbox();
        useStub = sandBox.spy(router, 'use');
      });

      afterEach(() => {
        sandBox.restore();
      });

      it('should add /api/ path', () => {
        getApi(sandBox.createStubInstance(Config), router);

        should(useStub.args[0][0]).eql('/api/');
      });
    });
  });
});
