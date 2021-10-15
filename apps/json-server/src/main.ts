import * as jsonServer from 'json-server';
import { join } from 'path';

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'assets', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);
server.use(router);
server.listen(3333, () => {
  console.log('JSON Server is running in http://localhost:3333/api');
});
