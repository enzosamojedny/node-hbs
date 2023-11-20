const Router = require("express").Router;
const router = Router();
const {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  PostCart,
  GetCartId,
  PostCartProduct,
} = require("../../index.js");

router.post("/api/:cartid/product/:productid", PostCartProduct);
router.get("/products", Products);
router.get("/products/:id", ProductId);
router.post("/products", AddProduct);
router.put("/products/:id", UpdateProduct);
router.delete("/products/:id", DeleteProduct);
router.post("/api/carts", PostCart);
router.get("/api/carts/:id", GetCartId);

router.get("/", (req, res) => {
  res.render("home.hbs", { title: "Main" });
});

router.get("/api/realtimeproducts", (req, res) => {
  res.render("realTimeProducts.hbs", { title: "realTimeProducts" });
});

module.exports = router;
