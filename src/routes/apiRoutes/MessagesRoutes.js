const Router = require("express").Router;
const messagesRouter = Router();
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../../middlewares/authentication");
const {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
} = require("../../controllers/MessageController");

//MESSAGES
messagesRouter.get("/api/messages", GetMessages);
messagesRouter.get("/api/messages/:id", GetMessagesId);
messagesRouter.post("/api/messages", PostMessages);
messagesRouter.put("/api/messages/:id", UpdateMessages);
messagesRouter.delete("/api/messages/:id", DeleteMessages);

module.exports = messagesRouter;
