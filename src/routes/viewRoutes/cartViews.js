const Router = require("express").Router;
const cartViewsRouter = Router();

cartViewsRouter.get("/cart", (req, res) => {
  const userToken = req.user;
  res.render("cart.hbs", {
    title: "Alus | Cart",
    isHomePage: false,
    userToken: userToken || null,
  });
});
module.exports = cartViewsRouter;
