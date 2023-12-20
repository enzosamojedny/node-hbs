const Router = require("express").Router;
const { onlyLoggedClient } = require("../middlewares/auth");
const usersRouter = Router();
const {
  PostUser,
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
} = require("../../handlers/Users/UsersHandler");

usersRouter.post("/api/users", PostUser);
usersRouter.get("/api/users/:id", getUserId);
usersRouter.get("/api/users", GetUsers);
usersRouter.put("/api/users/:id", DeleteUser);
usersRouter.get("/api/users/myprofile", getUsername);
usersRouter.delete("/api/users/:id", UpdateUser);
usersRouter.post("/api/resetpassword", ResetPassword);

usersRouter.get("/register", (req, res) => {
  res.render("register.hbs", { title: "Register", isHomePage: false });
});

usersRouter.get("/login", (req, res) => {
  res.render("login.hbs", { title: "Login", isHomePage: false });
});

// usersRouter.post("/logout", (req, res) => {
//   res.render("logout.hbs", { title: "Logout", isHomePage: false });
// });

usersRouter.get("/resetpassword", (req, res) => {
  res.render("resetpassword.hbs", {
    title: "Reset password",
    isHomePage: false,
  });
});

//! adjust logic so only logged users can see this page
usersRouter.get("/profile", onlyLoggedClient, function profileView(req, res) {
  res.render("profile.hbs", {
    title: "Profile",
    isHomePage: false,
    user: req.session[user],
  });
});
module.exports = usersRouter;
