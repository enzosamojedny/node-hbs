const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
); // _id is false because this is a sub-document

const CartSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, default: () => randomUUID() },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [cartItemSchema],
    date: { type: Date, default: Date.now, index: true },
  },
  {
    versionKey: false,
    timestamps: true,
    strict: "throw",
  }
);

CartSchema.pre("find", function (next) {
  this.populate("products.productId");
  next();
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
