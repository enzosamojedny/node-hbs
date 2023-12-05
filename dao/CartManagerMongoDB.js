const Cart = require("./models/Cart");
const { randomUUID } = require("crypto");
class CartManagerMongoDB {
  async addCart(cart) {
    cart._id = randomUUID();
    const cartCreated = await Cart.create(cart);
    return cartCreated.toObject();
  }

  async getCart() {
    return await Cart.find().lean();
  }

  async getCartById(cartId) {
    const found = await Cart.findById({ cartId }).lean();
    if (!found) {
      throw new Error(`Cart with id ${cartId} not found`);
    } else {
      return found;
    }
  }

  async deleteCart(cartId) {
    const cartToDelete = await Cart.findByIdAndDelete({
      cartId,
    }).lean();
    if (!cartToDelete) {
      throw new Error(`Cart with id ${cartId} couldnt be deleted`);
    } else {
      return cartToDelete;
    }
  }
  async deleteProductFromCart(cartId, productId) {
    const cartToDeleteProduct = await Cart.findOneAndDelete({
      cartId,
      productId,
    }).lean();
    if (!cartToDeleteProduct) {
      throw new Error(
        `Product with id ${productId} couldnt be deleted from cart with id ${cartId}`
      );
    } else {
      return cartToDeleteProduct;
    }
  }
  async deleteCart(cartId) {
    const cartToDelete = await Cart.findByIdAndDelete({
      cartId,
    }).lean();
    if (!cartToDelete) {
      throw new Error(`Cart with id ${cartId} couldnt be deleted`);
    } else {
      return cartToDelete;
    }
  }

  async updateCart(cartId, updatedCart) {
    const cartToUpdate = await Cart.findByIdAndUpdate(cartId, updatedCart, {
      new: true,
    }).lean();
    if (!cartToUpdate) {
      throw new Error(`Cart with id ${cartId} couldnt be updated`);
    } else {
      return cartToUpdate;
    }
  }
}
module.exports = CartManagerMongoDB;
