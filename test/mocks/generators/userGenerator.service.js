const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const UsersManager = require("../../../src/daos/managers/UsersManager");
const usersManager = new UsersManager();
const bcrypt = require("bcrypt");

async function encryptPassword() {
  let password = await bcrypt.hash(faker.word.sample(), 10);
  return password;
}
async function generateUser() {
  const password = await encryptPassword();
  const data = {
    get _id() {
      return new mongoose.Types.ObjectId();
    },
    email: faker.internet.email(),
    password: password,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    gender: faker.person.gender(),
    phone: faker.phone.number(),
    address: faker.word.noun(),
  };

  // usersManager.registerUser(data);
  return data;
}
module.exports = generateUser;
