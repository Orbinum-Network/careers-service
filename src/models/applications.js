const db = require('../db/db');

class ApplicationModel {
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