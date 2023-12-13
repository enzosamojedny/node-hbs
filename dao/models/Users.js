const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
  },
  { versionKey: false, strict: "throw" }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
