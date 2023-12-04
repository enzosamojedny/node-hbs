const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const CartSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, default: randomUUID() },
    products: [{ type: String, required: true, ref: "products" }], //product ID's in cart
    quantity: { type: Number, required: true }, //quantity of products
    date: { type: Date, default: Date.now(), index: true },
  },
  { versionKey: false, strict: "throw" }
);
CartSchema.pre("find", function () {
  this.populate("products");
  next();
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
