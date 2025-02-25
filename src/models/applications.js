const db = require('../db/db');

class ApplicationModel {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT career_id, user_ip, application_date FROM applications", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getByUserIp(user_ip, career_id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT career_id, user_ip, application_date FROM applications WHERE user_ip = ? AND career_id = ?`;
            const values = [user_ip, career_id];

            db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static create(clientIpAddress, career_id) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO applications (career_id, user_ip) 
                VALUES (?, ?)
            `;
            const values = [career_id, clientIpAddress];

            db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ career_id, clientIpAddress });
                }
            });
        })
    }
}

module.exports = ApplicationModel;