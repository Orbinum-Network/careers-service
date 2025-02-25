const db = require('../db/db');

class CareerModel {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT id, title, location FROM careers", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, title, location, employment_type, department, description, state, requirements FROM careers WHERE id = ?`;
            const values = [id];

            db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        row.requirements = row.requirements ? JSON.parse(row.requirements) : [];
                    }
                    resolve(row);
                }
            });
        });
    }

    static create(careerData) {
        return new Promise((resolve, reject) => {
            const { id, title, location, employment_type, department, description, state, requirements } = careerData;

            const sql = `
                INSERT INTO careers (id, title, location, employment_type, department, description, state, requirements) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [id, title, location, employment_type, department, description, state, JSON.stringify(requirements || [])];

            db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, title, location, employment_type, department, description, state, requirements });
                }
            });
        });
    }

    static update(careerData) {
        return new Promise((resolve, reject) => {
            const { id, title, location, employment_type, department, description, state, requirements } = careerData;

            const sql = `
                UPDATE careers
                SET title = ?, location = ?, employment_type = ?, department = ?, description = ?, state = ?, requirements = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?;
            `;
            const values = [title, location, employment_type, department, description, state, JSON.stringify(requirements || []), id];

            db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes > 0) {
                        resolve({ id, ...careerData });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM careers WHERE id = ?`;
            const values = [id];

            db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes > 0) {
                        resolve();
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
}

module.exports = CareerModel;