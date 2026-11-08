const Make = require('../models/Make');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getMakes = async (req, res) => {
  try {
    const makes = await Make.find();
    res.status(200).json(makes);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addMake = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Logo is required' });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'apc_makes' }, (error, result) => {
        if (error) reject(error); else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const newMake = new Make({ name, logo: result.secure_url });
    await newMake.save();
    res.status(201).json(newMake);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteMake = async (req, res) => {
  try {
    await Make.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Make deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};