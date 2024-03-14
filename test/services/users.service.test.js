const UsersManager = require("../../src/daos/managers/UsersManager");
const usersManagerMongoDB = new UsersManager();
const generateUser = require("../mocks/generators/userGenerator.service");
const mongoose = require("mongoose");
const assert = require("assert");

describe("User Service", () => {
  describe("Register", () => {
    describe("With valid data", async () => {
      it("Create a user with a new ObjectID", async () => {
        //test goes here
        const userData = await generateUser();
        const userId = userData._id;
        assert.strictEqual(mongoose.Types.ObjectId.isValid(userId), true);
        return userId;
      });
      it("Encrypts password", () => {
        //test goes here
      });
      it("Saves the user in DB", () => {
        //test goes here
      });
      it("Sends confirmation Email", () => {});
    });
    describe("With invalid data", () => {});
  });
});
