const Products = require("../models/Products");

class ProductManagerMongoDB {
  async addProduct(product) {
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

  async updateProducts(updateData) {
    try {
      const updatedProducts = await Promise.all(
        updateData?.map(async ({ _id, quantity }) => {
          try {
            const updatedProduct = await Products.findByIdAndUpdate(
              _id,
              { quantity },
              { new: true }
            ).lean();

            if (!updatedProduct) {
              return { error: `Product with id ${_id} couldn't be updated` };
            }

            return updatedProduct;
          } catch (error) {
            return {
              error: `Error updating product with id ${_id}: ${error.message}`,
            };
          }
        })
      );

      const errors = updatedProducts?.filter((product) => product.error);

      if (errors.length > 0) {
        throw new Error(
          `Error updating products: ${errors
            .map((err) => err.error)
            .join(", ")}`
        );
      }

      return updatedProducts?.filter((product) => !product.error);
    } catch (error) {
      throw new Error(`Error updating products: ${error.message}`);
    }
  }
}
module.exports = ProductManagerMongoDB;
