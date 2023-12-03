const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    cart: { type: String, required: true }, //products in cart
    quantity: { type: Number, required: true }, //quantity of products
    date: { type: Date, default: Date.now() },
  },
  { versionKey: false, strict: "throw" }
);
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
