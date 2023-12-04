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
