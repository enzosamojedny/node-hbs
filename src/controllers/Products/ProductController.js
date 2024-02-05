const ProductManagerMongoDB = require("../../daos/managers/ProductManagerMongoDB");
const productManagerMongoDB = new ProductManagerMongoDB();
const express = require("express");
const router = express.Router();
const ProductPaginationModel = require("../../daos/models/Products");
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
      select:
        "title price stock discountPercentage category rating thumbnail code",
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

const ProductByName = router.post("/api/products/search", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw new Error("Product name is required as a body parameter");
    }

    const product = await productManagerMongoDB.getProductByName(title);

    if (product) {
      res.status(200).json({ product });
    } else {
      throw new Error(`Product with name ${title} not found in the database`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const ProductByCode = router.get(
  "/api/product/detail/code/:code",
  async (req, res) => {
    try {
      const { code } = req.params;
      console.log(code);
      if (!code) {
        throw new Error("Product code is required as a query parameter");
      }
      const product = await productManagerMongoDB.getProductByCode(code);
      if (product) {
        res.status(200).json({ product });
      } else {
        throw new Error(`Product with code ${code} not found in the database`);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

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

const UpdateProductQuantity = router.put("/api/products", async (req, res) => {
  try {
    const { _id, quantity } = req.body;
    if (!_id || !quantity) {
      throw new Error("Both _id and quantity are required to update products");
    }
    const updateProduct = await productManagerMongoDB.updateProduct(
      _id,
      quantity
    );
    res.status(200).json({
      message: "Product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const DeleteProduct = router.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productManagerMongoDB.deleteProduct(id);
    res.status(200).json({
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = {
  Products,
  ProductByName,
  ProductByCode,
  AddProduct,
  UpdateProductQuantity,
  DeleteProduct,
  productManagerMongoDB,
};
