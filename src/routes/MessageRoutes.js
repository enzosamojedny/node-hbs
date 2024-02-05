const Router = require("express").Router;
const messagesRouter = Router();
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../middlewares/authentication");
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../src/controllers/Messages/MessageController");

//MESSAGES
messagesRouter.get("/api/messages", GetMessages);
messagesRouter.get("/api/messages/:id", GetMessagesId);
messagesRouter.post("/api/messages", PostMessages);
messagesRouter.put("/api/messages/:id", UpdateMessages);
messagesRouter.delete("/api/messages/:id", DeleteMessages);

messagesRouter.get("/messages", (req, res) => {
  const userToken = req.user;
  res.render("chat.hbs", {
    title: "Alus | Support",
    isHomePage: false,
    userToken: userToken || null,
  });
});

module.exports = messagesRouter;
