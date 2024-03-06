const { faker } = require("@faker-js/faker");
const { Router } = require("express");
const mockApp = Router();

mockApp.get("/mockingproducts", (req, res, next) => {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      try {
        const id = crypto.randomUUID();
        const name = faker.commerce.product();
        const price = faker.commerce.price();
        const description = faker.commerce.productDescription();
        if (id && name && price && description) {
          products.push({
            id,
            name,
            price,
            description,
          });
        } else {
          console.error(`Error generating product at index ${i}`);
        }
      } catch (error) {
        console.error("Error generating product:", error);
      }
    }
    if (products.length === 0) {
      throw new Error("Unable to generate any products.");
    }
    res.json(products);
  } catch (error) {
    console.error("Critical error generating mocking products:", error);
    res.status(500).json({
      error: "Critical error encountered while generating mocking products.",
    });
  }
});
const errorDictionary = {
  productCreationError: "Error al crear el producto.",
  addToCartError: "Error al agregar el producto al carrito.",
};

function errorHandler(errorCode, res) {
  const errorMessage = errorDictionary[errorCode] || "Error desconocido.";
  res.status(500).json({ error: errorMessage });
}
mockApp.get("/simulateError", (req, res, next) => {
  const errorCode = req.query.errorCode;
  if (!errorCode) {
    return next(new Error("Código de error no proporcionado."));
  }
  errorHandler(errorCode, res);
});

mockApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

module.exports = mockApp;
