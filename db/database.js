/**
 * Database Layer — SQLite via better-sqlite3
 * 
 * To swap to PostgreSQL:
 *   1. Replace this file with a pg-pool version
 *   2. Keep the same exported function signatures
 *   3. Change sync calls to async/await
 */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'app.db');

let db;

function getDb() {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        initTables();
    }
    return db;
}

function initTables() {
    const d = getDb();

    d.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            phone_number TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);

        CREATE TABLE IF NOT EXISTS otp_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone_number TEXT NOT NULL,
            code TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            attempts INTEGER DEFAULT 0,
            verified INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_codes(phone_number);

        CREATE TABLE IF NOT EXISTS policies (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            policy_number TEXT NOT NULL,
            insurance_company TEXT NOT NULL,
            premium_amount REAL NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_policies_user ON policies(user_id);
    `);
}

module.exports = { getDb, initTables };
