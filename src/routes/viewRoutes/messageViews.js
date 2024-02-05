const Router = require("express").Router;
const messagesViewsRouter = Router();

messagesViewsRouter.get("/messages", (req, res) => {
  const userToken = req.user;
  res.render("chat.hbs", {
    title: "Alus | Support",
    isHomePage: false,
    userToken: userToken || null,
  });
});

module.exports = messagesViewsRouter;
