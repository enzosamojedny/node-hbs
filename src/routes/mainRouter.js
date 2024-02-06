const Router = require("express").Router;
const mainRouter = Router();

//! API
const cartRoutes = require("./apiRoutes/CartRoutes");
const productRoutes = require("./apiRoutes/ProductRoutes");
const usersRoutes = require("./apiRoutes/UsersRoutes");
const messagesRoutes = require("./apiRoutes/MessagesRoutes");
const sessionRoutes = require("./apiRoutes/SessionRoutes");
const ticketRoutes = require("./apiRoutes/TicketRoutes");
//! VIEWS
const userViewsRouter = require("./viewRoutes/userViews");
const productViewsRouter = require("./viewRoutes/productViews");
const messageViewsRouter = require("./viewRoutes/messageViews");
const cartViewsRouter = require("./viewRoutes/cartViews");
const ticketViewsRouter = require("./viewRoutes/ticketViews");

mainRouter.use(
  sessionRoutes,
  cartRoutes,
  ticketRoutes,
  productRoutes,
  usersRoutes,
  messagesRoutes,
  userViewsRouter,
  productViewsRouter,
  messageViewsRouter,
  cartViewsRouter,
  ticketViewsRouter
);

module.exports = mainRouter;
