const Users = require("../../dao/models/Users");
const Router = require("express").Router;
const sessionRouter = Router();
const bcrypt = require("bcrypt");
const { onlyLoggedApi } = require("../middlewares/auth");
const UsersManager = require("../../dao/UsersManager");

sessionRouter.get("/api/session", (req, res) => {
  res.send("Welcome");
});

sessionRouter.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await Users.findOne({ email }).lean();
  if (!userFound) {
    return res.status(400).json({
      status: "error",
      message: "Login failed. User not found.",
    });
  }

  const passwordMatch = await bcrypt.compare(password, userFound.password);

  if (!passwordMatch) {
    return res.status(400).json({
      status: "error",
      message: "Email and password combination is incorrect",
    });
  }

  const userData = {
    email: userFound.email,
    first_name: userFound.name,
    last_name: userFound.last_name,
    gender: userFound.gender,
  };

  req.login(userData, (error) => {
    if (error) {
      console.log(error);
    }
  });
  req.session["admin"] = true;

  res
    .status(201)
    .json({ status: "success", message: "You have successfully logged in" });
});

//!auth in profile.hbs API
sessionRouter.get("/api/session/current", onlyLoggedApi, async (req, res) => {
  const userFound = await Users.findOne(
    { email: req.session["user"].email },
    { password: 0 }
  ).lean();
  res.json({ status: "success", payload: userFound });
  if (req.session["user"]) {
    res.json(req.session["user"]);
  } else {
    res.status(400).json({
      status: "error",
      message: "No session saved, you need to login first!",
    });
  }
});

//! passport logout
sessionRouter.post("/api/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
    }
    res.redirect("/login");
  });
});

sessionRouter.post("/session", () => {});
sessionRouter.post("/user", () => {});

module.exports = sessionRouter;
