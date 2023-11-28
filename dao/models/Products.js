const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false, strict: "throw" }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
