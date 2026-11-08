const Model = require('../models/Model');

exports.getModels = async (req, res) => {
  try {
    const models = await Model.find().populate('make', 'name');
    res.status(200).json(models);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addModel = async (req, res) => {
  try {
    const { make, name, yearStart, yearEnd } = req.body;
    const newModel = new Model({ make, name, yearStart, yearEnd });
    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteModel = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Model deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};