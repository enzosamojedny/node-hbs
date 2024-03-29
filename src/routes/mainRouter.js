const Router = require("express").Router;
const mainRouter = Router();

//! API
const cartRoutes = require("./apiRoutes/CartRoutes");
const productRoutes = require("./apiRoutes/ProductRoutes");
const usersRoutes = require("./apiRoutes/UsersRoutes");
const messagesRoutes = require("./apiRoutes/MessagesRoutes");
const sessionRoutes = require("./apiRoutes/SessionRoutes");
//! VIEWS
const userViewsRouter = require("./viewRoutes/userViews");
const productViewsRouter = require("./viewRoutes/productViews");
const messageViewsRouter = require("./viewRoutes/messageViews");
const cartViewsRouter = require("./viewRoutes/cartViews");
const ticketViewsRouter = require("./viewRoutes/ticketViews");
const mockProduct = require("../../test/mocks/mockProductsRoutes.service");
const mockUser = require("../../test/mocks/mockUsersRoutes.service");
const documentationRouter = require("../routes/apiRoutes/Documentation");

mainRouter.use(
  mockProduct,
  mockUser,
  sessionRoutes,
  cartRoutes,
  productRoutes,
  usersRoutes,
  messagesRoutes,
  userViewsRouter,
  productViewsRouter,
  messageViewsRouter,
  cartViewsRouter,
  ticketViewsRouter,
  documentationRouter
);
module.exports = mainRouter;
