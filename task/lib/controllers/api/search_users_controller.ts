import * as express from 'express';

import { ISearchUsers } from '../../operations';
import { ApiRequest } from '../../models';

/**
 * Add Search Users Controller to the url path
 *
 * @export
 * @param {ISearchUsers} searchUsers
 * @param {express.Router} router
 * @returns {express.Router}
 */
export function searchUsersController(
  searchUsers: ISearchUsers,
  router: express.Router
): express.Router {
  router.post(
    '/user.searchUsers',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const results = await searchUsers.search(
          new ApiRequest(req.body.user, req.body.language)
        );

        res.status(200).json(results);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
