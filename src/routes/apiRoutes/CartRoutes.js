const Router = require("express").Router;
const cartRoutes = Router();
const {
  PostUserCart,
  PostCart,
  GetCartId,
  TicketByCart,
} = require("../../controllers/CartController.js");

//CARTS
cartRoutes.post("/api/carts/usercart", PostUserCart);
cartRoutes.post("/api/carts", PostCart);
cartRoutes.get("/api/carts/:id", GetCartId);
cartRoutes.post("/api/:cid/purchase", TicketByCart); //! cart purchase, ticket generated

module.exports = cartRoutes;
