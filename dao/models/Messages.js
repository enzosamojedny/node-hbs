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
