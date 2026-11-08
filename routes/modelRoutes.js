const express = require('express');
const router = express.Router();
const Model = require('../models/Model');

// GET all models
router.get('/', async (req, res) => {
  try {
    const models = await Model.find().populate('make', 'name');
    res.status(200).json(models);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// ADD a model
router.post('/', async (req, res) => {
  try {
    const { make, name, yearStart, yearEnd } = req.body;
    const newModel = new Model({ make, name, yearStart, yearEnd });
    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// DELETE a model
router.delete('/:id', async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Model deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;