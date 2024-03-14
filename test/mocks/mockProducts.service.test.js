const { Router } = require("express");
const mockProduct = Router();
const generateProduct = require("../mocks/generators/productGenerator.service");

mockProduct.get("/mockingproducts", (req, res, next) => {
  const productsArray = generateProduct();
  res.json(productsArray);
});

mockProduct.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

module.exports = mockProduct;
