const express = require("express");
const ProductManager = require("./ProductManager");
const CartManager = require("./CartManager");
const router = express.Router();
const productManager = new ProductManager([], "./src/Logs/Logs.json");
const cartManager = new CartManager([], "./src/Logs/Cart.json");

const Products = router.get("/products", (req, res) => {
  try {
    const products = productManager.getProducts();
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

const ProductId = router.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const products = productManager.getProductById(id);
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
const AddProduct = router.post("/products", (req, res) => {
  try {
    const productDetails = req.body;
    if (!productDetails) {
      throw new Error("Product details not provided in the request body");
    }
    const addedProduct = productManager.addProduct(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const UpdateProduct = router.put("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const productToUpdate = req.body;
    if (!productToUpdate) {
      throw new Error("Product details not provided in the request body");
    }
    const updateProduct = productManager.updateProduct(id, productToUpdate);
    res.status(200).json({ updateProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const DeleteProduct = router.delete("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = productManager.deleteProduct(id);
    res.status(200).json({ deleteProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const PostCart = router.post("/api/carts", (req, res) => {
  try {
    const productDetails = req.body;

    if (!productDetails) {
      throw new Error("Product details not provided in the request body");
    }
    const addedProduct = cartManager.addCart(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});

const GetCartId = router.get("/api/carts/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Product ID not provided in the request");
    }
    const idCart = cartManager.getCartById(id);
    res.status(200).json({ product: idCart });
  } catch (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }
  }
});
const PostCartProduct = router.post(
  "/api/:cartid/product/:productid",
  (req, res) => {
    try {
      const { cartid, productid } = req.params;
      if (!cartid || !productid) {
        throw new Error("Missing data in request");
      }
      const quantity = 1;
      const postCartProduct = cartManager.addProductToCart(
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
module.exports = {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  PostCart,
  GetCartId,
  PostCartProduct,
};
