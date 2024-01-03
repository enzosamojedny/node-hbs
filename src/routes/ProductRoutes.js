const Router = require("express").Router;

const productRouter = Router();
const {
  Products,
  ProductByName,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../../handlers/Products/ProductHandler.js");

//PRODUCTS
productRouter.get("/api/products", Products);
productRouter.post("/api/products/search", ProductByName);
//! hacer un POST a api/products por body con el name y buscar coincidencias en la DB
//! usar query para entrar a cada product detail usando su CODE
productRouter.post("/api/products", AddProduct);
productRouter.put("/api/products/:id", UpdateProduct);
productRouter.delete("/api/products/:id", DeleteProduct);

productRouter.get("/", (req, res) => {
  res.redirect("/products");
});

productRouter.get("/products", (req, res) => {
  res.render("products.hbs", { title: "Alus | Products", isHomePage: false });
});

module.exports = productRouter;
