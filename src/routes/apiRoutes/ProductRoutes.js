const Router = require("express").Router;
const productRoutes = Router();
const customCompression = require("../../middlewares/compression.js");
const {
  Products,
  ProductByName,
  AddProduct,
  UpdateProductQuantity,
  DeleteProduct,
  ProductByCode,
} = require("../../controllers/ProductController.js");
const { onlyLoggedApi } = require("../../middlewares/authentication.js");
//PRODUCTS
productRoutes.use(customCompression);
productRoutes.get("/api/products", Products);
productRoutes.post("/api/products/search", ProductByName);
productRoutes.get("/api/product/detail/code/:code", onlyLoggedApi, ProductByCode);
productRoutes.post("/api/products", AddProduct);
productRoutes.put("/api/products", UpdateProductQuantity);
productRoutes.delete("/api/products/:id", DeleteProduct);

module.exports = productRoutes;
