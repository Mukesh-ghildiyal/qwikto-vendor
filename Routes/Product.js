const express = require('express');
const {
    addProduct,
    getVendorProducts,
    editProduct,
    deleteProduct,
} = require('../controllers/productController');
const { productUpload } = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, productUpload.single('image'), addProduct);
router.get('/', authMiddleware, getVendorProducts);
router.put('/edit/:id', authMiddleware, productUpload.single('image'), editProduct);
router.delete('/delete/:id', authMiddleware, deleteProduct);

module.exports = router;
