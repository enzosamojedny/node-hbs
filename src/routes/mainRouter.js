const Router = require("express").Router;
const mainRouter = Router();

//! API
const cartRouter = require("./apiRoutes/CartRoutes");
const productRouter = require("./apiRoutes/ProductRoutes");
const usersRouter = require("./apiRoutes/UsersRoutes");
const messagesRouter = require("./apiRoutes/MessagesRoutes");
const sessionRouter = require("./apiRoutes/SessionRoutes");

//! VIEWS
const userViewsRouter = require("./viewRoutes/userViews");
const productViewsRouter = require("./viewRoutes/productViews");
const messageViewsRouter = require("./viewRoutes/messageViews");
const cartViewsRouter = require("./viewRoutes/cartViews");

mainRouter.use(
  sessionRouter,
  cartRouter,
  productRouter,
  usersRouter,
  messagesRouter,
  userViewsRouter,
  productViewsRouter,
  messageViewsRouter,
  cartViewsRouter
);

module.exports = mainRouter;
