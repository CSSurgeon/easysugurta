/**
 * SMS Service — Pluggable SMS provider
 * 
 * CURRENT: Development mode (logs to console)
 * FUTURE:  Replace sendSms() body with real provider SDK
 * 
 * Supported providers for Uzbekistan:
 *   - Eskiz.uz (eskiz.uz/developer)
 *   - PlayMobile (playmobile.uz)
 *   - Infobip
 */

/**
 * Send an SMS message
 * @param {string} phoneNumber - Phone in +998XXXXXXXXX format
 * @param {string} message - SMS text
 * @returns {Promise<{success: boolean, provider: string}>}
 */
async function sendSms(phoneNumber, message) {
    const isDev = process.env.NODE_ENV !== 'production';

    if (isDev) {
        // ── Development: log to console ──
        console.log('');
        console.log('┌─────────────────────────────────────┐');
        console.log('│         📱 SMS (DEV MODE)           │');
        console.log('├─────────────────────────────────────┤');
        console.log(`│  To:   ${phoneNumber.padEnd(28)}│`);
        console.log(`│  Body: ${message.padEnd(28)}│`);
        console.log('└─────────────────────────────────────┘');
        console.log('');

        return { success: true, provider: 'console' };
    }

    // ── Production: real SMS provider ──
    // Uncomment and configure when ready:
    //
    // const response = await fetch('https://notify.eskiz.uz/api/message/sms/send', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${process.env.ESKIZ_TOKEN}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         mobile_phone: phoneNumber.replace('+', ''),
    //         message: message,
    //         from: '4546'
    //     })
    // });
    // const data = await response.json();
    // return { success: data.status === 'success', provider: 'eskiz' };

    throw new Error('SMS provider not configured for production. Set up Eskiz or PlayMobile in services/smsService.js');
}

/**
 * Send OTP code via SMS
 * @param {string} phoneNumber 
 * @param {string} code - 6-digit OTP
 */
async function sendOtp(phoneNumber, code) {
    const message = `Easy Sugurta: Ваш код подтверждения: ${code}. Действителен 5 минут.`;
    return sendSms(phoneNumber, message);
}

module.exports = { sendSms, sendOtp };
