const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('fitsModels', 'name yearStart yearEnd');
    res.status(200).json(products);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, originalPrice, salePrice, condition, fitsModels } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const imageUrls = [];
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'apc_products' }, (error, result) => {
          if (error) reject(error); else resolve(result);
        });
        stream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }

    // fitsModels comes as a JSON string from the frontend, so we parse it
    const parsedModels = JSON.parse(fitsModels);

    const newProduct = new Product({
      name, description, category, originalPrice, salePrice, condition, 
      fitsModels: parsedModels, 
      images: imageUrls 
    });
    
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};