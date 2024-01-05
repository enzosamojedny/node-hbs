const Router = require("express").Router;
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../middlewares/auth");
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

const {
  appendJwtAsCookie,
  removeJwtFromCookies,
} = require("../middlewares/Passport");

usersRouter.post(
  "/api/users",
  passport.authenticate("register", {
    failWithError: true,
  }),
  appendJwtAsCookie,
  (req, res) => {
    res.status(201).json({
      message: "Registration successful",
      payload: req.user,
    });
    console.log("REGISTER data", req.user);
  },
  (error, req, res, next) => {
    res.status(400).json({ status: "error", message: error.message });
  }
);

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

usersRouter.get(
  "/api/session/current",
  passport.authenticate("jwt", { failWithError: true }),
  async (req, res) => {
    res.json({ status: "success", payload: req.user });
  },
  (error, req, res, next) => {
    res.status(401).json({ status: "error", message: error.message });
  }
);
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
