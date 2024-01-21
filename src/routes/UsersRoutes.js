const Router = require("express").Router;
const { onlyLoggedClient } = require("../middlewares/auth");

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
  registerView,
  currentSessionView,
} = require("../middlewares/viewMiddlewares");

usersRouter.post("/api/users", registerView);

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

usersRouter.get("/api/session/current", currentSessionView);

//! adjust logic so only logged users can see this page
//? bug is in onlyLoggedClient
usersRouter.get("/profile", onlyLoggedClient, profileView);
module.exports = usersRouter;
