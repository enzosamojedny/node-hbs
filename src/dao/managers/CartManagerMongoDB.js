const Cart = require("../models/Cart");

class CartManagerMongoDB {
  async addCart(cart) {
    const cartCreated = await Cart.create(cart);
    return cartCreated.toObject();
  }

  async getCart() {
    return await Cart.find().lean();
  }

  async getCartById(cartId) {
    const found = await Cart.findById(cartId).lean();
    if (!found) {
      throw new Error(`Cart with id ${cartId} not found`);
    } else {
      return found;
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
  // async deleteProductFromCart(cartId, productId) {
  //   const cart = await this.getCartById(cartId);
  //   const productIndex = cart.products.findIndex(
  //     (p) => p.product.toString() === productId
  //   );
  //   if (productIndex === -1) {
  //     throw new Error(
  //       `Product with id ${productId} not found in cart with id ${cartId}`
  //     );
  //   }
  //   cart.products.splice(productIndex, 1);
  //   const updatedCart = await Cart.findByIdAndUpdate(cartId, cart, {
  //     new: true,
  //   }).lean();
  //   return updatedCart;
  // }
  async deleteCart(cartId) {
    const cartToDelete = await Cart.findByIdAndDelete(cartId).lean();
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
  async updateCartProductQuantity(cartId, productId, quantity) {
    const cartToUpdate = await Cart.findByIdAndUpdate(
      { cartId, productId },
      quantity,
      {
        new: true,
      }
    ).lean();
    if (!cartToUpdate) {
      throw new Error(`Cart with id ${cartId} couldnt be updated`);
    } else {
      return cartToUpdate;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      let cart = await Cart.findById(cartId);
      if (!cart) {
        //cart doesnt exist
        const newCart = {
          _id: cartId,
          products: [{ product: productId, quantity }],
          quantity,
        };
        cart = await Cart.create(newCart);
      } else {
        //cart exists
        const existingProduct = cart?.products?.findIndex(
          (p) => p.products.toString() === productId
        );
        if (existingProductIndex !== -1) {
          // product exists in the cart, update quantity
          cart.products[productIndex].quantity += quantity;
        } else {
          // product doesn't exist in the cart, add it
          cart.products.push({ product: productId, quantity });
          cart.quantity = (cart.quantity || 0) + quantity;
        }
      }
      const updatedCart = await Cart.findByIdAndUpdate(cartId, cart, {
        new: true,
      }).lean();
      return updatedCart;
    } catch (error) {
      throw new Error(`Could not add product to Cart: ${error.message}`);
    }
  }
}
module.exports = CartManagerMongoDB;
