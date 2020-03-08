import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { def } from './def';

describe('Controllers', () => {
  describe('spec', () => {
    describe('API definition controller', () => {
      let sandBox: sinon.SinonSandbox;
      let getStub: sinon.SinonSpy<
        [expressStatic.PathParams, express.Application],
        express.Router
      >;
      let router: express.Router;

      beforeEach(() => {
        router = express.Router();
        sandBox = sinon.createSandbox();
        getStub = sandBox.spy(router, 'get');
      });

      afterEach(() => {
        sandBox.restore();
      });

      it('should add /def path', () => {
        def(router);

        should(getStub.args[0][0]).eql('/def');
      });
    });
  });
});
