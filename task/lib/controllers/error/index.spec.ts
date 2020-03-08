import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { setError } from './index';

describe('Controllers', () => {
  describe('error', () => {
    let sandBox: sinon.SinonSandbox;
    let useStub: sinon.SinonSpy<
      [expressStatic.PathParams, express.Application],
      express.Application
    >;
    let app: express.Application;

    beforeEach(() => {
      app = express();
      sandBox = sinon.createSandbox();
      useStub = sandBox.spy(app, 'use');
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should add error callback', () => {
      setError(app);

      should(useStub.args[0][0]).Function();
    });
  });
});
