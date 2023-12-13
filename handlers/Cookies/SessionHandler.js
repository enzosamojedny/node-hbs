const ProductManagerMongoDB = require("../../dao/ProductManagerMongoDB");
const productManagerMongoDB = new ProductManagerMongoDB();
const express = require("express");
const router = express.Router();

const main = router.get("/", (req, res) => {
  res.send("Welcome");
});
const postLogin = router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json("Missing username or password");
  }
});
const logout = router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res
        .status(500)
        .json({ status: "Error logging out, please try again" });
    }
  });
});
module.exports = { main, postLogin, logout };
