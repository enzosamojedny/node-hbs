const Products = require("../models/Products");
const { randomUUID } = require("crypto");
class ProductManagerMongoDB {
  async addProduct(product) {
    product._id = randomUUID();
    const productCreated = await Products.create(product);
    return productCreated.toObject();
  }

  async getProductsDetail() {
    return await Products.find().lean();
  }
  async getProductsOverview() {
    const result = await Products.find()
      .select(
        "title price stock discountPercentage code category rating thumbnail"
      )
      .lean();
    return result;
  }

  async getProductByName(title) {
    const found = await Products.find({
      title: { $regex: new RegExp(title, "i") },
    }).lean();
    if (found.length === 0) {
      throw new Error(`Product with name ${title} not found`);
    } else {
      return found;
    }
  }
  async getProductByCode(code) {
    const found = await Products.find({
      code: { $regex: new RegExp(code, "i") }, //!
    }).lean();
    if (found.length === 0) {
      throw new Error(`Product with name ${code} not found`);
    } else {
      return found;
    }
  }

  async deleteProduct(productId) {
    const productToDelete = await Products.findByIdAndDelete({
      productId,
    }).lean();
    if (!productToDelete) {
      throw new Error(`Product with id ${productId} couldnt be deleted`);
    } else {
      return productToDelete;
    }
  }

  async updateProduct(productId, updatedProduct) {
    const productToUpdate = await Products.findByIdAndUpdate(
      productId,
      updatedProduct,
      {
        new: true,
      }
    ).lean();
    if (!productToUpdate) {
      throw new Error(`Product with id ${productId} couldnt be updated`);
    } else {
      return productToUpdate;
    }
  }
}
module.exports = ProductManagerMongoDB;
