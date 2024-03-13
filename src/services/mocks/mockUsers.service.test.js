const { faker } = require("@faker-js/faker");
const { Router } = require("express");
const mockUser = Router();

mockUser.get("/mockinguser", (req, res, next) => {
  try {
    const user = [];
    for (let i = 0; i < 100; i++) {
      try {
        const data = {
          id: crypto.randomUUID(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          gender: faker.person.gender(),
          phone: faker.phone.number(),
        };

        if (data) {
          user.push(data);
        } else {
          console.error(`Error generating user at index ${i}`);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }

    res.json(user);
  } catch (error) {
    console.error("Critical error generating mocking user:", error);
    res.status(500).json({
      error: "Critical error encountered while generating mocking user.",
    });
  }
});

function errorHandler(errorCode, res) {
  res.status(500).json();
}
mockUser.get("/simulateError", (req, res, next) => {
  const errorCode = req.query.errorCode;
  if (!errorCode) {
    return next(new Error("Código de error no proporcionado."));
  }
  errorHandler(errorCode, res);
});

mockUser.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

module.exports = mockUser;
