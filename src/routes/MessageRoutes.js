const Router = require("express").Router;
const messagesRouter = Router();
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../handlers/Messages/MessageHandler.js");

//MESSAGES
messagesRouter.get("/api/messages", GetMessages);
messagesRouter.get("/api/messages/:id", GetMessagesId);
messagesRouter.post("/api/messages", PostMessages);
messagesRouter.put("/api/messages/:id", UpdateMessages);
messagesRouter.delete("/api/messages/:id", DeleteMessages);

messagesRouter.get("/", (req, res) => {
  res.render("index.hbs", { title: "Main", isHomePage: true });
});

messagesRouter.get("/products", (req, res) => {
  try {
    return res.render("products.hbs", { title: "Products", isHomePage: false });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

messagesRouter.get("/messages", async (req, res) => {
  try {
    return res.render("chat.hbs", { title: "Messages", isHomePage: false });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

module.exports = messagesRouter;
