const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  code: { type: String, required: true, unique: true, index: true },
  purchase_datetime: { type: Date, default: Date.now, index: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

TicketSchema.index([{ purchase_datetime: 1, amount: 1 }]);

const Tickets = mongoose.model("tickets", TicketSchema);

module.exports = Tickets;
