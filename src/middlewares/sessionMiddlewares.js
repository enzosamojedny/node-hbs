const passport = require("passport");

function userLogin(req, res, next) {
  passport.authenticate(
    "login",
    { failWithError: true },
    (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({ status: "error", message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return next();
      });
    }
  )(req, res, next);
}

function githubLogin(req, res) {
  passport.authenticate("github", { scope: ["user:email"] })(req, res);
}

function githubCallback(req, res, next) {
  passport.authenticate("github", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })(req, res, next);
}
function googleLogin(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
}

function googleCallback(req, res, next) {
  passport.authenticate("google", {
    successRedirect: "/products",
    failureRedirect: "/login",
  })(req, res, next);
}

function logout(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect("/login"); //not redirecting
}

module.exports = {
  userLogin,
  githubLogin,
  githubCallback,
  googleLogin,
  googleCallback,
  logout,
};
