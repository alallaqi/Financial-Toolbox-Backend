const express = require('express');
const app = express();

// Middleware to parse JSON bodies. This should come before any routes are defined.
app.use(express.json());

// Setup database connection
const db = require('./db/database');

// Import and use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Root route for basic API response
app.get('/', (req, res) => {
  res.send('Financial Toolbox Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Export the app for testing
module.exports = app;
