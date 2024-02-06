const {
  GetTicketId,
  PostTicket,
} = require("../../controllers/TicketController");

const Router = require("express").Router;

const ticketRoutes = Router();

ticketRoutes.post("/api/products", PostTicket);
ticketRoutes.get("/api/products/:id", GetTicketId);

module.exports = ticketRoutes;
