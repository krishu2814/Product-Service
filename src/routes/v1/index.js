const express = require('express');
const router = express.Router();

const ProductController = require('../../controller/product-controller');
const Authentication = require('../../middleware/Role-Authorize');
const productController = new ProductController();

router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.post('/', Authentication('admin', 'vendor'), productController.createProduct.bind(productController));
router.patch('/:id',()=>{console.log("krishu")}, Authentication('admin', 'vendor'), productController.updateProduct.bind(productController));
router.delete('/:id', Authentication('admin'), productController.deleteProduct.bind(productController));

module.exports = router;
