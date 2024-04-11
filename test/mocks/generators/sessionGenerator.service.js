const { userLogin } = require("../../../src/middlewares/sessionMiddlewares");
const {
  getCurrentSession,
} = require("../../../src/middlewares/userMiddlewares");

class SessionGenerator {
  async generateSession() {
    const credentials = {
      email: "enzosamojedny@gmail.com",
      password: "123456",
    };
    userLogin(credentials);
    getCurrentSession();
    return credentials;
  }
}
const sessionGenerator = new SessionGenerator();
module.exports = sessionGenerator;
