const Products = require("../dao/models/Products");
const { randomUUID } = require("crypto");
class ProductManagerMongoDB {
  async addProduct(product) {
    product._id = randomUUID();
    const productCreated = await Products.create(product);
    return productCreated.toObject();
  }

  async getProducts() {
    return await Products.find().lean(); //!no funciona en el create
  }

  async getProductById(productId) {
    const found = await Products.findById({ productId }).lean();
    if (!found) {
      throw new Error(`Product with id ${productId} not found`);
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
