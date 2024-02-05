const Router = require("express").Router;

const productRouter = Router();
const {
  Products,
  ProductByName,
  AddProduct,
  UpdateProductQuantity,
  DeleteProduct,
  ProductByCode,
} = require("../controllers/Products/ProductController.js");

//PRODUCTS
productRouter.get("/api/products", Products);
productRouter.post("/api/products/search", ProductByName);
productRouter.get("/api/product/detail/code/:code", ProductByCode);
productRouter.post("/api/products", AddProduct);
productRouter.put("/api/products", UpdateProductQuantity);
productRouter.delete("/api/products/:id", DeleteProduct);

module.exports = productRouter;
