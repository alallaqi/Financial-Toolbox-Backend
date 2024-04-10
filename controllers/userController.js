const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const db = require('../db/database'); // Adjust the path as needed

const saltRounds = 10;

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User(db);
        user.create({ username, email, password: hashedPassword }, (err, userId) => {
            if (err) {
                console.error(err); // Log the error to the console for debugging
                return res.status(500).json({ message: 'Error registering new user', error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId });
        });
    } catch (error) {
        console.error(error); // Log any error that might have occurred during hashing or other operations
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    // Assuming User.findByEmail is implemented in UserModel
    const user = new User(db);
    user.findByEmail(email, async (err, userRow) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user', error: err.message });
        }
        if (!userRow) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Compare provided password with hashed password in database
        const match = await bcrypt.compare(password, userRow.password);
        if (match) {
            // Passwords match, login successful
            res.json({ message: 'Login successful', user: { id: userRow.id, email: userRow.email } });
        } else {
            // Passwords do not match, login failed
            res.status(401).json({ message: 'Login failed' });
        }
    });
};
