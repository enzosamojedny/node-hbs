const Ticket = require("../models/Ticket");
const Cart = require("../models/Cart");

class TicketManagerMongoDB {
  async createTicket(cartId, userData) {
    try {
      //! con el cartId tengo que buscar en DB, comprobar si hay suficientes productos
      //! restarlos, ( si hay, sino, devolver los productos, tmb si son invalidos)

      if (cartId) {
        const purchaser = userData.email;
        const amount = userData.products.reduce((total, product) => {
          return total + product.quantity * product.price;
        }, 0);
        
        try {
          const ticketCreated = await Ticket.create({
            purchaser: purchaser,
            amount: amount,
          });
          return { payload: ticketCreated.toObject(), status: "created" };
        } catch (error) {
          throw new Error("Unable to create ticket");
        }
      }
    } catch (error) {
      throw new Error("Invalid cartId or userData");
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
