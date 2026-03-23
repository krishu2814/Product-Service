const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        index: true
    },

    brand: {
        type: String,
        trim: true
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    // multiple images for a product
    images: [
        {
            type: String
        }
    ],

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    numReviews: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
