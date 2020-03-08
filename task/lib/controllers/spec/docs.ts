import * as express from 'express';

const template = `<!DOCTYPE html>
<html>
  <head>
    <title>ReDoc</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style> body { margin: 0; padding: 0; } </style>
  </head>
  <body>
    <redoc spec-url='/spec/def'></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"> </script>
  </body>
</html>`;

/**
 * Add "ReDocs" to the app in order to render the swagger spec properly
 *
 * @export
 * @param {express.Router} router
 * @returns {express.Router}
 */
export function docs(router: express.Router): express.Router {
  router.get('/docs', async (req: express.Request, res: express.Response) =>
    res.send(template)
  );

  return router;
}
