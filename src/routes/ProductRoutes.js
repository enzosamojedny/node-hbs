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

productRouter.post("/api/products", AddProduct);
productRouter.put("/api/products/:id", UpdateProduct);
productRouter.delete("/api/products/:id", DeleteProduct);

productRouter.get("/", (req, res) => {
  res.redirect("/products");
});

productRouter.get("/products", (req, res) => {
  const userToken = req.user;
  res.render("products.hbs", {
    title: "Alus | Products",
    isHomePage: false,
    userToken: userToken || null,
  });
});
// decryptUserFromToken, IT IS BROKEN FOR NOW
productRouter.get("/api/product/detail/code/:code", ProductByCode);
productRouter.get("/product/detail/code/:code", (req, res) => {
  const userToken = req.user;
  res.render("productDetail.hbs", {
    title: "Alus | Product Detail",
    isHomePage: false,
    userToken: userToken || null,
  });
});

module.exports = productRouter;
