const express = require('express');
const app = express();


const db = require('./database');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Financial Toolbox Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app; // Export for testing


  