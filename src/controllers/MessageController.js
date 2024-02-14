const messagesManager = require("../daos/managers/MessagesManager");
const messagesManagerMongoDB = new messagesManager();

//MESSAGES
const PostMessages = async (req, res) => {
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
    next(error);
  }
};
const GetMessages = async (req, res) => {
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
    next(error);
  }
};
const GetMessagesId = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await messagesManagerMongoDB.getMessageById(id);
    if (messages) {
      res.status(200).json({ messages });
    } else {
      throw new Error(`Message with ID ${id} not found in the database`);
    }
  } catch (error) {
    next(error);
  }
};

const DeleteMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMessage = await messagesManagerMongoDB.deleteMessage(id);
    res.status(200).json({ deleteMessage });
  } catch (error) {
    next(error);
  }
};

const UpdateMessages = async (req, res) => {
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
    next(error);
  }
};

module.exports = {
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
};
