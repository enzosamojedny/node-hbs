const Router = require("express").Router;
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../../middlewares/authentication");

const passport = require("passport");
const usersRoutes = Router();
const {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
} = require("../../controllers/UsersController");

const {
  profileView,
  getCurrentSession,
} = require("../../middlewares/userMiddlewares");

usersRoutes.post("/api/users", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    console.log(req.user);
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

usersRoutes.get("/api/users/:id", onlyLoggedApi, onlyAdmins, getUserId);
usersRoutes.get("/api/users", onlyLoggedApi, onlyAdmins, GetUsers);
usersRoutes.put("/api/users/:id", onlyLoggedApi, onlyAdmins, DeleteUser);
usersRoutes.post("/api/getuserbyemail", onlyLoggedApi, onlyAdmins, getUsername);
usersRoutes.delete("/api/users/:id", onlyLoggedApi, UpdateUser);
usersRoutes.post("/api/resetpassword", ResetPassword);
usersRoutes.get("/api/session/current", onlyLoggedApi, getCurrentSession);
usersRoutes.get("/profile", onlyLoggedClient, profileView);

module.exports = usersRoutes;
