const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "products" },
    ], //product ID's in cart
    quantity: { type: Number, required: true }, //quantity of products
    date: { type: Date, default: Date.now(), index: true },
  },
  { versionKey: false, strict: "throw" }
);
CartSchema.pre("find", function (next) {
  this.populate("products");
  next();
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
