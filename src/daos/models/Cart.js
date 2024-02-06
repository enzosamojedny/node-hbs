const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

//productos que se guardan en DB
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
    thumbnail: { type: String, required: true, default: "" },
    discountPercentage: { type: Number, required: false, default: 0 },
    category: { type: String, required: true, index: true },
    stock: { type: Number, required: true },
  },
  { _id: false }
); // _id is false because this is a sub-document

//Cart que se forma con los productos + ID del usuario
const CartSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, default: () => randomUUID() }, //! check if i have to remove it completely
    email: {
      type: String,
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
