const ProductManagerMongoDB = require("../../dao/ProductManagerMongoDB");
const productManagerMongoDB = new ProductManagerMongoDB();
const express = require("express");
const router = express.Router();
const ProductPaginationModel = require("../../dao/models/Products");
//PRODUCTS
const Products = router.get("/api/products", async (req, res) => {
  try {
    const products = await productManagerMongoDB.getProductsOverview();
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "asc";
    const options = {
      page,
      limit,
      select: "title price stock discountPercentage category rating thumbnail",
      sort: { price: sort === "asc" ? 1 : -1 },
      collation: { locale: "en" },
    };

    const result = await ProductPaginationModel.paginate({}, options);
    res.status(200).json({
      status: "success" || "error",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}`
        : null,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const ProductId = router.get("/api/products/:id", async (req, res) => {
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
const AddProduct = router.post("/api/products", async (req, res) => {
  try {
    const productDetails = req.body;
    if (!productDetails) {
      throw new Error(
        "Product data not provided in the request body when adding a new product"
      );
    }
    const addedProduct = await productManagerMongoDB.addProduct(productDetails);
    //! error in res when i post several products
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const UpdateProduct = router.put("/api/products/:id", async (req, res) => {
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
const DeleteProduct = router.delete("/api/products/:id", async (req, res) => {
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
