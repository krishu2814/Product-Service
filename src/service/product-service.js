const ProductRepository = require("../repository/product-repository");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data) {
    try {
      const product = await this.productRepository.createProduct(data);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.getProductById(id);
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  async getAllProducts(query) {
    try {
      const products = await this.productRepository.getAllProducts(query);
      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
        id,
        data,
      );
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.productRepository.deleteProduct(id);

      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

module.exports = ProductService;
