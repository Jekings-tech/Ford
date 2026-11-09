const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// FIXED: Added editProduct to the import list
const { getProducts, addProduct, editProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', upload.array('images', 10), addProduct);
router.put('/:id', upload.array('images', 10), editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;