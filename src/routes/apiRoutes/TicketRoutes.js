const {
  GetTicketId,
  PostTicket,
} = require("../../controllers/TicketController");

const Router = require("express").Router;

const ticketRoutes = Router();

//! codigo repetido, el routing esta en CartRoutes.js
ticketRoutes.post("/api/products", PostTicket);
ticketRoutes.get("/api/products/:id", GetTicketId);

module.exports = ticketRoutes;
