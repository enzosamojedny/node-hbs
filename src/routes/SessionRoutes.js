const Router = require("express").Router;
const sessionRouter = Router();
const passport = require("passport");
const {
  appendJwtAsCookie,
  removeJwtFromCookies,
} = require("../middlewares/Passport");

sessionRouter.post(
  "/api/login",
  (req, res, next) => {
    passport.authenticate(
      "login",
      { failWithError: true },
      (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          return res
            .status(401)
            .json({ status: "error", message: info.message });
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return next();
        });
      }
    )(req, res, next);
  },
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

sessionRouter.get(
  "/api/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

sessionRouter.get(
  "/api/github/callback",
  passport.authenticate("github", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })
);
sessionRouter.get(
  "/api/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {}
);

sessionRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/products",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

sessionRouter.delete("/logout", removeJwtFromCookies, (req, res) => {
  res.json({ status: "success", message: "Logout was successful" });
});

sessionRouter.post("/session", () => {});
sessionRouter.post("/user", () => {});
module.exports = sessionRouter;
