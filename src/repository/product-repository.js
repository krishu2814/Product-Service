const Product = require("../model/product-model");

class ProductRepository {
  async getAllProducts(query) {
    // console.log("Query received in repository:", query);
    let filter = {};
    if (query.search) {
      filter.$text = { $search: query.search };
    }
    if (query.category) {
      filter.category = query.category;
    }
    const minPrice = query.minPrice !== undefined ? query.minPrice : query.price?.gte;
    const maxPrice = query.maxPrice !== undefined ? query.maxPrice : query.price?.lte;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    let sort = {};
    if (query.sort) {
      const field = query.sort.startsWith("-")
        ? query.sort.substring(1)
        : query.sort;

      sort[field] = query.sort.startsWith("-") ? -1 : 1;
    }
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async createProduct(data) {
    try {
      const product = await Product.create(data);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
