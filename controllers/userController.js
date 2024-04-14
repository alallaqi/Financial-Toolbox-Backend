const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const db = require('../db/database'); // Adjust this path if necessary to point to your database connection setup.

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Ensure you have your secret set in environment variables or defined here.

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(db);
    user.create({ username, email, password: hashedPassword }, async (err, userId) => {
        if (err) {
            return res.status(500).json({ message: 'Error registering new user', error: err.message });
        }
        // Assume the user is immediately logged in upon registration; generate a token
        const token = jwt.sign({ id: userId, email: email, username: username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', user: { id: userId, email: email, username: username }, token });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = new User(db); // Pass the db instance here
    user.findByEmail(email, async (err, userRow) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user', error: err.message });
        }
        if (!userRow) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, userRow.password);
        if (match) {
            const token = jwt.sign({ id: userRow.id, email: userRow.email, username: userRow.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token, user: { id: userRow.id, email: userRow.email, username: userRow.username } });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    });
};
