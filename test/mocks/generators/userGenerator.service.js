const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const UsersManager = require("../../../src/daos/managers/UsersManager");
const usersManager = new UsersManager();
const bcrypt = require("bcrypt");

function encryptPassword() {
  let unencryptedPassword = faker.word.sample();
  let encryptedPassword = bcrypt.hash(unencryptedPassword, 10);
  return { unencryptedPassword, encryptedPassword };
}

async function generateUser() {
  const { unencryptedPassword, encryptedPassword } = encryptPassword();
  const data = {
    get _id() {
      return new mongoose.Types.ObjectId();
    },
    email: faker.internet.email(),
    // password: unencryptedPassword,
    password: await encryptedPassword,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    gender: faker.person.gender(),
    phone: faker.phone.number(),
    address: faker.word.noun(),
  };

  usersManager.registerUser(data);
  return data;
}
module.exports = generateUser;
