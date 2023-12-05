const ProductManagerMongoDB = require("../../dao/ProductManagerMongoDB");
const productManagerMongoDB = new ProductManagerMongoDB();
const express = require("express");
const router = express.Router();

//PRODUCTS
const Products = router.get("/products", async (req, res) => {
  try {
    const products = await productManagerMongoDB.getProducts();
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort = req.query.sort;
    if (!isNaN(limit) && limit > 0 && !isNaN(page) && page > 0 && sort) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sortedProducts = products.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
      const limitedProducts = sortedProducts.slice(startIndex, endIndex);

      res.status(200).json({ products: limitedProducts });
    } else {
      res.status(200).json({ products: products });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
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
    res.status(500).send({ message: error.message });
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
    res.status(500).send({ message: error.message });
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
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const DeleteProduct = router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productManagerMongoDB.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = {
  Products,
  ProductId,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  productManagerMongoDB,
};
