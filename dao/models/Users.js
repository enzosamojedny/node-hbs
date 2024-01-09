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
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    pfpUrls: [{ type: String, required: true }],
    pfp: { type: String, default: () => getRandomPfpUrl(), required: true },
    cart: { type: String, ref: "Carts" },
    role: { type: String, default: "user" },
  },
  {
    versionKey: false,
    strict: "throw",
    methods: {
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
function getRandomPfpUrl() {
  const pfpUrls = [
    "https://robohash.org/Sheldon.png?set=set4",
    "https://robohash.org/Terry.png?set=set4",
  ];
  const randomIndex = Math.floor(Math.random() * pfpUrls.length);
  return pfpUrls[randomIndex];
}

const Users = mongoose.model("users", userSchema);
module.exports = Users;
