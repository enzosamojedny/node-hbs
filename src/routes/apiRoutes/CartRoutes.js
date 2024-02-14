const Router = require("express").Router;
const cartRoutes = Router();
const customCompression = require("../../middlewares/compression.js");
const {
  PostUserCart,
  PostCart,
  GetCartId,
  TicketByCart,
} = require("../../controllers/CartController.js");
const { onlyLoggedApi } = require("../../middlewares/authentication.js");

//CARTS
cartRoutes.use(customCompression);
cartRoutes.post("/api/carts/usercart", onlyLoggedApi, PostUserCart);
cartRoutes.post("/api/carts", onlyLoggedApi, PostCart);
cartRoutes.get("/api/carts/:id", onlyLoggedApi, GetCartId);
cartRoutes.post("/api/:cid/purchase", onlyLoggedApi, TicketByCart);

module.exports = cartRoutes;
