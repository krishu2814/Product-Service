const express = require('express');
const router = express.Router();

const ProductController = require('../../controller/product-controller');
const productController = new ProductController();

router.post('/products', productController.createProduct.bind(productController));
router.get('/products', productController.getAllProducts.bind(productController));
router.get('/products/:id', productController.getProductById.bind(productController));
router.patch('/products/:id', productController.updateProduct.bind(productController));
router.delete('/products/:id', productController.deleteProduct.bind(productController));

module.exports = router;
