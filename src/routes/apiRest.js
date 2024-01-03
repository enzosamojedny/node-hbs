const usersRouter = require("./UsersRoutes");
const sessionRouter = require("./SessionRoutes");
const Router = require("express").Router;

const apiRouter = Router();

apiRouter.use("./api/users");
apiRouter.use("./api/login");
// apiRouter.use("./api/github");
// apiRouter.use("./api/google");
apiRouter.use("./api/session/current");

apiRouter.use((error, req, res, next) => {
  if (error.message.endsWith("not found")) {
    res.status(400).json({});
  }
});
