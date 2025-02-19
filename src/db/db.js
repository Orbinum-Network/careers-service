const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./src/db/careers.db');

db.serialize(() => {
    fs.readFile('./src/db/schema.sql', 'utf8', (err, sql) => {
        if (err) {
            console.error('Error reading the schema.sql file:', err);
            return;
        }

        db.exec(sql, (err) => {
            if (err) {
                console.error('Error creating tables:', err);
            } else {
                console.log('Tables created or already exist.');
            }
        });
    })
})

module.exports = db;