const Router = require("express").Router;
const router = Router();
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../index.js");
const {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../../handlers/Products/ProductHandler.js");
const {
  PostCartProduct,
  PostCart,
  GetCartId,
} = require("../../handlers/Carts/CartHandler.js");

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
router.get("/messages", async (req, res) => {
  try {
    return res.render("chat.hbs", { title: "Handlebars chat" });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

module.exports = router;
