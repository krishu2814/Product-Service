const ProductService = require("../service/product-service");
const { NotFoundError } = require("../utils/errors/app-error");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  // Create Product
  async createProduct(req, res, next) {
    try {
      const product = await this.productService.createProduct(req.body);
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // Get All Products
  async getAllProducts(req, res, next) {
    try {
      const result = await this.productService.getAllProducts(req.query);

      res.setHeader("X-Cache", result.isFromCache ? "HIT" : "MISS");

      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result.products,
        pagination: result.pagination,
        isFromCache: result.isFromCache,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // Get Product by ID
  async getProductById(req, res, next) {
    try {
      const result = await this.productService.getProductById(req.params.id);

      if (!result.data) {
        throw new NotFoundError(`Product not found with ID: ${req.params.id}`, "PRODUCT_NOT_FOUND");
      }

      res.setHeader("X-Cache", result.isFromCache ? "HIT" : "MISS");

      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: result.data,
        isFromCache: result.isFromCache,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // Update Product
  async updateProduct(req, res, next) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        req.params.id,
        req.body,
      );

      if (!updatedProduct) {
        throw new NotFoundError(`Product not found with ID: ${req.params.id}`, "PRODUCT_NOT_FOUND");
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete Product
  async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await this.productService.deleteProduct(
        req.params.id,
      );

      if (!deletedProduct) {
        throw new NotFoundError(`Product not found with ID: ${req.params.id}`, "PRODUCT_NOT_FOUND");
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: {},
        err: {},
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
