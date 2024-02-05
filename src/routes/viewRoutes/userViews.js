const Router = require("express").Router;
const userViewsRouter = Router();
userViewsRouter.get("/register", (req, res) => {
    res.render("register.hbs", { title: "Alus | Register", isHomePage: false });
  });
  
  userViewsRouter.get("/login", (req, res) => {
    res.render("login.hbs", { title: "Alus | Login", isHomePage: false });
  });
  
  userViewsRouter.get("/resetpassword", (req, res) => {
    res.render("resetpassword.hbs", {
      title: "Reset password",
      isHomePage: false,
    });
  });
  
  module.exports = userViewsRouter;