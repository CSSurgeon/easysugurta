/**
 * Auth Middleware — JWT verification
 * Reads token from HTTP-only cookie, attaches req.user
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me';

/**
 * Require authentication — rejects with 401 if no valid token
 */
function requireAuth(req, res, next) {
    const token = req.cookies?.auth_token;

    if (!token) {
        return res.status(401).json({ error: 'Необходима авторизация' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            phone_number: decoded.phone_number
        };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.clearCookie('auth_token');
            return res.status(401).json({ error: 'Сессия истекла. Войдите снова.' });
        }
        return res.status(401).json({ error: 'Недействительный токен' });
    }
}

/**
 * Optional auth — attaches req.user if token exists, but doesn't block
 */
function optionalAuth(req, res, next) {
    const token = req.cookies?.auth_token;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = {
                id: decoded.id,
                phone_number: decoded.phone_number
            };
        } catch {
            // Invalid token — just continue without user
        }
    }

    next();
}

/**
 * Generate JWT token for a user
 */
function generateToken(user) {
    return jwt.sign(
        { id: user.id, phone_number: user.phone_number },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
}

/**
 * Set auth cookie on response
 */
function setAuthCookie(res, token) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/'
    });
}

module.exports = { requireAuth, optionalAuth, generateToken, setAuthCookie };
