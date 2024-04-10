class User {
    constructor(db) {
        this.db = db;
    }

    create(userData, callback) {
        const { username, email, password } = userData;
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        this.db.run(query, [username, email, password], function(err) {
            callback(err, this.lastID); // this.lastID contains the ID of the newly inserted user
        });
    }

    findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';
        this.db.get(query, [email], function(err, row) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row); // row contains the user data if found, or undefined
            }
        });
    }
}

module.exports = User;
