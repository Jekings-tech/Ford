const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'apc_categories' }, (error, result) => {
        if (error) reject(error); else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const newCategory = new Category({ name, image: result.secure_url });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};