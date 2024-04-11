const { faker } = require("@faker-js/faker");

class FakeEmailService {
  //en attached puedo poner un servicio de generacion de pdf
  async sendEmail(receiver, subject, text, attached = []) {
    const emailOptions = {
      from: process.env.ALUS_EMAIL,
      to: receiver,
      subject: subject,
      text: text,
    };
    if (!receiver) {
      emailOptions.to = faker.internet.email();
    }
    if (!subject) {
      emailOptions.subject = faker.random.words();
    }
    if (!text) {
      emailOptions.text = faker.lorem.sentence();
    }

    if (attached.length > 0) {
      emailOptions.attachments = attached;
    }

    console.log(JSON.stringify(emailOptions, null, 2));
  }
}

const fakeEmailService = new FakeEmailService();
module.exports = fakeEmailService;
