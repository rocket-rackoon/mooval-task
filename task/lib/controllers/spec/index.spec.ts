import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { getSpec } from './index';

describe('Controllers', () => {
  describe('spec', () => {
    describe('Add controllers to /spec/ endpoint', () => {
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

      it('should add /spec/ path', () => {
        getSpec(router);

        should(useStub.args[0][0]).eql('/spec/');
      });
    });
  });
});
