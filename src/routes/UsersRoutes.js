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
  registerUser,
  getCurrentSession,
} = require("../middlewares/userMiddlewares");

usersRouter.get("/api/users/:id", getUserId);
usersRouter.get("/api/users", GetUsers);
usersRouter.put("/api/users/:id", DeleteUser);
usersRouter.get("/api/users/myprofile", getUsername);
usersRouter.delete("/api/users/:id", UpdateUser);
usersRouter.post("/api/resetpassword", ResetPassword);
usersRouter.post("/api/users", registerUser);
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
