const Router = require("express").Router;
const cartRouter = Router();
const {
  PostCartProduct,
  PostCart,
  GetCartId,
} = require("../../handlers/Carts/CartHandler.js");

//CARTS
cartRouter.post("/api/:cartid/product/:productid", PostCartProduct);
cartRouter.post("/api/carts", PostCart);
cartRouter.get("/api/carts/:id", GetCartId);

module.exports = cartRouter;
