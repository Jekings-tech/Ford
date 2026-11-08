const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getMakes, addMake, deleteMake } = require('../controllers/makeController');

router.get('/', getMakes);
router.post('/', upload.single('logo'), addMake); // Expects 'logo' file field
router.delete('/:id', deleteMake);
module.exports = router;