const Router = require("express").Router;

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index.hbs", { title: "Main", isHomePage: true });
});

module.exports = indexRouter;
