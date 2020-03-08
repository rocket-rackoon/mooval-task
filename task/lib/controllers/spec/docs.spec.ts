import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { docs } from './docs';

describe('Controllers', () => {
  describe('spec', () => {
    describe('ReDoc interface controller', () => {
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

      it('should add /docs path', () => {
        docs(router);

        should(getStub.args[0][0]).eql('/docs');
      });
    });
  });
});
