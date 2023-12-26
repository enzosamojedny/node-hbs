const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false }, //! change thumbnail to image
    stock: { type: Number, required: true },
    rating: {
      rate: { type: Number, required: false },
      count: { type: Number, required: false },
    },
    category: { type: String, required: true, index: true },
    status: { type: String, required: true, index: true },
  },
  { versionKey: false, strict: "throw" }
);
productSchema.plugin(mongoosePaginate);
const Products = mongoose.model("Products", productSchema);

module.exports = Products;
