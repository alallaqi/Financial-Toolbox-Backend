const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load environment variables
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this as per your frontend setup
    credentials: true,
    methods: 'GET,POST,PUT,DELETE'
}));

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Financial Toolbox Backend is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
