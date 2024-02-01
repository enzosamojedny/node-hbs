const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    phone: {
      type: String,
    },
    address: { type: String },
    pfp: {
      type: String,
    },
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("pfp") && this.isNew) {
    try {
      this.pfp = await getRandomPfpUrl(this.first_name);
    } catch (error) {
      console.error(error);
      this.pfp = "https://robohash.org/34R.png?set=set4";
    }
  }
  next();
});
async function getRandomPfpUrl(firstName) {
  return `https://robohash.org/${encodeURIComponent(firstName)}.png?set=set4`;
}

const Users = mongoose.model("users", userSchema);
module.exports = Users;
