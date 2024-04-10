const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'db.sqlite3');

// Open the database
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            date_of_registration TEXT
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          console.log('Table `users` created.');
          // Here you can insert default users if necessary
        }
      });  

    db.run(`CREATE TABLE calculations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            type TEXT,
            parameters TEXT,
            result TEXT,
            timestamp TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created
          console.log('Table `calculations` created.');
        }
      });
  }
});

module.exports = db;
