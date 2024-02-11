const Router = require("express").Router;
const cartViewsRouter = Router();

cartViewsRouter.get("/cart", (req, res) => {
  if (req.user) {
    const userToken = req.user;
    res.render("cart.hbs", {
      title: "Alus | Cart",
      isHomePage: false,
      userToken: userToken || null,
    });
  } else {
    res.redirect("/login");
  }
});
module.exports = cartViewsRouter;
