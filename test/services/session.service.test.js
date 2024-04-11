const generateUser = require("../mocks/generators/userGenerator.service");
const assert = require("assert");
const fakeEmailService = require("../mocks/generators/emailGenerator.service");
const sessionGenerator = require("../mocks/generators/sessionGenerator.service");

describe("Session Service", () => {
  describe("Login", () => {
    describe("With valid data", async () => {
      it("Login a user", async () => {
        const session = await sessionGenerator.generateSession();
        if (!session) {
          throw new Error("ObjectID is missing!");
        }
      });

      it("Valid password", async () => {
        const userData = await generateUser();
        const password = userData.password;
        if (!password) {
          throw new Error("Password is missing!");
        }
        assert.strictEqual(typeof password, "string");
        assert.notStrictEqual(password, "");
      });
      it("Saves the user in DB", () => {
        //test goes here
      });
      it("Sends confirmation Email", () => {
        const email = fakeEmailService.sendEmail();
        return email;
      });
    });
    describe("With invalid data", () => {});
  });
});
