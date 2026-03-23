const Product = require('../model/product-model');

class ProductRepository {

    async getAllProducts(query) {
        console.log('Query received in repository:', query);
        let filter = {};

        // search
        if (query.search) {
            filter.$text = { $search: query.search };
        }

        // category
        if (query.category) {
            filter.category = query.category;
        }

        // price filter
        if (query.price) {
            filter.price = {};
            if (query.price.gte) filter.price.$gte = Number(query.price.gte);
            if (query.price.lte) filter.price.$lte = Number(query.price.lte);
        }

        // pagination
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        // sorting
        let sort = {};
        if (query.sort) {
            const field = query.sort.startsWith('-') ? query.sort.substring(1) : query.sort;
            sort[field] = query.sort.startsWith('-') ? -1 : 1;
        }
        console.log('Filter:', filter);

        return await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    }   
    
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

}

module.exports = ProductRepository;
