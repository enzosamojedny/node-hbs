const { faker } = require("@faker-js/faker");
const { Router } = require("express");
const mockUser = Router();
const mongoose = require("mongoose");

function generateUser() {
  const data = {
    get id() {
      return new mongoose.Types.ObjectId();
    },
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.person.gender(),
    phone: faker.phone.number(),
  };
  return data;
}
mockUser.get("/mockinguser", (req, res, next) => {
  const newUser = generateUser();
  res.json(newUser);
});

mockUser.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

module.exports = mockUser, generateUser;
