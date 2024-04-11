const EmailService = require("../../services/email.service");
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

      let existingTicket = await Ticket.findOne({ purchaser: purchaser });
      console.log("existing ticket", existingTicket);
      if (existingTicket) {
        existingTicket.tickets.push({
          amount: amount,
        });
        await existingTicket.save();
        return {
          payload: existingTicket.toObject(),
          status: "ticket added to existing user",
        };
      } else {
        const ticket = new Ticket({
          purchaser: purchaser,
          tickets: [
            {
              amount: amount,
            },
          ],
        });
        console.log("creating new ticket", ticket);

        await ticket.validate();

        const ticketCreated = await ticket.save();
        //envio de email
        //en vez de enviar strings, puedo enviar HTML, convertirlo a PDF con alguna libreria y usar eso
        await EmailService.sendEmail(
          purchaser,
          "Thanks for buying us!",
          `Your item(s) were correctly bought, order number is ${existingTicket?.code}`
        );
        return {
          payload: ticketCreated.toObject(),
          status: "created new ticket for user",
        };
      }
    } catch (error) {
      throw new Error("Error creating or updating ticket: " + error.message);
    }
  }

  async getTicketByEmail(userEmail) {
    const found = await Ticket.findOne({ email: userEmail }).lean();
    if (!found) {
      throw new Error(`Ticket for email ${userEmail} not found`);
    } else {
      return found;
      //? or found.ticket en payload
    }
  }
}
module.exports = TicketManagerMongoDB;
