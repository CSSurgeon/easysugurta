/**
 * Seed Script — Insert demo policies for testing
 * Run: npm run seed
 */

require('dotenv').config();
const { getDb } = require('./database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

function seed() {
    const db = getDb();

    // Create demo user
    const userId = uuidv4();
    const phoneNumber = '+998901234567';
    const passwordHash = bcrypt.hashSync('test123', 10);

    const existingUser = db.prepare('SELECT id FROM users WHERE phone_number = ?').get(phoneNumber);

    let finalUserId = userId;

    if (!existingUser) {
        db.prepare('INSERT INTO users (id, phone_number, password_hash) VALUES (?, ?, ?)')
            .run(userId, phoneNumber, passwordHash);
        console.log(`✅ Demo user created: ${phoneNumber} / password: test123`);
    } else {
        finalUserId = existingUser.id;
        console.log(`ℹ️  Demo user already exists: ${phoneNumber}`);
    }

    // Insert demo policies
    const policies = [
        {
            id: uuidv4(),
            user_id: finalUserId,
            policy_number: 'OSAGO-2024-001',
            insurance_company: 'Узбекинвест',
            premium_amount: 450000,
            start_date: '2024-01-15',
            end_date: '2025-01-15',
            status: 'active'
        },
        {
            id: uuidv4(),
            user_id: finalUserId,
            policy_number: 'OSAGO-2024-002',
            insurance_company: 'Alfa Insurance',
            premium_amount: 380000,
            start_date: '2023-06-01',
            end_date: '2024-06-01',
            status: 'expired'
        },
        {
            id: uuidv4(),
            user_id: finalUserId,
            policy_number: 'OSAGO-2025-003',
            insurance_company: 'Gross Insurance',
            premium_amount: 520000,
            start_date: '2025-02-01',
            end_date: '2026-02-01',
            status: 'active'
        }
    ];

    const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO policies (id, user_id, policy_number, insurance_company, premium_amount, start_date, end_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of policies) {
        insertStmt.run(p.id, p.user_id, p.policy_number, p.insurance_company, p.premium_amount, p.start_date, p.end_date, p.status);
    }

    console.log(`✅ ${policies.length} demo policies inserted`);
    console.log('\nDemo credentials:');
    console.log(`  Phone: ${phoneNumber}`);
    console.log('  Password: test123');
}

seed();
