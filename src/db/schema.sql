CREATE TABLE IF NOT EXISTS careers (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    employment_type TEXT CHECK(employment_type in ('Full Time', 'Part Time', 'Freelance')),
    department VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL DEFAULT '[]',
    state TEXT CHECK(state in ('FINISHED', 'CANCELLED', 'ACTIVE')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    career_id TEXT NOT NULL,
    user_ip TEXT NOT NULL,
    application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (career_id) REFERENCES careers(id)
);