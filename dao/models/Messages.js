const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now(), index: true },
  },
  { versionKey: false, strict: "throw" }
);
const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;

// const mongoose = require("mongoose");

// const conversationSchema = new mongoose.Schema(
//   {
//?  Assuming each message has a unique ID
//     _id: { type: String, required: true },
//?  A conversation ID to group messages from the same chat session
//     conversationId: { type: String, required: true, index: true },
//?  Indicates who sent the message - the user or the chatbot
//     sender: { type: String, required: true, enum: ['user', 'chatbot'] },
//?  The content of the message
//     message: { type: String, required: true },
//?  Timestamp of when the message was sent
//     date: { type: Date, default: Date.now }
//   },
//   { versionKey: false, strict: 'throw' }
// );

// const Conversation = mongoose.model('Conversation', conversationSchema);
// module.exports = Conversation;
