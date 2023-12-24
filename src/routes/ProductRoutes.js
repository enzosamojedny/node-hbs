const Router = require("express").Router;

const productRouter = Router();
const {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../../handlers/Products/ProductHandler.js");

//PRODUCTS
productRouter.get("/api/products", Products);
productRouter.get("/api/products/:id", ProductId);
productRouter.post("/api/products", AddProduct);
productRouter.put("/api/products/:id", UpdateProduct);
productRouter.delete("/api/products/:id", DeleteProduct);

productRouter.get("/", (req, res) => {
  res.redirect("/products");
});

productRouter.get("/products", (req, res) => {
  res.render("products.hbs", { title: "Products", isHomePage: false });
});

module.exports = productRouter;
