const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const TicketSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  code: {
    type: String,
    unique: true,
    default: () => randomUUID(),
  },
  purchase_datetime: { type: Date, default: Date.now, index: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

TicketSchema.index([{ purchase_datetime: 1, amount: 1 }]);

const Tickets = mongoose.model("tickets", TicketSchema);

module.exports = Tickets;
