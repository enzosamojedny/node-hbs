const Ticket = require("../models/Ticket");
const Cart = require("../models/Cart");

class TicketManagerMongoDB {
  async createTicket(cartId, userData) {
    try {
      //! con el cartId tengo que buscar en DB, comprobar si hay suficientes productos
      //! restarlos, ( si hay, sino, devolver los productos, tmb si son invalidos)
      console.log("cartId in manager", cartId);
      console.log("userData in manager", userData);
      if (cartId) {
        try {
          const ticketCreated = await Ticket.create(userData);
          return { payload: ticketCreated.toObject(), status: "created" };
        } catch (error) {
          throw new Error("Unable to find cartID");
        }
      }
    } catch (error) {
      throw new Error("Error creating ticket");
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
