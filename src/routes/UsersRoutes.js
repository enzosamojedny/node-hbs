const Router = require("express").Router;
const { onlyLoggedClient, onlyLoggedApi } = require("../middlewares/auth");
const passport = require("passport");

const usersRouter = Router();
const {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
} = require("../../handlers/Users/UsersHandler");
const Users = require("../../dao/models/Users");

usersRouter.post("/api/users", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: info.message || "Registration failed" });
    }

    res.status(200).json({ message: "Registration successful", user });
  })(req, res, next);
});

usersRouter.get("/api/users/:id", getUserId);
usersRouter.get("/api/users", GetUsers);
usersRouter.put("/api/users/:id", DeleteUser);
usersRouter.get("/api/users/myprofile", getUsername);
usersRouter.delete("/api/users/:id", UpdateUser);
usersRouter.post("/api/resetpassword", ResetPassword);

usersRouter.get("/register", (req, res) => {
  res.render("register.hbs", { title: "Alus | Register", isHomePage: false });
});

usersRouter.get("/login", (req, res) => {
  res.render("login.hbs", { title: "Alus | Login", isHomePage: false });
});

usersRouter.get("/resetpassword", (req, res) => {
  res.render("resetpassword.hbs", {
    title: "Reset password",
    isHomePage: false,
  });
});

//!auth in profile.hbs API
usersRouter.get("/api/session/current", onlyLoggedApi, async (req, res) => {
  try {
    console.log("Is Authenticated:", req.isAuthenticated());
    console.log("Session Data:", req.session);
    console.log("User Data:", req.user);

    if (req.isAuthenticated()) {
      const userFound = await Users.findOne(
        { email: req.session.user.email },
        { password: 0 }
      ).lean();

      console.log("User Found in Database:", userFound);

      if (userFound) {
        res.json({
          status: "success",
          payload: userFound,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "User not found in the database",
        });
      }
    } else {
      res.status(400).json({
        status: "error",
        message: "No session saved, you need to log in first!",
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

//! adjust logic so only logged users can see this page
//? bug is in onlyLoggedClient
usersRouter.get("/profile", onlyLoggedClient, function profileView(req, res) {
  res.render("profile.hbs", {
    title: "Alus | My profile",
    isHomePage: false,
    user: req.session.user,
  });
});
module.exports = usersRouter;
