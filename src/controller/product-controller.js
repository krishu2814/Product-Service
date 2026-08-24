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
            const isDuplicate = error.code === 11000 || error.message.includes('E11000');
            const statusCode = isDuplicate ? 409 : 400;
            const message = isDuplicate ? 'A product with this name already exists' : error.message;

            return res.status(statusCode).json({
                success: false,
                message,
                data: {},
                err: error.message
            });
        }
    }

    // Get All Products
    async getAllProducts(req, res) {
        try {
            const result = await this.productService.getAllProducts(req.query);
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
                data: result.products,
                pagination: result.pagination,
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
            // console.log(req.params.id);
            const deletedProduct = await this.productService.deleteProduct(req.params.id);
            // console.log('Deleted product:', deletedProduct);
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
