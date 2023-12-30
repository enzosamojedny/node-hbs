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
//     _id: { type: String, required: true }, // Unique conversation ID
//     user: { type: String, required: true },
//     chatbot: { type: String, required: true },
//     messages: [
//       {
//         _id: { type: String, required: true },
//         sender: { type: String, required: true, enum: ['user', 'chatbot'] },
//         message: { type: String, required: true },
//         date: { type: Date, default: Date.now() },
//       },
//     ],
//   },
//   { versionKey: false, strict: "throw" }
// );

// const Conversations = mongoose.model("Conversations", conversationSchema);

// module.exports = Conversations;
