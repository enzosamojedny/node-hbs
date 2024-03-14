const { faker } = require("@faker-js/faker");
const { Router } = require("express");
const mockProduct = Router();
const mongoose = require("mongoose");

function generateProduct() {
  const products = [];
  for (let i = 0; i < 100; i++) {
    try {
      const data = {
        get id() {
          return new mongoose.Types.ObjectId();
        },
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: crypto.randomUUID(),
        stock: faker.number.int({ min: 100, max: 500 }),
        category: faker.commerce.department(),
      };
      products.push(data);
      return products;
      //it breaks after the first iteration, on purpose! i can remove this line of code to generate all of them
    } catch (error) {
      console.error("Error generating product:", error);
    }
  }
  if (products.length === 0) {
    throw new Error("Unable to generate any products.");
  }
}
module.exports = generateProduct;
