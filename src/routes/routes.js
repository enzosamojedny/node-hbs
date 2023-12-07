const Router = require("express").Router;
const router = Router();
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../index.js");

//MESSAGES
router.get("/api/messages", GetMessages);
router.get("/api/messages/:id", GetMessagesId);
router.post("/api/messages", PostMessages);
router.put("/api/messages/:id", UpdateMessages);
router.delete("/api/messages/:id", DeleteMessages);

router.get("/", (req, res) => {
  res.render("index.hbs", { title: "Main", isHomePage: true });
});

router.get("/products", (req, res) => {
  try {
    return res.render("products.hbs", { title: "Products", isHomePage: false });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.get("/messages", async (req, res) => {
  try {
    return res.render("chat.hbs", { title: "Messages", isHomePage: false });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

module.exports = router;
