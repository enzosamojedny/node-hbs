const UsersManager = require("../../src/daos/managers/UsersManager");
const usersManagerMongoDB = new UsersManager();
describe("User Service", () => {
  describe("Register", () => {
    describe("With valid data", () => {
      it("Create a user with a new ID", () => {
        //test goes here
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
