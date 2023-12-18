const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
  },
  { versionKey: false, strict: "throw" }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
