const express = require('express');
const db = require('../db/database');
const router = express.Router();

// User registration
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Here you would normally hash the password before storing it
  const query = `INSERT INTO users (username, email, password, date_of_registration) VALUES (?, ?, ?, ?)`;
  
  db.run(query, [username, email, password, new Date().toISOString()], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'User registered successfully', id: this.lastID });
  });
});

module.exports = router;
