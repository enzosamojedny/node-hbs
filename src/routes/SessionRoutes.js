const Router = require("express").Router;
const sessionRouter = Router();
const {
  appendJwtAsCookie,
  removeJwtFromCookies,
} = require("../middlewares/Passport");
const {
  userLogin,
  githubLogin,
  githubCallback,
  googleLogin,
  googleCallback,
  logout,
} = require("../middlewares/sessionMiddlewares");

sessionRouter.post(
  "/api/login",
  userLogin,
  appendJwtAsCookie,
  (req, res) => {
    console.log("POST api/login router", req.user);
    res.status(201).json({ message: "Login successful", payload: req.user });
  },
  (error, req, res, next) => {
    console.error("Error in login route:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
);

sessionRouter.get("/api/github", githubLogin);

sessionRouter.get("/api/github/callback", githubCallback);
sessionRouter.get("/api/google", googleLogin);

sessionRouter.get("/oauth2/redirect/google", googleCallback);

sessionRouter.delete("/logout", removeJwtFromCookies, logout);

//! ???
sessionRouter.post("/session", () => {});
sessionRouter.post("/user", () => {});
module.exports = sessionRouter;
