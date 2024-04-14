const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticationToken');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

// Example of a protected route
router.get('/session', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the restricted area', user: req.user });
});

module.exports = router;
