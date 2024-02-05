const express = require("express");
const messagesManager = require("../../daos/managers/MessagesManager");
const messagesManagerMongoDB = new messagesManager();
const messagesRouter = express.Router();

//MESSAGES
const PostMessages = messagesRouter.post("/api/messages", async (req, res) => {
  try {
    const messageDetails = req.body;
    if (!messageDetails) {
      throw new Error("Message details not provided in the request body");
    }
    const addedMessage = await messagesManagerMongoDB.addMessage(
      messageDetails
    );
    res.status(200).json({ message: addedMessage });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
const GetMessages = messagesRouter.get("/api/messages", async (req, res) => {
  try {
    const messages = await messagesManagerMongoDB.getMessages();
    if (req.query.limit) {
      const limit = req.query.limit;
      const limitedMessages = messages.slice(0, limit);
      res.status(200).json({ messages: limitedMessages });
    } else {
      res.status(200).json({ messages: messages });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
const GetMessagesId = messagesRouter.get(
  "/api/messages/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await messagesManagerMongoDB.getMessageById(id);
      if (messages) {
        res.status(200).json({ messages });
      } else {
        throw new Error(`Message with ID ${id} not found in the database`);
      }
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
);
const DeleteMessages = messagesRouter.delete(
  "/api/messages/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleteMessage = await messagesManagerMongoDB.deleteMessage(id);
      res.status(200).json({ deleteMessage });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
const UpdateMessages = messagesRouter.put(
  "/api/messages/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const messageToUpdate = req.body;
      if (!messageToUpdate) {
        throw new Error("Message details not provided in the request body");
      }
      const updateMessage = await messagesManagerMongoDB.updateMessage(
        id,
        messageToUpdate
      );
      res.status(200).json({ updateMessage });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
module.exports = {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
};
