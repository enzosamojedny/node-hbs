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
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../index.js");

//PRODUCTS
router.get("/products", Products);
router.get("/products/:id", ProductId);
router.post("/products", AddProduct);
router.put("/products/:id", UpdateProduct);
router.delete("/products/:id", DeleteProduct);

//CARTS
router.post("/api/:cartid/product/:productid", PostCartProduct);
router.post("/api/carts", PostCart);
router.get("/api/carts/:id", GetCartId);

//MESSAGES
router.get("/api/messages", GetMessages);
router.get("/api/messages/:id", GetMessagesId);
router.post("/api/messages", PostMessages);
router.put("/api/messages/:id", UpdateMessages);
router.delete("/api/messages/:id", DeleteMessages);

router.get("/", (req, res) => {
  res.render("home.hbs", { title: "Main" });
});

router.get("/api/realtimeproducts", (req, res) => {
  res.render("realTimeProducts.hbs", { title: "realTimeProducts" });
});
router.get("/messages", (req, res) => {
  res.render("chat.hbs", { title: "Handlebars Chat" });
});

module.exports = router;
