const Router = require("express").Router;
const usersRouter = Router();
const {
  PostUser,
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
} = require("../../handlers/Users/UsersHandler");

usersRouter.post("/api/users", PostUser);
usersRouter.get("/api/users/:id", getUserId);
usersRouter.get("/api/users", GetUsers);
usersRouter.put("/api/users/:id", DeleteUser);
usersRouter.get("/api/users/myprofile", getUsername);
usersRouter.delete("/api/users/:id", UpdateUser);

usersRouter.get("/register", (req, res) => {
  res.render("register.hbs", { title: "Register", isHomePage: false });
});

usersRouter.get("/login", (req, res) => {
  res.render("login.hbs", { title: "Login", isHomePage: false });
});
module.exports = usersRouter;
