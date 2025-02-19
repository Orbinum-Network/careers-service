CREATE TABLE IF NOT EXISTS careers (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    employment_type TEXT CHECK(employment_type in ('FULL TIME', 'PART TIME', 'FREELANCE')),
    department VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    state TEXT CHECK(state in ('FINISHED', 'CANCELLED', 'ACTIVE')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);