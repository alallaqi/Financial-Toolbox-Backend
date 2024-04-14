class User {
    constructor(db) {
        if (!db) {
            throw new Error("A database connection must be provided!");
        }
        this.db = db;
    }

    create(userData, callback) {
        const { username, email, password } = userData;
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        this.db.run(query, [username, email, password], function(err) {
            if (err) {
                return callback(err, null);
            }
            callback(null, this.lastID); // 'this' refers to the statement context here, not the User instance
        });
    }

    findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';

        // Using arrow function to maintain context of 'this'
        this.db.get(query, [email], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row); // row contains the user data if found, or undefined
        });
    }
}

module.exports = User;
