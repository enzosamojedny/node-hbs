const emailGmailService = require("./email.service.gmail");
const fakerGmailService = require("../../test/mocks/generators/emailGenerator.service");

//en el process.env agregar la prop para que ejecute 'DEV' o 'PROD' y en base a eso, ejecutar los mocks o no
class EmailService {
  constructor(mode) {
    if (mode === "prod") {
      this.emailService = emailGmailService;
    } else {
      this.emailService = fakerGmailService;
    }
  }
}

const mode = "prod";

const emailService = new EmailService(mode);
module.exports = emailService;
