const Router = require("express").Router;

const productRoutes = Router();
const {
  Products,
  ProductByName,
  AddProduct,
  UpdateProductQuantity,
  DeleteProduct,
  ProductByCode,
} = require("../../controllers/ProductController.js");

//PRODUCTS
productRoutes.get("/api/products", Products);
productRoutes.post("/api/products/search", ProductByName);
productRoutes.get("/api/product/detail/code/:code", ProductByCode);
productRoutes.post("/api/products", AddProduct);
productRoutes.put("/api/products", UpdateProductQuantity);
productRoutes.delete("/api/products/:id", DeleteProduct);

module.exports = productRoutes;
