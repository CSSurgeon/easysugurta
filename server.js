/**
 * Easy Sugurta — Express Server
 * Replaces Flask server.py
 * Serves static files + auth API + policy API
 */

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Initialize database tables on startup
require('./db/database').initTables();

const authRoutes = require('./routes/auth');
const policyRoutes = require('./routes/policies');
const { cleanupOtps } = require('./services/otpService');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// ── Middleware ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Rate Limiting ──
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: { error: 'Слишком много запросов. Попробуйте позже.' },
    standardHeaders: true,
    legacyHeaders: false
});

const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // 5 OTP requests per 5 minutes
    message: { error: 'Слишком много запросов OTP. Подождите 5 минут.' },
    keyGenerator: (req) => req.body?.phone_number || req.ip,
    standardHeaders: true,
    legacyHeaders: false
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login attempts per 15 minutes
    message: { error: 'Слишком много попыток входа. Попробуйте позже.' },
    keyGenerator: (req) => req.body?.phone_number || req.ip,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(globalLimiter);

// ── API Routes ──
app.use('/api/auth/send-otp', otpLimiter);
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);

// ── News API (migrated from Flask) ──
app.get('/api/news', async (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        return res.json([]);
    }

    try {
        const url = new URL('https://newsapi.org/v2/everything');
        url.searchParams.set('q', '"ОСАГО" OR "автострахование" OR "insurance Uzbekistan"');
        url.searchParams.set('language', 'ru');
        url.searchParams.set('sortBy', 'publishedAt');
        url.searchParams.set('pageSize', '6');
        url.searchParams.set('apiKey', apiKey);

        const response = await fetch(url);
        const data = await response.json();

        const articles = (data.articles || []).map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            source: a.source?.name,
            publishedAt: a.publishedAt
        }));

        res.json(articles);
    } catch (err) {
        console.error('News API error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ── Static Files ──
app.use(express.static(path.join(__dirname), {
    extensions: ['html'],
    index: 'index.html'
}));

// SPA fallback — serve index.html for unknown routes
app.get('*', (req, res) => {
    // Don't fallback API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ── OTP cleanup every 30 minutes ──
setInterval(cleanupOtps, 30 * 60 * 1000);

// ── Start ──
app.listen(PORT, () => {
    console.log('');
    console.log('┌──────────────────────────────────────────┐');
    console.log('│     🚗 Easy Sugurta Server Started       │');
    console.log('├──────────────────────────────────────────┤');
    console.log(`│  URL:  http://localhost:${PORT}              │`);
    console.log(`│  Mode: ${(process.env.NODE_ENV || 'development').padEnd(32)}│`);
    console.log(`│  Auth: JWT + HTTP-only cookies           │`);
    console.log(`│  DB:   SQLite (app.db)                   │`);
    console.log('└──────────────────────────────────────────┘');
    console.log('');
});
