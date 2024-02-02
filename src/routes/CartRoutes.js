const Router = require("express").Router;
const cartRouter = Router();
const {
  PostUserCart,
  PostCart,
  GetCartId,
  //!
  // faltan muchas rutas
} = require("../../src/controllers/Carts/CartController.js");

//CARTS
cartRouter.post("/api/carts/usercart", PostUserCart);
cartRouter.post("/api/carts", PostCart);
cartRouter.get("/api/carts/:id", GetCartId);

cartRouter.get("/cart", (req, res) => {
  const userToken = req.user;
  res.render("cart.hbs", {
    title: "Alus | Cart",
    isHomePage: false,
    userToken: userToken || null,
  });
});
module.exports = cartRouter;
