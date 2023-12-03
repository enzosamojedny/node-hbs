const express = require("express");
const ProductManagerMongoDB = require("./dao/ProductManagerMongoDB");
const productManagerMongoDB = new ProductManagerMongoDB();
const messagesManager = require("./dao/MessagesManager");
const CartManagerMongoDB = require("./dao/CartManagerMongoDB");
const messagesManagerMongoDB = new messagesManager();
const cartManagerMongoDB = new CartManagerMongoDB();
const router = express.Router();

//PRODUCTS
const Products = router.get("/products", async (req, res) => {
  try {
    const products = await productManagerMongoDB.getProducts();
    if (req.query.limit) {
      const limit = req.query.limit;
      const limitedProducts = products.slice(0, limit);
      res.status(200).json({ products: limitedProducts });
    } else {
      res.status(200).json({ products: products });
    }
  } catch (error) {
    if (error) {
      res.status(404).send({ message: error.message });
    }
  }
});

const ProductId = router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productManagerMongoDB.getProductById(id);
    if (products) {
      res.status(200).json({ products });
    } else {
      throw new Error(`Product with ID ${id} not found in the database`);
    }
  } catch (error) {
    if (error) {
      res.status(404).send({ message: error.message });
    }
  }
});
const AddProduct = router.post("/products", async (req, res) => {
  try {
    const productDetails = req.body;
    if (!productDetails) {
      throw new Error(
        "Product data not provided in the request body when adding a new product"
      );
    }
    const addedProduct = await productManagerMongoDB.addProduct(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const UpdateProduct = router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productToUpdate = req.body;
    if (!productToUpdate) {
      throw new Error("Product details not provided in the request body");
    }
    const updateProduct = await productManagerMongoDB.updateProduct(
      id,
      productToUpdate
    );
    res.status(200).json({ updateProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const DeleteProduct = router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productManagerMongoDB.deleteProduct(id);
    res.status(200).json({ deleteProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});

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

//MESSAGES
const PostMessages = router.post("/api/messages", async (req, res) => {
  try {
    const messageDetails = req.body;
    if (!messageDetails) {
      throw new Error("Message details not provided in the request body");
    }
    const addedMessage = await messagesManagerMongoDB.addMessage(
      messageDetails
    );
    res.status(200).json({ message: addedMessage });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const GetMessages = router.get("/api/messages", async (req, res) => {
  try {
    const messages = await messagesManagerMongoDB.getMessages();
    if (req.query.limit) {
      const limit = req.query.limit;
      const limitedMessages = messages.slice(0, limit);
      res.status(200).json({ messages: limitedMessages });
    } else {
      res.status(200).json({ messages: messages });
    }
  } catch (error) {
    if (error) {
      res.status(404).send({ message: error.message });
    }
  }
});
const GetMessagesId = router.get("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await messagesManagerMongoDB.getMessageById(id);
    if (messages) {
      res.status(200).json({ messages });
    } else {
      throw new Error(`Message with ID ${id} not found in the database`);
    }
  } catch (error) {
    if (error) {
      res.status(404).send({ message: error.message });
    }
  }
});
const DeleteMessages = router.delete("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMessage = await messagesManagerMongoDB.deleteMessage(id);
    res.status(200).json({ deleteMessage });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const UpdateMessages = router.put("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const messageToUpdate = req.body;
    if (!messageToUpdate) {
      throw new Error("Message details not provided in the request body");
    }
    const updateMessage = await messagesManagerMongoDB.updateMessage(
      id,
      messageToUpdate
    );
    res.status(200).json({ updateMessage });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
module.exports = {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  PostCart,
  GetCartId,
  PostCartProduct,
  DeleteProductFromCart,
  UpdateCartProductQuantity,
  DeleteCart,
  productManagerMongoDB,
  PostMessages,
  GetMessages,
  GetMessagesId,
  DeleteMessages,
  UpdateMessages,
};
