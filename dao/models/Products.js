const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const productSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, default: randomUUID() },
    title: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    status: { type: String, required: true, index: true },
  },
  { versionKey: false, strict: "throw" }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
