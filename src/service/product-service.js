const ProductRepository = require("../repository/product-repository");
const { publishEvent } = require("../config/rabbitmq");
const {
  getCache,
  setCache,
  deleteKey,
  deletePattern,
} = require("../utils/cache-helper");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data) {
    try {
      const product = await this.productRepository.createProduct(data);

      // Invalidate all product listings cache
      await deletePattern("products:list:*");

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
      const cacheKey = `product:${id}`;

      // 1. Check Redis cache (Cache-Aside)
      const cachedProduct = await getCache(cacheKey);
      if (cachedProduct) {
        return {
          data: cachedProduct,
          isFromCache: true,
        };
      }

      // 2. Query MongoDB on Cache MISS
      const product = await this.productRepository.getProductById(id);

      if (product) {
        // Cache for 1 hour (3600 seconds)
        await setCache(cacheKey, product, 3600);
      }

      return {
        data: product,
        isFromCache: false,
      };
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  async getAllProducts(query) {
    try {
      const queryHash = Buffer.from(JSON.stringify(query || {})).toString("base64");
      const cacheKey = `products:list:${queryHash}`;

      // 1. Check Redis cache
      const cachedList = await getCache(cacheKey);
      if (cachedList) {
        return {
          ...cachedList,
          isFromCache: true,
        };
      }

      // 2. Query MongoDB on Cache MISS
      const result = await this.productRepository.getAllProducts(query);

      if (result) {
        // Cache list results for 5 minutes (300 seconds)
        await setCache(cacheKey, result, 300);
      }

      return {
        ...result,
        isFromCache: false,
      };
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

      // Invalidate specific product cache & listings cache
      await deleteKey(`product:${id}`);
      await deletePattern("products:list:*");

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
        // Invalidate specific product cache & listings cache
        await deleteKey(`product:${id}`);
        await deletePattern("products:list:*");

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
