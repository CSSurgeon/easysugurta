/**
 * OTP Service — Generate, store, verify one-time passwords
 */

const { getDb } = require('../db/database');

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);
const OTP_MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '3', 10);

/**
 * Generate a random 6-digit code
 */
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create and store a new OTP for a phone number
 * Invalidates any previous unused OTPs for the same number
 * @param {string} phoneNumber
 * @returns {string} The generated OTP code
 */
function createOtp(phoneNumber) {
    const db = getDb();
    const code = generateCode();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();

    // Invalidate previous OTPs for this phone
    db.prepare('DELETE FROM otp_codes WHERE phone_number = ? AND verified = 0')
        .run(phoneNumber);

    // Insert new OTP
    db.prepare('INSERT INTO otp_codes (phone_number, code, expires_at) VALUES (?, ?, ?)')
        .run(phoneNumber, code, expiresAt);

    return code;
}

/**
 * Verify an OTP code
 * @param {string} phoneNumber
 * @param {string} code
 * @returns {{ valid: boolean, error?: string }}
 */
function verifyOtp(phoneNumber, code) {
    const db = getDb();

    // Find the latest OTP for this phone
    const otp = db.prepare(
        'SELECT * FROM otp_codes WHERE phone_number = ? AND verified = 0 ORDER BY created_at DESC LIMIT 1'
    ).get(phoneNumber);

    if (!otp) {
        return { valid: false, error: 'OTP не найден. Запросите новый код.' };
    }

    // Check expiry
    if (new Date(otp.expires_at) < new Date()) {
        db.prepare('DELETE FROM otp_codes WHERE id = ?').run(otp.id);
        return { valid: false, error: 'Код истёк. Запросите новый.' };
    }

    // Check attempts
    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        db.prepare('DELETE FROM otp_codes WHERE id = ?').run(otp.id);
        return { valid: false, error: 'Превышено количество попыток. Запросите новый код.' };
    }

    // Increment attempts
    db.prepare('UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?').run(otp.id);

    // Verify code
    if (otp.code !== code) {
        const remaining = OTP_MAX_ATTEMPTS - otp.attempts - 1;
        return { valid: false, error: `Неверный код. Осталось попыток: ${remaining}` };
    }

    // Mark as verified
    db.prepare('UPDATE otp_codes SET verified = 1 WHERE id = ?').run(otp.id);

    return { valid: true };
}

/**
 * Check if phone has a verified OTP (for registration flow)
 * @param {string} phoneNumber
 * @returns {boolean}
 */
function isPhoneVerified(phoneNumber) {
    const db = getDb();
    const otp = db.prepare(
        'SELECT * FROM otp_codes WHERE phone_number = ? AND verified = 1 ORDER BY created_at DESC LIMIT 1'
    ).get(phoneNumber);

    if (!otp) return false;

    // Verified OTP is valid for 15 minutes (to complete registration)
    const verifiedExpiry = new Date(new Date(otp.created_at).getTime() + 15 * 60 * 1000);
    return verifiedExpiry > new Date();
}

/**
 * Clean up expired and used OTPs
 */
function cleanupOtps() {
    const db = getDb();
    db.prepare("DELETE FROM otp_codes WHERE expires_at < datetime('now') OR verified = 1").run();
}

module.exports = { createOtp, verifyOtp, isPhoneVerified, cleanupOtps };
