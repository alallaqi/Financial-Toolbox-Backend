const express = require('express');
const calculationsController = require('../controllers/calculationsController');
const router = express.Router();

router.post('/add', calculationsController.addCalculation);
router.get('/:userId', calculationsController.getCalculations);

module.exports = router;
