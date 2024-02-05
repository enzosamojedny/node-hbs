const Router = require("express").Router;
const apiRouter = Router();
//! VIEWS
const userViewsRouter = require("./viewRoutes/userViews");
const productViewsRouter = require("./viewRoutes/productViews");
const messageViewsRouter = require("./viewRoutes/messageViews");
const cartViewsRouter = require("./viewRoutes/cartViews");
//! API
const cartRouter = require("./apiRoutes/CartRoutes");
const productRouter = require("./apiRoutes/ProductRoutes");
const usersRouter = require("./apiRoutes/UsersRoutes");
const messagesRouter = require("./apiRoutes/MessagesRoutes");

apiRouter.use(
  cartRouter,
  productRouter,
  usersRouter,
  messagesRouter,
  userViewsRouter,
  productViewsRouter,
  messageViewsRouter,
  cartViewsRouter
);

module.exports = apiRouter;
