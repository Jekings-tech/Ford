const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', upload.array('images', 10), addProduct); // Expects up to 10 'images'
router.delete('/:id', deleteProduct);
router.put('/:id', upload.array('images', 10), editProduct);
module.exports = router;