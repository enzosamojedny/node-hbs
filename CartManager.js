const uuidv4 = require("uuid").v4;
const fs = require("fs");

class CartManager {
  constructor(cart, path) {
    this.cart = cart;
    this.path = path;
  }

  addCart(products) {
    if (!products.cart || products.cart.length === 0) {
      console.log("All fields are mandatory");
      return;
    }
    console.log(this.cart);

    products.id = uuidv4();
    let values = {
      id: products.id,
      cart: products.cart,
      quantity: products.quantity,
    };
    let result = this.cart.push(values);
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2));
    } catch (error) {
      throw new Error(`404: Error writing file ${error}`);
    }
  }
  getCartById(cartId) {
    const cart = this.cart;
    const foundCart = cart.find((p) => p.id === cartId);
    if (foundCart) {
      return foundCart;
    } else {
      console.log("Not found");
      return undefined;
    }
  }
  addProductToCart(cartId, productId, quantity) {
    const cart = this.cart.find((c) => c.id === cartId);
    console.log(cart);
    if (cart) {
      const productIndex = cart.cart.indexOf(productId);
      if (productIndex !== -1) {
        cart.quantity += quantity;
        fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2));
      } else {
        cart.cart.push(productId);
        fs.writeFileSync(this.path, JSON.stringify(this.cart, null, 2));
      }
      return cart;
    }
    return undefined;
  }
}

module.exports = CartManager;
