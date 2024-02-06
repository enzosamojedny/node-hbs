const TicketManagerMongoDB = require("../daos/managers/TicketManagerMongoDB");
const ticketManagerMongoDB = new TicketManagerMongoDB();
const express = require("express");
const router = express.Router();

const PostTicket = router.post("/api/ticket", async (req, res) => {
  try {
    const cartDetails = req.body;
    console.log("ticket data", productDetails);
    if (!cartDetails) {
      throw new Error("Cart not provided in the request body");
    }
    const createdTicket = await ticketManagerMongoDB.createTicket(cartDetails);
    res.status(200).json({ ticket: createdTicket });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const GetTicketId = router.get("/api/ticket/:id", async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      throw new Error("ticket ID not provided in the request");
    }
    //* or get by Email?
    const userCart = await ticketManagerMongoDB.getTicketByEmail(ticketId);
    res.status(200).json({ cart: userCart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  PostTicket,
  GetTicketId,
};
