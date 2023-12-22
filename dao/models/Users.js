const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    strict: "throw",
    methods: {
      //! recheck this later
      publicInfo: function () {
        return {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          gender: this.gender,
        };
      },
    },
  }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
