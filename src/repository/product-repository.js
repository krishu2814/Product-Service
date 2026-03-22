const Product = require('../model/product-model');

class ProductRepository {
    
    // Create Product
    async createProduct(data) {
        try {
            const product = await Product.create(data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    // Get Single Product
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // Update Product
    async updateProduct(id, data) {
        try {
            return await Product.findByIdAndUpdate(id, data, {
                new: true, // return updated document
            });
        } catch (error) {
            throw error;
        }
    }

    // Delete Product
    async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            return await Product.find({});
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductRepository;
