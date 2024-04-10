const express = require('express');
const userController = require('../controllers/userController'); // Adjust the path as needed
const router = express.Router();

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

module.exports = router;
