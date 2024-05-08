const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'db.sqlite3');

let db = new sqlite3.Database(dbPath);

class Calculation {
    constructor(db) {
        this.db = db;
    }

    create(calcData, callback) {
        const { user_id, type, parameters, result, timestamp } = calcData;
        const query = 'INSERT INTO calculations (user_id, type, parameters, result, timestamp) VALUES (?, ?, ?, ?, ?)';

        this.db.run(query, [user_id, type, parameters, result, timestamp], function(err) {
            callback(err, this.lastID);
        });
    }

    findByUserId(userId, callback) {
        const query = 'SELECT * FROM calculations WHERE user_id = ?';
        this.db.all(query, [userId], (err, rows) => {
            callback(err, rows);
        });
    }
}

module.exports = Calculation;
