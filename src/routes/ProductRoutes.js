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
productRouter.get("/products", Products);
productRouter.get("/products/:id", ProductId);
productRouter.post("/products", AddProduct);
productRouter.put("/products/:id", UpdateProduct);
productRouter.delete("/products/:id", DeleteProduct);

module.exports = productRouter;
