const Router = require("express").Router;
const messagesViewsRouter = Router();

messagesViewsRouter.get("/messages", (req, res) => {
  if (req.user) {
    const userToken = req.user;
    res.render("chat.hbs", {
      title: "Alus | Support",
      isHomePage: false,
      userToken: userToken || null,
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = messagesViewsRouter;
