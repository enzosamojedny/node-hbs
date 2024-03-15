const UsersManager = require("../../src/daos/managers/UsersManager");
const usersManagerMongoDB = new UsersManager();
const generateUser = require("../mocks/generators/userGenerator.service");
const mongoose = require("mongoose");
const assert = require("assert");

describe("User Service", () => {
  describe("Register", () => {
    describe("With valid data", async () => {
      it("Create a user with a new ObjectID", async () => {
        const userData = await generateUser();
        const userId = userData._id;
        if (!userId) {
          throw new Error("ObjectID is missing!");
        }
        assert.strictEqual(mongoose.Types.ObjectId.isValid(userId), true);
        return userId;
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
      it("Sends confirmation Email", () => {});
    });
    describe("With invalid data", () => {});
  });
});
