const Ticket = require("../models/Ticket");

class TicketManagerMongoDB {
  async createTicket(cartId, userData) {
    try {
      if (!cartId || !userData) {
        throw new Error("Invalid cartId or userData");
      }

      const purchaser = userData.email;
      const amount = userData.products.reduce((total, product) => {
        return total + product.quantity * product.price;
      }, 0);

      const ticket = new Ticket({
        purchaser: purchaser,
        amount: amount,
      });

      await ticket.validate();

      const ticketCreated = await ticket.save();

      return { payload: ticketCreated.toObject(), status: "created" };
    } catch (error) {
      throw new Error("Error creating ticket: " + error.message);
    }
  }

  async getTicketByEmail(userEmail) {
    const found = await Ticket.findOne({ email: userEmail }).lean();
    if (!found) {
      throw new Error(`Ticket with id ${userEmail} not found`);
    } else {
      return found;
      //? or found.ticket en payload
    }
  }
}
module.exports = TicketManagerMongoDB;
