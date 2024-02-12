const Router = require("express").Router;
const messagesRoutes = Router();
const compression = require("express-compression");

module.exports = compression;
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
messagesRoutes.use(compression());
messagesRoutes.get("/api/messages", onlyLoggedApi, GetMessages);
messagesRoutes.get("/api/messages/:id", onlyLoggedApi, GetMessagesId);
messagesRoutes.post("/api/messages", onlyLoggedApi, PostMessages);
messagesRoutes.put("/api/messages/:id", onlyLoggedApi, UpdateMessages);
messagesRoutes.delete("/api/messages/:id", onlyLoggedApi, DeleteMessages);

module.exports = messagesRoutes;
