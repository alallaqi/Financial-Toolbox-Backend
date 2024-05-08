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
      db.serialize(() => {
        db.run(`ALTER TABLE calculations ADD COLUMN duration TEXT;`, (err) => {
          if (err) console.error("Error adding duration column:", err.message);
          else console.log("Duration column added successfully.");
        });
      
        db.run(`ALTER TABLE calculations ADD COLUMN error TEXT;`, (err) => {
          if (err) console.error("Error adding error column:", err.message);
          else console.log("Error column added successfully.");
        });
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
