const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const TicketItemSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  amount: { type: Number, required: true, min: 1 },
  purchase_datetime: { type: Date, default: Date.now },
});

const TicketSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  code: {
    type: String,
    unique: true,
    default: () => randomUUID(),
  },
  purchase_datetime: { type: Date, default: Date.now, index: true },
  purchaser: { type: String, required: true, email: true },
  tickets: [TicketItemSchema],
});

TicketSchema.index([{ purchase_datetime: 1, amount: 1 }]);

const Tickets = mongoose.model("tickets", TicketSchema);

module.exports = Tickets;
