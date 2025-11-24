const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Trang chủ
router.get('/', ProductController.showHomePage);

// Tìm kiếm
router.get('/search', ProductController.searchProducts);

// Thêm sản phẩm
router.get('/add', ProductController.showAddForm);
router.post('/add', ProductController.addProduct);

// Sửa sản phẩm
router.get('/edit/:id', ProductController.showEditForm);
router.post('/edit/:id', ProductController.updateProduct);

// Xóa sản phẩm
router.post('/delete/:id', ProductController.deleteProduct);

module.exports = router;