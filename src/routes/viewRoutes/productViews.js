const Router = require("express").Router;
const productViewsRouter = Router();

productViewsRouter.get("/", (req, res) => {
  res.redirect("/products");
});

productViewsRouter.get("/products", (req, res) => {
  const userToken = req.user;
  res.render("products.hbs", {
    title: "Alus | Products",
    isHomePage: false,
    userToken: userToken || null,
  });
});

productViewsRouter.get("/product/detail/code/:code", (req, res) => {
  if (req.user) {
    const userToken = req.user;
    res.render("productDetail.hbs", {
      title: "Alus | Product Detail",
      isHomePage: false,
      userToken: userToken || null,
    });
  } else {
    res.redirect("/login");
  }
});
module.exports = productViewsRouter;
