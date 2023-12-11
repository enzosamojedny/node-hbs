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

productRouter.get("/products", (req, res) => {
  res.render("products.hbs", { title: "Products", isHomePage: false });
});

// productRouter.get("/products/:page", async (req, res) => {
//   const page = req.params.page;
//   const response = await fetch(`/api/products?page=${page}&limit=10&sort=asc`);
//   const data = await response.json();
//   res.render("products.hbs", {
//     title: "Products",
//     isHomePage: false,
//     products: data.payload,
//   });
// });

module.exports = productRouter;
