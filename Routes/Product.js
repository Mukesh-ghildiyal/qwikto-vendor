const express = require('express');
const {
    addProduct,
    getVendorProducts,
    editProduct,
    deleteProduct,
} = require('../controllers/productController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), addProduct);
router.get('/', authMiddleware, getVendorProducts);
router.put('/edit/:id', authMiddleware, upload.single('image'), editProduct);
router.delete('/delete/:id', authMiddleware, deleteProduct);

module.exports = router;
