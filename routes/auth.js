/**
 * Auth Routes — OTP, Registration, Login, Logout
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { createOtp, verifyOtp, isPhoneVerified } = require('../services/otpService');
const { sendOtp } = require('../services/smsService');
const { requireAuth, generateToken, setAuthCookie } = require('../middleware/auth');

const router = express.Router();

// ── Phone number validation ──
function validatePhone(phone) {
    // Accept +998XXXXXXXXX format
    const cleaned = phone.replace(/[\s\-()]/g, '');
    if (/^\+998\d{9}$/.test(cleaned)) return cleaned;
    if (/^998\d{9}$/.test(cleaned)) return '+' + cleaned;
    if (/^\d{9}$/.test(cleaned)) return '+998' + cleaned;
    return null;
}

// ── POST /api/auth/send-otp ──
router.post('/send-otp', async (req, res) => {
    try {
        const { phone_number } = req.body;

        if (!phone_number) {
            return res.status(400).json({ error: 'Введите номер телефона' });
        }

        const phone = validatePhone(phone_number);
        if (!phone) {
            return res.status(400).json({ error: 'Неверный формат номера. Используйте +998XXXXXXXXX' });
        }

        // Check if user already exists
        const db = getDb();
        const existingUser = db.prepare('SELECT id FROM users WHERE phone_number = ?').get(phone);

        // Generate and send OTP
        const code = createOtp(phone);
        await sendOtp(phone, code);

        const response = {
            success: true,
            message: 'Код отправлен',
            is_registered: !!existingUser
        };

        // In dev mode, include OTP in response for testing
        if (process.env.NODE_ENV !== 'production') {
            response.dev_otp = code;
        }

        res.json(response);
    } catch (err) {
        console.error('send-otp error:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ── POST /api/auth/verify-otp ──
router.post('/verify-otp', (req, res) => {
    try {
        const { phone_number, code } = req.body;

        if (!phone_number || !code) {
            return res.status(400).json({ error: 'Введите номер и код' });
        }

        const phone = validatePhone(phone_number);
        if (!phone) {
            return res.status(400).json({ error: 'Неверный формат номера' });
        }

        const result = verifyOtp(phone, code);

        if (!result.valid) {
            return res.status(400).json({ error: result.error });
        }

        // Check if user already registered
        const db = getDb();
        const existingUser = db.prepare('SELECT id, phone_number FROM users WHERE phone_number = ?').get(phone);

        if (existingUser) {
            // Existing user — issue token directly
            const token = generateToken(existingUser);
            setAuthCookie(res, token);

            return res.json({
                success: true,
                action: 'login',
                message: 'Вход выполнен',
                user: { phone_number: existingUser.phone_number }
            });
        }

        // New user — needs to set password
        res.json({
            success: true,
            action: 'register',
            message: 'Код подтверждён. Создайте пароль.',
            phone_verified: true
        });
    } catch (err) {
        console.error('verify-otp error:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ── POST /api/auth/register ──
router.post('/register', (req, res) => {
    try {
        const { phone_number, password } = req.body;

        if (!phone_number || !password) {
            return res.status(400).json({ error: 'Заполните все поля' });
        }

        const phone = validatePhone(phone_number);
        if (!phone) {
            return res.status(400).json({ error: 'Неверный формат номера' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Пароль минимум 6 символов' });
        }

        // Verify OTP was confirmed
        if (!isPhoneVerified(phone)) {
            return res.status(403).json({ error: 'Сначала подтвердите номер через OTP' });
        }

        // Check duplicate
        const db = getDb();
        const existing = db.prepare('SELECT id FROM users WHERE phone_number = ?').get(phone);
        if (existing) {
            return res.status(409).json({ error: 'Номер уже зарегистрирован' });
        }

        // Create user
        const userId = uuidv4();
        const passwordHash = bcrypt.hashSync(password, 10);

        db.prepare('INSERT INTO users (id, phone_number, password_hash) VALUES (?, ?, ?)')
            .run(userId, phone, passwordHash);

        // Issue token
        const user = { id: userId, phone_number: phone };
        const token = generateToken(user);
        setAuthCookie(res, token);

        res.status(201).json({
            success: true,
            message: 'Регистрация завершена',
            user: { phone_number: phone }
        });
    } catch (err) {
        console.error('register error:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ── POST /api/auth/login ──
router.post('/login', (req, res) => {
    try {
        const { phone_number, password } = req.body;

        if (!phone_number || !password) {
            return res.status(400).json({ error: 'Введите номер и пароль' });
        }

        const phone = validatePhone(phone_number);
        if (!phone) {
            return res.status(400).json({ error: 'Неверный формат номера' });
        }

        const db = getDb();
        const user = db.prepare('SELECT * FROM users WHERE phone_number = ?').get(phone);

        if (!user) {
            return res.status(401).json({ error: 'Неверный номер или пароль' });
        }

        const validPassword = bcrypt.compareSync(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Неверный номер или пароль' });
        }

        const token = generateToken(user);
        setAuthCookie(res, token);

        res.json({
            success: true,
            message: 'Вход выполнен',
            user: { phone_number: user.phone_number }
        });
    } catch (err) {
        console.error('login error:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ── POST /api/auth/logout ──
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token', { path: '/' });
    res.json({ success: true, message: 'Выход выполнен' });
});

// ── GET /api/auth/me ──
router.get('/me', requireAuth, (req, res) => {
    const db = getDb();
    const user = db.prepare('SELECT id, phone_number, created_at FROM users WHERE id = ?').get(req.user.id);

    if (!user) {
        res.clearCookie('auth_token');
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({
        user: {
            id: user.id,
            phone_number: user.phone_number,
            created_at: user.created_at
        }
    });
});

module.exports = router;
