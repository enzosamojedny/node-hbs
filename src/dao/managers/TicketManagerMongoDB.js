const Ticket = require("../models/Ticket");
class TicketManagerMongoDB {
  async createTicket(cartId, userData) {
    try {
      console.log("cartId in manager", cartId);
      console.log("userData in manager", userData);
      if (cartId) {
        const ticketCreated = await Ticket.create(userData);
        return { payload: ticketCreated.toObject(), status: "created" };
      }
    } catch (error) {
      throw new Error("Error creating ticket");
    }
  }
}
module.exports = TicketManagerMongoDB;
