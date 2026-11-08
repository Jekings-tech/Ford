const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getCategories, addCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', upload.single('image'), addCategory);
router.delete('/:id', deleteCategory);
module.exports = router;