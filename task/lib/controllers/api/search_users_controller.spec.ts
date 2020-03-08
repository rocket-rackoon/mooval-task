import * as express from 'express';
import * as sinon from 'sinon';
import * as should from 'should';
import * as expressStatic from 'express-serve-static-core';

import { SearchUsers } from '../../operations';
import { IApiResponse, IGetJson, IApiRequest, IValidate } from '../../models';

import { searchUsersController } from './search_users_controller';

describe('Controllers', () => {
  describe('api', () => {
    describe('search users controller', () => {
      let sandBox: sinon.SinonSandbox;
      let postStub: sinon.SinonSpy<
        [expressStatic.PathParams, express.Application],
        express.Router
      >;
      let router: express.Router;

      beforeEach(() => {
        router = express.Router();
        sandBox = sinon.createSandbox();
        postStub = sandBox.spy(router, 'post');
      });

      afterEach(() => {
        sandBox.restore();
      });

      it('should add /user.searchUsers path', () => {
        searchUsersController(
          sandBox.createStubInstance(SearchUsers, {
            search: sinon.stub<
              [IGetJson<IApiRequest> & IValidate],
              Promise<IApiResponse>
            >()
          }),
          router
        );

        should(postStub.args[0][0]).eql('/user.searchUsers');
      });
    });
  });
});
