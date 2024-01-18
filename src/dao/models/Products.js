const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { randomUUID } = require("crypto");

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: () => randomUUID(),
      unique: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    brand: { type: String, required: false, default: "" },
    code: { type: String, required: true, unique: true, index: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false, default: "" },
    discountPercentage: { type: Number, required: false, default: 0 },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    stock: { type: Number, required: true },
    rating: { type: Number, required: false, default: 0 },
    category: { type: String, required: true, index: true },
  },
  { versionKey: false, strict: "throw" }
);

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
