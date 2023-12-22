const Router = require("express").Router;
const sessionRouter = Router();
const passport = require("passport");

sessionRouter.post("/api/login", async (req, res, next) => {
  passport.authenticate("login", (err, userData, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!userData) {
      return res.status(400).json({ error: info.message || "Login failed" });
    }

    res.status(200).json({ message: "Login successful", userData });
  })(req, res, next);
});


//! passport logout
sessionRouter.post("/api/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
    }
    res.redirect("/login");
  });
});

sessionRouter.post("/session", () => {});
sessionRouter.post("/user", () => {});

module.exports = sessionRouter;
