import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
  "/api/tasks": "/tasks",
  "/api/users": "/users"
}));

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('🚀 JSON Server corriendo en http://localhost:3000');
});