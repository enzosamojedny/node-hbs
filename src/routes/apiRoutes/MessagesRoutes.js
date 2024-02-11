const Router = require("express").Router;
const messagesRoutes = Router();
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
messagesRoutes.get("/api/messages", onlyLoggedApi, GetMessages);
messagesRoutes.get("/api/messages/:id", GetMessagesId);
messagesRoutes.post("/api/messages", PostMessages);
messagesRoutes.put("/api/messages/:id", UpdateMessages);
messagesRoutes.delete("/api/messages/:id", DeleteMessages);

module.exports = messagesRoutes;
