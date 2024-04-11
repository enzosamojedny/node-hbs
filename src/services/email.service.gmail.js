const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "gmail",
  port: "547",
  auth: {
    user: process.env.ALUS_EMAIL,
    pass: process.env.ALUS_PASSWORD,
  },
});
class EmailService {
  //en attached puedo poner un servicio de generacion de pdf
  async sendEmail(receiver, subject, text, attached = []) {
    const emailOptions = {
      from: process.env.ALUS_EMAIL,
      to: receiver,
      subject: subject,
      text: text,
    };
    if (attached.length < 0) {
      // emailOptions.attachments = [
      //   {
      //     filename: "perrito.jpg",
      //     path: __dirname + "/images/perrito.jpg",
      //     id: "perrito1",
      //   },
      // ];
      emailOptions.attachments = attached;
    }
    await transport.sendMail(emailOptions);
  }
}
const emailGmailService = new EmailService();
module.exports = emailGmailService;
