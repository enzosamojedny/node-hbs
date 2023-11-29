const Messages = require("./models/Messages");

class MessagesManager {
  async addMessage(message) {
    const messageCreated = await Messages.create(message);
    return messageCreated.toObject();
  }
  async getMessages() {
    return await Messages.find().lean();
  }
  async getMessageById(messageId) {
    const found = await Messages.findById({ messageId }).lean();
    if (!found) {
      throw new Error(`Message with id ${messageId} not found`);
    } else {
      return found;
    }
  }
  async deleteMessage(messageId) {
    const messageToDelete = await Messages.findByIdAndDelete({
      messageId,
    }).lean();
    if (!messageToDelete) {
      throw new Error(`Message with id ${messageId} couldnt be deleted`);
    } else {
      return messageToDelete;
    }
  }
  async updateMessage(messageId, updatedMessage) {
    const messageToUpdate = await Messages.findByIdAndUpdate(
      messageId,
      updatedMessage,
      {
        new: true,
      }
    ).lean();
    if (!messageToUpdate) {
      throw new Error(`Message with id ${messageId} couldnt be updated`);
    } else {
      return messageToUpdate;
    }
  }
}
module.exports = MessagesManager;
