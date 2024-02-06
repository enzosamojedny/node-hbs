const Router = require("express").Router;
const ticketViewsRouter = Router();

ticketViewsRouter.get("/ticket", (req, res) => {
  const userToken = req.user;
  res.render("ticket.hbs", {
    title: "Alus | Ticket",
    isHomePage: false,
    userToken: userToken || null,
  });
});

module.exports = ticketViewsRouter;
