const passport = require("passport");
const { appendJwtAsCookie, removeJwtFromCookies } = require("./Passport");

function profileView(req, res) {
  const userToken = req.user;
  res.render("profile.hbs", {
    title: "Alus | My profile",
    isHomePage: false,
    user: req.session.user,
    userToken: userToken | null,
  });
}
// function registerUser(req, res, next) {
//   passport.authenticate("register", (err, user, info) => {
//     if (err) {
//       console.log("Registration authentication failed:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     if (!user) {
//       return res
//         .status(400)
//         .json({ error: info.message || "Registration failed" });
//     }
//     // Successful authentication, user is set at this point
//     appendJwtAsCookie(req, res, () => {
//       res.status(200).json({ message: "Registration successful", user });
//     });
//   })(req, res, next);
// }

function getCurrentSession(req, res, next) {
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

module.exports = { profileView, getCurrentSession };