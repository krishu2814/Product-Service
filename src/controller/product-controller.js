const ProductService = require('../service/product-service');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }
    // Create Product
    async createProduct(req, res) {
        try {
            const product = await this.productService.createProduct(req.body);

            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product,
                err: {}
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: {},
                err: error
            });
        }
    }

    // Get All Products
    async getAllProducts(req, res) {
        try {
            console.log('Query received in controller:', req.query);
            const products = await this.productService.getAllProducts(req.query);
            console.log('Products fetched in controller:', products);
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
                data: products,
                err: {}
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: {},
                err: error
            });
        }
    }

    // Get Product by ID
    async getProductById(req, res) {
        try {
            const product = await this.productService.getProductById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                    data: {},
                    err: {}
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Product fetched successfully',
                data: product,
                err: {}
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: {},
                err: error
            });
        }
    }

    // Update Product
    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.productService.updateProduct(
                req.params.id,
                req.body
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                    data: {},
                    err: {}
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: updatedProduct,
                err: {}
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: {},
                err: error
            });
        }
    }

    // Delete Product
    async deleteProduct(req, res) {
        try {
            const deletedProduct = await this.productService.deleteProduct(req.params.id);

            if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                    data: {},
                    err: {}
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
                data: {},
                err: {}
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: {},
                err: error
            });
        }
    }
}

module.exports = ProductController;
