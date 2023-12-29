const RiveScript = require("rivescript");
const path = require("path");

class Chatbot {
  constructor() {
    this.chatbot = new RiveScript();
  }
  initialize() {
    return new Promise((resolve, reject) => {
      this.chatbot.loadFile(
        //change this to a promise
        path.join(__dirname, "begin.rive"),
        () => {
          console.log("Rivescript Brain Loaded");
          resolve();
        },
        (error) => {
          console.error("Error loading RiveScript file:", error);
          reject(error);
        }
      );
    });
  }
  getResponse(userInput) {
    return this.chatbot.reply("user", userInput);
  }
}
module.exports = Chatbot;
