/**
 * Auth.js — Client-side authentication logic
 * Handles: login modal, OTP flow, registration, session state, account redirect
 */

(function () {
    'use strict';

    // ── State ──
    let authState = {
        phone: '',
        step: 'phone', // phone | otp | password | login
        isRegistered: false,
        devOtp: null
    };

    // ── Init ──
    document.addEventListener('DOMContentLoaded', () => {
        checkAuthState();
    });

    // ── Check if user is logged in ──
    async function checkAuthState() {
        try {
            const res = await fetch('/api/auth/me', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                updateAccountIcon(true, data.user);
            } else {
                updateAccountIcon(false);
            }
        } catch {
            updateAccountIcon(false);
        }
    }

    // ── Update account icon state ──
    function updateAccountIcon(isLoggedIn, user) {
        const icon = document.getElementById('account-icon-btn');
        if (!icon) return;

        if (isLoggedIn && user) {
            icon.classList.add('logged-in');
            icon.title = user.phone_number;
        } else {
            icon.classList.remove('logged-in');
            icon.title = 'Войти';
        }
    }

    // ── Account icon click ──
    window.handleAccountClick = async function () {
        try {
            const res = await fetch('/api/auth/me', { credentials: 'include' });
            if (res.ok) {
                window.location.href = '/account.html';
            } else {
                openAuthModal();
            }
        } catch {
            openAuthModal();
        }
    };

    // ── Modal control ──
    function openAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (!modal) return;
        authState = { phone: '', step: 'phone', isRegistered: false, devOtp: null };
        renderAuthStep();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeAuthModal = function () {
        const modal = document.getElementById('auth-modal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // ── Render current step ──
    function renderAuthStep() {
        const content = document.getElementById('auth-modal-content');
        if (!content) return;

        switch (authState.step) {
            case 'phone':
                content.innerHTML = `
                    <div class="auth-step">
                        <h2 class="auth-title">Вход / Регистрация</h2>
                        <p class="auth-desc">Введите номер телефона для входа или регистрации</p>
                        <div class="auth-form-group">
                            <label>Номер телефона</label>
                            <div class="auth-phone-input">
                                <span class="auth-phone-prefix">+998</span>
                                <input type="tel" id="auth-phone" 
                                       placeholder="90 123 45 67" 
                                       maxlength="12" 
                                       autocomplete="tel"
                                       value="${authState.phone.replace('+998', '')}">
                            </div>
                        </div>
                        <div id="auth-error" class="auth-error"></div>
                        <button class="auth-btn" onclick="authSendOtp()">Получить код</button>
                    </div>
                `;
                setTimeout(() => document.getElementById('auth-phone')?.focus(), 100);
                break;

            case 'otp':
                content.innerHTML = `
                    <div class="auth-step">
                        <h2 class="auth-title">Подтверждение</h2>
                        <p class="auth-desc">Код отправлен на ${authState.phone}</p>
                        ${authState.devOtp ? `<div class="auth-dev-otp">DEV: ${authState.devOtp}</div>` : ''}
                        <div class="auth-form-group">
                            <label>Код из SMS</label>
                            <input type="text" id="auth-otp" 
                                   placeholder="000000" 
                                   maxlength="6" 
                                   inputmode="numeric"
                                   autocomplete="one-time-code">
                        </div>
                        <div id="auth-error" class="auth-error"></div>
                        <button class="auth-btn" onclick="authVerifyOtp()">Подтвердить</button>
                        <button class="auth-btn-link" onclick="authState.step='phone'; renderAuthStep()">← Изменить номер</button>
                    </div>
                `;
                setTimeout(() => document.getElementById('auth-otp')?.focus(), 100);
                break;

            case 'password':
                content.innerHTML = `
                    <div class="auth-step">
                        <h2 class="auth-title">Создайте пароль</h2>
                        <p class="auth-desc">Придумайте пароль для входа</p>
                        <div class="auth-form-group">
                            <label>Пароль (мин. 6 символов)</label>
                            <input type="password" id="auth-password" 
                                   placeholder="Введите пароль" 
                                   minlength="6" 
                                   autocomplete="new-password">
                        </div>
                        <div class="auth-form-group">
                            <label>Повторите пароль</label>
                            <input type="password" id="auth-password-confirm" 
                                   placeholder="Повторите пароль"
                                   autocomplete="new-password">
                        </div>
                        <div id="auth-error" class="auth-error"></div>
                        <button class="auth-btn" onclick="authRegister()">Зарегистрироваться</button>
                    </div>
                `;
                setTimeout(() => document.getElementById('auth-password')?.focus(), 100);
                break;

            case 'login':
                content.innerHTML = `
                    <div class="auth-step">
                        <h2 class="auth-title">Вход</h2>
                        <p class="auth-desc">Введите пароль для ${authState.phone}</p>
                        <div class="auth-form-group">
                            <label>Пароль</label>
                            <input type="password" id="auth-login-password" 
                                   placeholder="Введите пароль"
                                   autocomplete="current-password">
                        </div>
                        <div id="auth-error" class="auth-error"></div>
                        <button class="auth-btn" onclick="authLogin()">Войти</button>
                        <button class="auth-btn-link" onclick="authSendOtp()">Войти через SMS-код</button>
                        <button class="auth-btn-link" onclick="authState.step='phone'; renderAuthStep()">← Изменить номер</button>
                    </div>
                `;
                setTimeout(() => document.getElementById('auth-login-password')?.focus(), 100);
                break;
        }
    }

    function showAuthError(msg) {
        const el = document.getElementById('auth-error');
        if (el) {
            el.textContent = msg;
            el.style.display = msg ? 'block' : 'none';
        }
    }

    function setButtonLoading(loading) {
        const btn = document.querySelector('.auth-step .auth-btn');
        if (btn) {
            btn.disabled = loading;
            if (loading) {
                btn.dataset.originalText = btn.textContent;
                btn.textContent = 'Загрузка...';
            } else {
                btn.textContent = btn.dataset.originalText || btn.textContent;
            }
        }
    }

    // ── Send OTP ──
    window.authSendOtp = async function () {
        const phoneInput = document.getElementById('auth-phone');
        const rawPhone = phoneInput ? phoneInput.value.replace(/[\s\-()]/g, '') : authState.phone.replace('+998', '');

        if (!rawPhone || rawPhone.length < 9) {
            showAuthError('Введите корректный номер телефона');
            return;
        }

        const fullPhone = '+998' + rawPhone.replace(/^\+?998/, '');
        authState.phone = fullPhone;

        setButtonLoading(true);
        showAuthError('');

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: fullPhone }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                showAuthError(data.error || 'Ошибка отправки кода');
                setButtonLoading(false);
                return;
            }

            authState.isRegistered = data.is_registered;
            authState.devOtp = data.dev_otp || null;
            authState.step = 'otp';
            renderAuthStep();
        } catch {
            showAuthError('Ошибка соединения');
            setButtonLoading(false);
        }
    };

    // ── Verify OTP ──
    window.authVerifyOtp = async function () {
        const codeInput = document.getElementById('auth-otp');
        const code = codeInput ? codeInput.value.trim() : '';

        if (code.length !== 6) {
            showAuthError('Введите 6-значный код');
            return;
        }

        setButtonLoading(true);
        showAuthError('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: authState.phone, code }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                showAuthError(data.error || 'Неверный код');
                setButtonLoading(false);
                return;
            }

            if (data.action === 'login') {
                // Existing user — already logged in via OTP
                closeAuthModal();
                window.location.href = '/account.html';
            } else if (data.action === 'register') {
                // New user — set password
                authState.step = 'password';
                renderAuthStep();
            }
        } catch {
            showAuthError('Ошибка соединения');
            setButtonLoading(false);
        }
    };

    // ── Register ──
    window.authRegister = async function () {
        const password = document.getElementById('auth-password')?.value || '';
        const confirm = document.getElementById('auth-password-confirm')?.value || '';

        if (password.length < 6) {
            showAuthError('Пароль минимум 6 символов');
            return;
        }

        if (password !== confirm) {
            showAuthError('Пароли не совпадают');
            return;
        }

        setButtonLoading(true);
        showAuthError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: authState.phone, password }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                showAuthError(data.error || 'Ошибка регистрации');
                setButtonLoading(false);
                return;
            }

            closeAuthModal();
            window.location.href = '/account.html';
        } catch {
            showAuthError('Ошибка соединения');
            setButtonLoading(false);
        }
    };

    // ── Login with password ──
    window.authLogin = async function () {
        const password = document.getElementById('auth-login-password')?.value || '';

        if (!password) {
            showAuthError('Введите пароль');
            return;
        }

        setButtonLoading(true);
        showAuthError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: authState.phone, password }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                showAuthError(data.error || 'Ошибка входа');
                setButtonLoading(false);
                return;
            }

            closeAuthModal();
            window.location.href = '/account.html';
        } catch {
            showAuthError('Ошибка соединения');
            setButtonLoading(false);
        }
    };

    // ── Logout ──
    window.authLogout = async function () {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch { }
        window.location.href = '/';
    };

    // Expose for rendering
    window.authState = authState;
    window.renderAuthStep = renderAuthStep;
    window.openAuthModal = openAuthModal;
})();
