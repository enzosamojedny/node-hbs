const passport = require("passport");
const {
  appendJwtAsCookie,
  removeJwtFromCookies,
} = require("../middlewares/Passport");

function profileView(req, res) {
  const userToken = req.user;
  res.render("profile.hbs", {
    title: "Alus | My profile",
    isHomePage: false,
    user: req.session.user,
    userToken: userToken | null,
  });
}
function registerView(req, res, next) {
  passport.authenticate("register", {
    failWithError: true,
  })(req, res, (err) => {
    if (err) {
      console.log("Registration authentication failed:", err.message);
      res.status(400).json({ status: "error", message: err.message });
      return;
    }

    console.log("Registration authentication successful!");

    appendJwtAsCookie(req, res, () => {
      console.log("JWT appended as cookie successfully.");

      res.status(201).json({
        message: "Registration successful",
        payload: req.user,
      });

      console.log("REGISTER data", req.user);
    });
  });
}
function currentSessionView(req, res, next) {
  passport.authenticate("jwt", { failWithError: true }, async (err, user) => {
    if (err) {
      if (err.name === "UnauthorizedError" && err.message === "jwt expired") {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized. Token has expired.",
        });
      }

      if (err.name === "UnauthorizedError" && err.message === "No auth token") {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized. Token is missing.",
        });
      }

      if (err.name === "UnauthorizedError") {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized. Invalid token.",
        });
      }

      console.error("Unexpected error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }

    res.json({ status: "success", payload: user });
  })(req, res, next);
}

module.exports = { profileView, registerView, currentSessionView };
