const clinicianModel = require('../models/clinician.model');

const getClinicians = async (req, res) => {
  try {
    const result = await clinicianModel.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createClinician = async (req, res) => {
  try {
    const { name, specialty } = req.body;

    if (!name || !specialty) {
      return res.status(400).json({ error: 'Name and specialty are required' });
    }

    const result = await clinicianModel.create(name, specialty);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getClinicians, createClinician };