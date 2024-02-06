const Router = require("express").Router;
const sessionRoutes = Router();
const {
  appendJwtAsCookie,
  removeJwtFromCookies,
} = require("../../middlewares/Passport");

const {
  userLogin,
  githubLogin,
  githubCallback,
  googleLogin,
  googleCallback,
  logout,
} = require("../../middlewares/sessionMiddlewares");

sessionRoutes.post(
  "/api/login",
  userLogin,
  appendJwtAsCookie,
  (req, res) => {
    res.status(201).json({ message: "Login successful", payload: req.user });
  },
  (error, req, res, next) => {
    console.error("Error in login route:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
);

sessionRoutes.get("/api/github", githubLogin);

sessionRoutes.get("/api/github/callback", githubCallback);
sessionRoutes.get("/api/google", googleLogin);

sessionRoutes.get("/oauth2/redirect/google", googleCallback);

sessionRoutes.delete("/api/logout", logout, removeJwtFromCookies);

module.exports = sessionRoutes;
