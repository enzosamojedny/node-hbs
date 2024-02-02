const CartManagerMongoDB = require("../../dao/managers/CartManagerMongoDB");
const cartManagerMongoDB = new CartManagerMongoDB();
const express = require("express");
const router = express.Router();

//CART
//POST CART TO DB

const PostCart = router.post("/api/carts", async (req, res) => {
  try {
    const productDetails = req.body;
    console.log("product details", productDetails);
    if (!productDetails) {
      throw new Error("Product details not provided in the request body");
    }
    const addedProduct = await cartManagerMongoDB.addCart(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const GetCartId = router.get("/api/carts/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("UserID not provided in the request");
    }
    const userCart = await cartManagerMongoDB.getCartById(userId);
    res.status(200).json({ cart: userCart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//FIND CART BY USER ID
const PostUserCart = router.post("/api/carts/usercart", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("Missing data in request");
    }
    const findUserById = await cartManagerMongoDB.getCartById(userId);
    console.log(findUserById);
    res.status(200).json({ cart: findUserById });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE 1 PRODUCT FROM CART
const DeleteProductFromCart = router.delete(
  "/api/carts/:cartid/products/:productid",
  (req, res) => {
    try {
      const { cartid, productid } = req.params;
      if (!cartid || !productid) {
        throw new Error("Missing data in request");
      }
      const deleteProductFromCart = cartManagerMongoDB.deleteProductFromCart(
        cartid,
        productid
      );
      res.status(200).json({ cart: deleteProductFromCart });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

//UPDATE CART PRODUCT QUANTITY
const UpdateCartProductQuantity = router.put(
  "/api/carts/:cartid/products/:productid",
  (req, res) => {
    try {
      const { cartid, productid } = req.params;
      if (!cartid || !productid) {
        throw new Error("Missing data in request");
      }
      const quantity = req.body.quantity;
      const updateCartProductQuantity =
        cartManagerMongoDB.updateCartProductQuantity(
          //* I DELETED DATA FROM HERE SO THAT ONLY THE QUANTITY IS UPDATED
          quantity
        );
      res.status(200).json({ cart: updateCartProductQuantity });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

const UpdateCart = router.put("/api/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartToUpdate = req.body;
    if (!cartToUpdate) {
      throw new Error("Cart details not provided in the request body");
    }
    const updateCart = await cartManagerMongoDB.updateCart(id, cartToUpdate);
    res.status(200).json({ cart: updateCart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETES THE WHOLE CART
const DeleteCart = router.delete("/api/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await cartManagerMongoDB.deleteCart(id);
    res.status(200).json({ deleteCart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = {
  PostCart,
  GetCartId,
  PostUserCart,
  DeleteProductFromCart,
  UpdateCartProductQuantity,
  DeleteCart,
  UpdateCart,
  cartManagerMongoDB,
};
