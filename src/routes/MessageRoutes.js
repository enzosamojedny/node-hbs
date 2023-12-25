const Router = require("express").Router;
const messagesRouter = Router();
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../handlers/Messages/MessageHandler");

//MESSAGES
messagesRouter.get("/api/messages", GetMessages);
messagesRouter.get("/api/messages/:id", GetMessagesId);
messagesRouter.post("/api/messages", PostMessages);
messagesRouter.put("/api/messages/:id", UpdateMessages);
messagesRouter.delete("/api/messages/:id", DeleteMessages);

messagesRouter.get("/messages", (req, res) => {
  res.render("chat.hbs", { title: "Alus | Support", isHomePage: false });
});

module.exports = messagesRouter;
