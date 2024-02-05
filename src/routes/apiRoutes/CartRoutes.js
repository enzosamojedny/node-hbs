const Router = require("express").Router;
const cartRouter = Router();
const {
  PostUserCart,
  PostCart,
  GetCartId,
  TicketByCart,
} = require("../../controllers/Carts/CartController.js");

//CARTS
cartRouter.post("/api/carts/usercart", PostUserCart);
cartRouter.post("/api/carts", PostCart);
cartRouter.get("/api/carts/:id", GetCartId);
cartRouter.post("/api/:cid/purchase", TicketByCart); //! cart purchase, ticket generated

module.exports = cartRouter;
