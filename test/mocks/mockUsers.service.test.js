const { Router } = require("express");
const mockUser = Router();
const generateUser = require("../mocks/generators/userGenerator.service");

mockUser.get("/mockingusers", (req, res, next) => {
  const newUser = generateUser();
  res.json(newUser);
});

mockUser.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

module.exports = mockUser;
