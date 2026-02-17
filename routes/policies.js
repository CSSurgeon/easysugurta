/**
 * Policy Routes — User's insurance policies
 */

const express = require('express');
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// All policy routes require authentication
router.use(requireAuth);

// ── GET /api/policies ──
router.get('/', (req, res) => {
    try {
        const db = getDb();
        const policies = db.prepare(`
            SELECT id, policy_number, insurance_company, premium_amount,
                   start_date, end_date, status, created_at
            FROM policies 
            WHERE user_id = ?
            ORDER BY created_at DESC
        `).all(req.user.id);

        res.json({ policies });
    } catch (err) {
        console.error('get policies error:', err);
        res.status(500).json({ error: 'Ошибка загрузки полисов' });
    }
});

// ── GET /api/policies/:id ──
router.get('/:id', (req, res) => {
    try {
        const db = getDb();
        const policy = db.prepare(`
            SELECT id, policy_number, insurance_company, premium_amount,
                   start_date, end_date, status, created_at
            FROM policies 
            WHERE id = ? AND user_id = ?
        `).get(req.params.id, req.user.id);

        if (!policy) {
            return res.status(404).json({ error: 'Полис не найден' });
        }

        res.json({ policy });
    } catch (err) {
        console.error('get policy error:', err);
        res.status(500).json({ error: 'Ошибка загрузки полиса' });
    }
});

module.exports = router;
