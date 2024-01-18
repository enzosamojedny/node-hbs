const Router = require("express").Router;

const productRouter = Router();
const {
  Products,
  ProductByName,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  ProductByCode,
} = require("../../src/controllers/Products/ProductController.js");

//PRODUCTS
productRouter.get("/api/products", Products);
productRouter.post("/api/products/search", ProductByName);
productRouter.get("/api/product/detail/code/:code", ProductByCode);
//! usar query para entrar a cada product detail usando su CODE
productRouter.post("/api/products", AddProduct);
productRouter.put("/api/products/:id", UpdateProduct);
productRouter.delete("/api/products/:id", DeleteProduct);

productRouter.get("/", (req, res) => {
  // res.render("home", { title: "My Page Title", navbar: "navbar" });
  res.redirect("/products");
});

productRouter.get("/products", (req, res) => {
  res.render("products.hbs", { title: "Alus | Products", isHomePage: false });
});
productRouter.get("/product/detail/code/:code", (req, res) => {
  res.render("productDetail.hbs", {
    title: "Alus | Product Detail",
    isHomePage: false,
  });
});

module.exports = productRouter;
