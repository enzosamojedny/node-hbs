const CartManagerMongoDB = require("../../dao/CartManagerMongoDB");
const cartManagerMongoDB = new CartManagerMongoDB();
const express = require("express");
const router = express.Router();
//CART
//POST CART TO DB
const PostCart = router.post("/api/carts", async (req, res) => {
  try {
    const productDetails = req.body;

    if (!productDetails) {
      throw new Error("Product details not provided in the request body");
    }
    const addedProduct = await cartManagerMongoDB.addCart(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});

const GetCartId = router.get("/api/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Product ID not provided in the request");
    }
    const idCart = await cartManagerMongoDB.getCartById(id);
    res.status(200).json({ product: idCart });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});

//POST PRODUCT TO CART
const PostCartProduct = router.post(
  "/api/:cartid/product/:productid",
  (req, res) => {
    try {
      const { cartid, productid } = req.params;
      if (!cartid || !productid) {
        throw new Error("Missing data in request");
      }
      const quantity = 1;
      const postCartProduct = cartManagerMongoDB.addProductToCart(
        cartid,
        productid,
        quantity
      );
      res.status(200).json({ cart: postCartProduct });
    } catch (error) {
      if (error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);

//DELETE PRODUCT FROM CART
const DeleteProductFromCart = router.delete(
  "/api/:cartid/product/:productid",
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
      if (error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);

//UPDATE CART PRODUCT QUANTITY
const UpdateCartProductQuantity = router.put(
  "/api/:cartid/product/:productid",
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
      if (error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);

// DELETES THE WHOLE CART
const DeleteCart = router.delete("/api/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await cartManagerMongoDB.deleteCart(id);
    res.status(200).json({ deleteCart });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
module.exports = {
  PostCart,
  GetCartId,
  PostCartProduct,
  DeleteProductFromCart,
  UpdateCartProductQuantity,
  DeleteCart,
  cartManagerMongoDB,
};
