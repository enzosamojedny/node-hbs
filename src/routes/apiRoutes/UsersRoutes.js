const Router = require("express").Router;
const {
  onlyLoggedClient,
  onlyLoggedApi,
  onlyAdmins,
} = require("../../middlewares/authentication");

const passport = require("passport");
const usersRouter = Router();
const {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
} = require("../../controllers/Users/UsersController");

const {
  profileView,
  getCurrentSession,
} = require("../../middlewares/userMiddlewares");

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
usersRouter.post("/api/getuserbyemail", getUsername); //! get user by email
usersRouter.delete("/api/users/:id", UpdateUser);
usersRouter.post("/api/resetpassword", ResetPassword);
usersRouter.get("/api/session/current", onlyLoggedApi, getCurrentSession);
usersRouter.get("/profile", onlyLoggedClient, profileView);

module.exports = usersRouter;
