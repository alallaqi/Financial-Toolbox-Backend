const Calculation = require('../models/Calculation');

exports.addCalculation = (req, res) => {
  const { userId, type, parameters, result } = req.body;
  Calculation.insertCalculation(userId, type, parameters, result, (err, calcId) => {
    if (err) return res.status(500).json({ message: 'Error storing calculation', error: err.message });
    res.json({ message: 'Calculation stored successfully', id: calcId });
  });
};

exports.getCalculations = (req, res) => {
  const { userId } = req.params;
  Calculation.getCalculationsByUser(userId, (err, calculations) => {
    if (err) return res.status(500).json({ message: 'Error fetching calculations', error: err.message });
    res.json({ calculations });
  });
};
