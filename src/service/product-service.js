const ProductRepository = require("../repository/product-repository");
const { publishEvent } = require("../config/rabbitmq");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data) {
    try {
      const product = await this.productRepository.createProduct(data);

      // Publish PRODUCT_CREATED event to automatically initialize stock in Inventory-Service
      const initialStock = Number(data.stock) >= 0 ? Number(data.stock) : 0;
      await publishEvent("PRODUCT_CREATED", {
        event: "PRODUCT_CREATED",
        productId: product._id.toString(),
        quantity: initialStock,
        timestamp: new Date().toISOString(),
      });

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
      const result = await this.productRepository.getAllProducts(query);
      return result;
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

      if (deletedProduct) {
        // Publish PRODUCT_DELETED event to clean up Inventory-Service records
        await publishEvent("PRODUCT_DELETED", {
          event: "PRODUCT_DELETED",
          productId: id.toString(),
          timestamp: new Date().toISOString(),
        });
      }

      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

module.exports = ProductService;
