const Router = require("express").Router;
const cartRouter = Router();
const {
  PostCartProduct,
  PostCart,
  GetCartId,
} = require("../../src/controllers/Carts/CartController.js");

//CARTS
cartRouter.post("/api/:cartid/product/:productid", PostCartProduct);
cartRouter.post("/api/carts", PostCart);
cartRouter.get("/api/carts/:id", GetCartId);

cartRouter.get("/cart", (req, res) => {
  res.render("cart.hbs", { title: "Alus | Cart", isHomePage: false });
});
module.exports = cartRouter;
