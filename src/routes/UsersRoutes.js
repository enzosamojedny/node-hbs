const Router = require("express").Router;
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../middlewares/authentication");
const passport = require("passport");
const usersRouter = Router();

const {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
} = require("../../src/controllers/Users/UsersController");

const {
  profileView,
  getCurrentSession,
} = require("../middlewares/userMiddlewares");

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
usersRouter.get("/api/session/current", getCurrentSession);
usersRouter.get("/profile", onlyLoggedClient, profileView);

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

module.exports = usersRouter;
