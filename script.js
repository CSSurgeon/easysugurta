// Telegram Web App Initialization
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();

    // Initialize Telegram Back Button
    tg.BackButton.onClick(() => {
        prevStep();
    });
}

// Translations
const translations = {
    ru: {
        header_btn_buy: "Купить ОСАГО",
        hero_heading: "Оформление ОСАГО — мгновенно",
        hero_desc: "Купите ОСАГО онлайн за 5 минут —<br>без очередей и бумаг.",
        hero_cta: "Купить ОСАГО Online",
        badge_soon: "Скоро",
        products_title: "Другие страховые продукты",
        products_desc: "Мы создаем полноценную страховую платформу. Эти продукты появятся в ближайшее время.",
        prod_kasko: "КАСКО",
        prod_kasko_desc: "Полное покрытие автомобиля",
        prod_health: "Здоровье",
        prod_health_desc: "Медицинское страхование",
        prod_travel: "Путешествия",
        prod_travel_desc: "Защита в поездках",
        prod_property: "Имущество",
        prod_property_desc: "Дом и активы",
        badge_available: "Доступно сейчас",
        osago_title: "ОСАГО — Обязательное автострахование",
        osago_desc: "Оформите полис онлайн. Быстро, понятно и без лишних хлопот.",
        feat_price: "Регулируемая цена",
        feat_price_desc: "Тарифы установлены законом",
        feat_fast: "Быстрое оформление",
        feat_fast_desc: "Завершите за 10 минут",
        feat_digital: "Цифровой полис",
        feat_digital_desc: "Получите мгновенно на телефон",
        osago_btn: "Оформить ОСАГО &rarr;",
        why_title: "Почему EasySugurta?",
        why_desc: "Современная платформа, которая делает страхование простым и доступным.",
        why_aggregator: "Агрегатор страхования",
        why_aggregator_desc: "Сравнивайте и выбирайте из нескольких надежных страховых компаний в одном месте.",
        why_simple: "Быстро и просто",
        why_simple_desc: "Без бумаг и очередей. Застрахуйтесь за минуты, полностью онлайн.",
        why_secure: "Безопасно и надёжно",
        why_secure_desc: "Ваши данные защищены. Полисы выдаются напрямую лицензированными страховщиками.",
        choice_title: "Выберите способ начала",
        choice_desc: "Используйте наш сайт или откройте прямо в Telegram — одинаково быстрый опыт.",
        choice_site: "Сайт",
        choice_site_desc: "Заполните заявку прямо здесь в браузере",
        choice_tg: "Telegram",
        choice_tg_desc: "Используйте наше Mini App в Telegram для быстрого доступа",
        choice_tg_btn: "Открыть в Telegram",
        copyright: "Все права защищены.",

        // Wizard
        wizard_title: "ОФОРМИТЬ ОСАГО ОНЛАЙН",
        step_1: "Данные авто",
        step_2: "Владелец",
        step_3: "Заявитель",
        step_4: "Период",
        step_5: "Водители",
        step_6: "Подтверждение",
        step_7: "Оплата",
        step_1_title: "Данные авто",
        label_car_number: "Номер машины",
        label_tech_passport: "Серия и номер тех паспорта",
        terms_agree: "Нажимая продолжить Вы соглашаетесь с <a href='#'>Офертой</a> и даете согласие на обработку своих персональных данных",
        btn_back: "&larr; Назад",
        btn_continue: "Продолжить &rarr;"
    },
    uz: {
        header_btn_buy: "OSAGO sotib olish",
        hero_heading: "OSAGO rasmiylashtirish — bir zumda",
        hero_desc: "OSAGO ni 5 daqiqada onlayn xarid qiling —<br>navbat va qog'ozlarsiz.",
        hero_cta: "OSAGO sotib olish (Online)",
        badge_soon: "Tez orada",
        products_title: "Boshqa sug'urta mahsulotlari",
        products_desc: "Biz to'liq sug'urta platformasini yaratmoqdamiz. Ushbu mahsulotlar yaqin orada paydo bo'ladi.",
        prod_kasko: "KASKO",
        prod_kasko_desc: "Avtomobilni to'liq qoplash",
        prod_health: "Salomatlik",
        prod_health_desc: "Tibbiy sug'urta",
        prod_travel: "Sayohat",
        prod_travel_desc: "Sayohatda himoya",
        prod_property: "Mulk",
        prod_property_desc: "Uy va aktivlar",
        badge_available: "Hozir mavjud",
        osago_title: "OSAGO — Majburiy avtosug'urta",
        osago_desc: "Polisni onlayn rasmiylashtiring. Tez, tushunarli va ortiqcha tashvishlarsiz.",
        feat_price: "Tartibga solinadigan narx",
        feat_price_desc: "Tariflar qonun bilan belgilangan",
        feat_fast: "Tez rasmiylashtirish",
        feat_fast_desc: "10 daqiqada yakunlang",
        feat_digital: "Raqamli polis",
        feat_digital_desc: "Telefoningizga darhol oling",
        osago_btn: "OSAGO rasmiylashtirish &rarr;",
        why_title: "Nima uchun EasySugurta?",
        why_desc: "Sug'urtani oddiy va hamyonbop qiladigan zamonaviy platforma.",
        why_aggregator: "Sug'urta agregatori",
        why_aggregator_desc: "Bir joyda bir nechta ishonchli sug'urta kompaniyalarini solishtiring va tanlang.",
        why_simple: "Tez va oddiy",
        why_simple_desc: "Qog'oz va navbatlarsiz. Daqiqalar ichida, butunlay onlayn sug'urtalaning.",
        why_secure: "Xavfsiz va ishonchli",
        why_secure_desc: "Ma'lumotlaringiz himoyalangan. Polislar to'g'ridan-to'g'ri litsenziyalangan sug'urtachilar tomonidan beriladi.",
        choice_title: "Boshlash usulini tanlang",
        choice_desc: "Saytimizdan foydalaning yoki to'g'ridan-to'g'ri Telegram da oching — bir xil tezkor tajriba.",
        choice_site: "Sayt",
        choice_site_desc: "Arizani shu yerda brauzerda to'ldiring",
        choice_tg: "Telegram",
        choice_tg_desc: "Tez kirish uchun Telegram dagi Mini App imizdan foydalaning",
        choice_tg_btn: "Telegram da ochish",
        copyright: "Barcha huquqlar himoyalangan.",

        // Wizard
        wizard_title: "OSAGO NI ONLAYN RASMIYLASHTIRISH",
        step_1: "Avto ma'lumotlari",
        step_2: "Egasi",
        step_3: "Ariza beruvchi",
        step_4: "Davr",
        step_5: "Haydovchilar",
        step_6: "Tasdiqlash",
        step_7: "To'lov",
        step_1_title: "Avto ma'lumotlari",
        label_car_number: "Mashina raqami",
        label_tech_passport: "Texnik pasport seriyasi va raqami",
        terms_agree: "Davom etish tugmasini bosish orqali siz <a href='#'>Oferta</a> ga rozilik bildirasiz va shaxsiy ma'lumotlaringizni qayta ishlashga ruxsat berasiz",
        btn_back: "&larr; Orqaga",
        btn_continue: "Davom etish &rarr;"
    },
    en: {
        header_btn_buy: "Buy OSAGO",
        hero_heading: "OSAGO registration — instantly",
        hero_desc: "Buy OSAGO online in 5 minutes —<br>no queues, no paperwork.",
        hero_cta: "Buy OSAGO Online",
        badge_soon: "Coming Soon",
        products_title: "Other Insurance Products",
        products_desc: "We are building a complete insurance platform. These products will appear soon.",
        prod_kasko: "KASKO",
        prod_kasko_desc: "Full car coverage",
        prod_health: "Health",
        prod_health_desc: "Medical insurance",
        prod_travel: "Travel",
        prod_travel_desc: "Protection while traveling",
        prod_property: "Property",
        prod_property_desc: "Home and assets",
        badge_available: "Available Now",
        osago_title: "OSAGO — Mandatory Auto Insurance",
        osago_desc: "Get your policy online. Fast, clear, and hassle-free.",
        feat_price: "Regulated Price",
        feat_price_desc: "Rates are set by law",
        feat_fast: "Fast Process",
        feat_fast_desc: "Complete in 10 minutes",
        feat_digital: "Digital Policy",
        feat_digital_desc: "Get instantly on your phone",
        osago_btn: "Get OSAGO &rarr;",
        why_title: "Why EasySugurta?",
        why_desc: "A modern platform making insurance simple and accessible.",
        why_aggregator: "Insurance Aggregator",
        why_aggregator_desc: "Compare and choose from multiple trusted insurance companies in one place.",
        why_simple: "Fast and Simple",
        why_simple_desc: "No paper or lines. Get insured in minutes, completely online.",
        why_secure: "Safe and Reliable",
        why_secure_desc: "Your data is secure. Policies are issued directly by licensed insurers.",
        choice_title: "Choose How to Start",
        choice_desc: "Use our website or open directly in Telegram — equally fast experience.",
        choice_site: "Website",
        choice_site_desc: "Fill the application right here in the browser",
        choice_tg: "Telegram",
        choice_tg_desc: "Use our Mini App in Telegram for quick access",
        choice_tg_btn: "Open in Telegram",
        copyright: "All rights reserved.",

        // Wizard
        wizard_title: "GET OSAGO ONLINE",
        step_1: "Car Data",
        step_2: "Owner",
        step_3: "Applicant",
        step_4: "Period",
        step_5: "Drivers",
        step_6: "Confirmation",
        step_7: "Payment",
        step_1_title: "Car Data",
        label_car_number: "Car Number",
        label_tech_passport: "Tech Passport Series & Number",
        terms_agree: "By clicking continue, you agree to the <a href='#'>Offer</a> and consent to the processing of your personal data",
        btn_back: "&larr; Back",
        btn_continue: "Continue &rarr;"
    }
};

let currentLang = localStorage.getItem('es_lang') || 'ru';

// Language data for dropdown
const langData = {
    uz: {
        name: "O'zbekcha",
        flag: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="13.33" y="0" fill="#1EB53A"/>
            <rect width="60" height="13.33" y="13.33" fill="#FFFFFF"/>
            <rect width="60" height="13.33" y="26.66" fill="#1EB53A"/>
            <rect width="60" height="1" y="12.83" fill="#D52B1E"/>
            <rect width="60" height="1" y="26.16" fill="#D52B1E"/>
            <circle cx="10" cy="6.5" r="4" fill="#FFFFFF"/>
            <circle cx="12" cy="6.5" r="3.5" fill="#1EB53A"/>
        </svg>`
    },
    ru: {
        name: "Русский",
        flag: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="13.33" y="0" fill="#FFFFFF"/>
            <rect width="60" height="13.33" y="13.33" fill="#0039A6"/>
            <rect width="60" height="13.33" y="26.66" fill="#D52B1E"/>
        </svg>`
    },
    en: {
        name: "English",
        flag: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="40" fill="#012169"/>
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" stroke-width="6"/>
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" stroke-width="4"/>
            <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" stroke-width="10"/>
            <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" stroke-width="6"/>
        </svg>`
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('es_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // innerHTML to support <br>
        }
    });

    // Update dropdown display
    updateLangDropdownDisplay(lang);

    // Update dropdown options active state
    document.querySelectorAll('.lang-option').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.lang === lang) {
            el.classList.add('active');
        }
    });
}

function updateLangDropdownDisplay(lang) {
    const flagEl = document.getElementById('current-lang-flag');
    const nameEl = document.getElementById('current-lang-name');

    if (flagEl && langData[lang]) {
        flagEl.innerHTML = langData[lang].flag;
    }
    if (nameEl && langData[lang]) {
        nameEl.textContent = langData[lang].name;
    }
}

function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    const btn = dropdown.querySelector('.lang-dropdown-btn');

    if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    } else {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
}

function closeLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    const btn = dropdown?.querySelector('.lang-dropdown-btn');
    if (dropdown) {
        dropdown.classList.remove('open');
        btn?.setAttribute('aria-expanded', 'false');
    }
}

function selectLanguage(lang) {
    setLanguage(lang);
    closeLangDropdown();
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        closeLangDropdown();
    }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLangDropdown();
    }
});

// Initial set
setLanguage(currentLang);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Wizard Logic
let currentStep = 1;
const totalSteps = 7;

function openWizard() {
    document.getElementById('main-landing').style.display = 'none';
    document.getElementById('wizard-container').style.display = 'block';
    window.scrollTo(0, 0);
    resetWizard();
}

function closeWizard() {
    document.getElementById('main-landing').style.display = 'block';
    document.getElementById('wizard-container').style.display = 'none';
}

function resetWizard() {
    currentStep = 1;
    drivers = [];
    renderDrivers();
    updateWizardUI();
    document.getElementById('agree_terms').checked = false;

    // Clear search results when resetting wizard
    clearSearchResults();
}

function updateWizardUI() {


    // 0. Update Telegram Back Button Visibility & Web Back Button
    const backBtn = document.getElementById('btn_back');
    if (currentStep > 1) {
        if (tg && tg.BackButton) tg.BackButton.show();
        if (backBtn) backBtn.style.display = 'block';
    } else {
        if (tg && tg.BackButton) tg.BackButton.hide();
        if (backBtn) backBtn.style.display = 'none';
    }

    // 1. Show/Hide Step Content
    for (let i = 1; i <= totalSteps; i++) {
        const stepContent = document.getElementById(`step_${i}_content`);
        if (stepContent) {
            stepContent.style.display = (i === currentStep) ? 'block' : 'none';
        }
    }

    // 2. Update Stepper
    const steps = document.querySelectorAll('.stepper-item');
    steps.forEach((stepEl, index) => {
        const stepNum = index + 1;
        stepEl.classList.remove('active', 'completed');

        if (stepNum < currentStep) {
            stepEl.classList.add('completed');
        } else if (stepNum === currentStep) {
            stepEl.classList.add('active');
        }
    });

    // 3. Update Button Text
    const btn = document.querySelector('.wizard-footer .btn-primary');
    if (btn) {
        if (currentStep === totalSteps) {
            btn.innerHTML = 'Оплатить 56,000 UZS';
        } else {
            const continueText = translations[currentLang]?.btn_continue || "Продолжить &rarr;";
            btn.innerHTML = continueText;
        }
    }

    // 4. Special Logic for Step 6 (Confirmation)
    if (currentStep === 6) {
        updateConfirmationSummary();
    }

    // 5. Special Logic for Step 5 (Drivers Initial Load)
    if (currentStep === 5 && drivers.length === 0) {
        addDriver(true); // Add initial default driver (Owner)
    }
}

function submitWizard() {
    // Validation Logic per step
    if (currentStep === 1) {
        const carNumber = document.getElementById('car_number').value;
        const techSeries = document.getElementById('tech_series').value;
        const techNumber = document.getElementById('tech_number').value;
        const agree = document.getElementById('agree_terms').checked;

        if (!agree) {
            showAlert(currentLang === 'uz' ? "Iltimos, oferta shartlariga rozilik bildiring." : "Пожалуйста, согласитесь с условиями оферты.");
            return;
        }
        if (!carNumber || !techSeries || !techNumber) {
            showAlert(currentLang === 'uz' ? "Iltimos, barcha maydonlarni to'ldiring." : "Пожалуйста, заполните все поля.");
            return;
        }

        // Check if search was performed (search results visible)
        const searchResults = document.getElementById('vehicle_search_results');
        if (!searchResults || searchResults.style.display === 'none') {
            showAlert(currentLang === 'uz'
                ? "Iltimos, avval transport vositasini qidiring"
                : "Пожалуйста, сначала выполните поиск транспортного средства");
            return;
        }

        // Validate owner passport fields (manual input required)
        const passportSeries = document.getElementById('owner_passport_series').value.trim();
        const passportNumber = document.getElementById('owner_passport_number').value.trim();
        const birthDate = document.getElementById('owner_birth_date').value;

        if (!passportSeries || passportSeries.length < 2) {
            showAlert(currentLang === 'uz'
                ? "Iltimos, pasport seriyasini kiriting"
                : "Пожалуйста, введите серию паспорта владельца");
            document.getElementById('owner_passport_series').focus();
            return;
        }

        if (!passportNumber || passportNumber.length < 7) {
            showAlert(currentLang === 'uz'
                ? "Iltimos, pasport raqamini kiriting"
                : "Пожалуйста, введите номер паспорта владельца");
            document.getElementById('owner_passport_number').focus();
            return;
        }

        if (!birthDate) {
            showAlert(currentLang === 'uz'
                ? "Iltimos, tug'ilgan sanani kiriting"
                : "Пожалуйста, введите дату рождения владельца");
            document.getElementById('owner_birth_date').focus();
            return;
        }

        // Also update Step 2 fields to maintain compatibility
        const ownerPassSeriesStep2 = document.getElementById('owner_pass_series');
        const ownerPassNumberStep2 = document.getElementById('owner_pass_number');
        const ownerDobStep2 = document.getElementById('owner_dob');

        if (ownerPassSeriesStep2) ownerPassSeriesStep2.value = passportSeries.toUpperCase();
        if (ownerPassNumberStep2) ownerPassNumberStep2.value = passportNumber;
        if (ownerDobStep2) ownerDobStep2.value = birthDate;
    }

    if (currentStep === 2) {
        const pinfl = document.getElementById('owner_pinfl').value;
        if (!pinfl || pinfl.length < 14) {
            showAlert("Пожалуйста, введите корректный ПИНФЛ (14 цифр)");
            return;
        }
    }

    // If it's the last step, submit
    if (currentStep === totalSteps) {
        const data = {
            car: document.getElementById('car_number').value,
            step: 'Final Payment'
        };

        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            tg.sendData(JSON.stringify(data));
        } else {
            showAlert(`Payment Simulation:\nProcessing payment...`, 'success');
            closeWizard();
        }
        return;
    }

    // Go to next step
    currentStep++;
    updateWizardUI();
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
    }
}

function toggleApplicantFields() {
    const isOwner = document.getElementById('applicant_is_owner').checked;
    const fields = document.getElementById('applicant_fields');
    if (fields) {
        fields.style.display = isOwner ? 'none' : 'block';
    }
}

// Drivers Management
let drivers = [];

function addDriver(isOwner = false) {
    const id = Date.now();
    const driver = {
        id: id,
        name: isOwner ? "Владелец (Шаг 2)" : `Водитель ${drivers.length + 1}`,
        isOwner: isOwner
    };
    drivers.push(driver);
    renderDrivers();
}

function removeDriver(id) {
    drivers = drivers.filter(d => d.id !== id);
    renderDrivers();
}

function renderDrivers() {
    const list = document.getElementById('drivers_list');
    if (!list) return;
    list.innerHTML = '';

    drivers.forEach(driver => {
        const div = document.createElement('div');
        div.className = 'driver-item';
        div.innerHTML = `
            <div class="driver-info">
                <h4>${driver.name}</h4>
                <p>${driver.isOwner ? 'Данные из раздела Владелец' : 'Необходимы паспортные данные (в полной версии)'}</p>
            </div>
            ${!driver.isOwner ? `<button class="remove-driver" onclick="removeDriver(${driver.id})">Удалить</button>` : ''}
        `;
        list.appendChild(div);
    });
}

function toggleDriversList() {
    const unlimited = document.getElementById('unlimited_drivers').checked;
    const container = document.getElementById('drivers_container');
    if (container) {
        container.style.display = unlimited ? 'none' : 'block';
    }
}

function updateConfirmationSummary() {
    document.getElementById('sum_car_number').textContent = document.getElementById('car_number').value || '-';
    document.getElementById('sum_tech_passport').textContent = `${document.getElementById('tech_series').value} ${document.getElementById('tech_number').value}`.trim() || '-';

    // Use the owner PINFL from the search results (primary) or step 2 field (fallback)
    const ownerPinfl = document.getElementById('owner_pinfl_display')?.value ||
        document.getElementById('owner_pinfl')?.value || '-';
    document.getElementById('sum_owner_pinfl').textContent = ownerPinfl;

    // Use passport from step 1 (primary) or step 2 (fallback)
    const passportSeries = document.getElementById('owner_passport_series')?.value ||
        document.getElementById('owner_pass_series')?.value || '';
    const passportNumber = document.getElementById('owner_passport_number')?.value ||
        document.getElementById('owner_pass_number')?.value || '';
    document.getElementById('sum_owner_passport').textContent = `${passportSeries} ${passportNumber}`.trim() || '-';

    const unlimited = document.getElementById('unlimited_drivers').checked;
    document.getElementById('sum_drivers_type').textContent = unlimited ? 'Без ограничений (VIP)' : `Ограниченно (${drivers.length})`;
}

function startQuickQuote() {
    const heroInput = document.getElementById('hero_car_number');
    const carNumber = heroInput ? heroInput.value.trim() : '';

    // Validate license plate format: 01 A 001 AA (11 chars with spaces)
    if (!carNumber) {
        showAlert(currentLang === 'uz'
            ? "Iltimos, avtomobil raqamini kiriting"
            : "Пожалуйста, введите гос. номер автомобиля");
        if (heroInput) heroInput.focus();
        return;
    }

    // Check format: should be like "01 A 001 AA" (11 characters with spaces)
    if (!isValidLicensePlate(carNumber)) {
        showAlert(currentLang === 'uz'
            ? "Noto'g'ri format. Masalan: 01 A 001 AA"
            : "Неверный формат. Пример: 01 A 001 AA");
        if (heroInput) heroInput.focus();
        return;
    }

    // Open wizard and populate the car number field
    openWizard();
    const wizardInput = document.getElementById('car_number');
    if (wizardInput) {
        wizardInput.value = carNumber.toUpperCase();
    }
}

// Custom Alert Logic
function showAlert(message, type = 'error') {
    const modal = document.getElementById('custom-alert');
    const msgEl = document.getElementById('alert-message');
    const iconEl = document.querySelector('.alert-icon');

    msgEl.innerText = message;

    if (type === 'success') {
        iconEl.style.background = '#f0fff4';
        iconEl.style.color = '#48bb78';
        iconEl.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;
    } else {
        iconEl.style.background = '#fff5f5';
        iconEl.style.color = '#ff4d4d';
        iconEl.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        `;
    }

    modal.style.display = 'flex';
}

function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

// License Plate Formatting (shared by both hero and wizard inputs)
function formatLicensePlate(input) {
    let val = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let formatted = '';

    if (val.length > 0) {
        formatted += val.substring(0, 2); // Region (01)
        if (val.length > 2) {
            formatted += ' ' + val.substring(2, 3); // Letter (A)
            if (val.length > 3) {
                formatted += ' ' + val.substring(3, 6); // Number (001)
                if (val.length > 6) {
                    formatted += ' ' + val.substring(6, 8); // Series (AA)
                }
            }
        }
    }
    input.value = formatted.substring(0, 11); // Max: "01 A 001 AA"
}

// Shared validation function for license plate format
function isValidLicensePlate(value) {
    const plateRegex = /^\d{2}\s[A-Z]\s\d{3}\s[A-Z]{2}$/;
    return plateRegex.test(value.trim());
}

document.addEventListener('DOMContentLoaded', () => {
    const heroInput = document.getElementById('hero_car_number');
    const wizardInput = document.getElementById('car_number');

    // Format license plate on input for both fields
    if (heroInput) {
        heroInput.addEventListener('input', (e) => formatLicensePlate(e.target));

        // Allow Enter key to trigger the start button
        heroInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                startQuickQuote();
            }
        });

        // Ensure input is clickable and focusable
        heroInput.addEventListener('click', (e) => {
            e.target.focus();
        });
    }

    if (wizardInput) {
        wizardInput.addEventListener('input', (e) => formatLicensePlate(e.target));
    }
});

// ========================================
// Vehicle Search Functionality
// ========================================

/**
 * Searches for vehicle and owner information based on car number and tech passport
 * Reveals the hidden sections with auto-filled data on success
 */
function searchVehicle() {
    const carNumber = document.getElementById('car_number').value.trim();
    const techSeries = document.getElementById('tech_series').value.trim().toUpperCase();
    const techNumber = document.getElementById('tech_number').value.trim();
    const searchBtn = document.getElementById('btn_search_vehicle');

    // Validation
    if (!carNumber) {
        showAlert(currentLang === 'uz'
            ? "Iltimos, davlat raqamini kiriting"
            : "Пожалуйста, введите гос. номер");
        document.getElementById('car_number').focus();
        return;
    }

    if (!isValidLicensePlate(carNumber)) {
        showAlert(currentLang === 'uz'
            ? "Noto'g'ri format. Masalan: 01 A 001 AA"
            : "Неверный формат гос. номера. Пример: 01 A 001 AA");
        document.getElementById('car_number').focus();
        return;
    }

    if (!techSeries || techSeries.length < 2) {
        showAlert(currentLang === 'uz'
            ? "Iltimos, texnik pasport seriyasini kiriting"
            : "Пожалуйста, введите серию техпаспорта");
        document.getElementById('tech_series').focus();
        return;
    }

    if (!techNumber || techNumber.length < 6) {
        showAlert(currentLang === 'uz'
            ? "Iltimos, texnik pasport raqamini kiriting"
            : "Пожалуйста, введите номер техпаспорта");
        document.getElementById('tech_number').focus();
        return;
    }

    // Show loading state
    searchBtn.classList.add('loading');
    searchBtn.disabled = true;

    // Simulate API call (replace with actual API integration)
    setTimeout(() => {
        // Simulated API response data
        const vehicleData = simulateVehicleAPIResponse(carNumber, techSeries, techNumber);

        if (vehicleData.success) {
            // Populate vehicle registration data
            document.getElementById('vehicle_gov_number').value = vehicleData.vehicle.govNumber;
            document.getElementById('vehicle_tech_series').value = vehicleData.vehicle.techSeries;
            document.getElementById('vehicle_tech_number').value = vehicleData.vehicle.techNumber;
            document.getElementById('vehicle_model').value = vehicleData.vehicle.model;
            document.getElementById('vehicle_type_display').value = vehicleData.vehicle.type;
            document.getElementById('vehicle_region').value = vehicleData.vehicle.region;
            document.getElementById('vehicle_year').value = vehicleData.vehicle.year;

            // Populate owner data (read-only fields)
            document.getElementById('owner_pinfl_display').value = vehicleData.owner.pinfl;
            document.getElementById('owner_fullname').value = vehicleData.owner.fullName || '';

            // Also populate hidden owner_pinfl field for step 2 compatibility
            const ownerPinflStep2 = document.getElementById('owner_pinfl');
            if (ownerPinflStep2) {
                ownerPinflStep2.value = vehicleData.owner.pinfl;
            }

            // Show the results container with animation
            const resultsContainer = document.getElementById('vehicle_search_results');
            resultsContainer.style.display = 'block';

            // Scroll to results smoothly
            setTimeout(() => {
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Update button text to indicate search was successful
            searchBtn.innerHTML = '<span>' + (currentLang === 'uz' ? 'QAYTA TOPISH' : 'НАЙТИ ПОВТОРНО') + '</span>';
        } else {
            showAlert(vehicleData.error || (currentLang === 'uz'
                ? "Avtomobil topilmadi. Iltimos, ma'lumotlarni tekshiring"
                : "Автомобиль не найден. Пожалуйста, проверьте введённые данные"));
        }

        // Remove loading state
        searchBtn.classList.remove('loading');
        searchBtn.disabled = false;
    }, 1200); // Simulated network delay
}

/**
 * Simulates API response for vehicle search
 * In production, this would be replaced with actual API call
 */
function simulateVehicleAPIResponse(carNumber, techSeries, techNumber) {
    // Extract region code from car number for simulation
    const regionCode = carNumber.substring(0, 2);
    const regionMap = {
        '01': 'город Ташкент',
        '10': 'Ташкентская область',
        '20': 'Сырдарьинская область',
        '25': 'Джизакская область',
        '30': 'Самаркандская область',
        '40': 'Ферганская область',
        '50': 'Наманганская область',
        '60': 'Андижанская область',
        '70': 'Кашкадарьинская область',
        '75': 'Сурхандарьинская область',
        '80': 'Бухарская область',
        '85': 'Навоийская область',
        '90': 'Хорезмская область',
        '95': 'Республика Каракалпакстан'
    };

    const vehicleTypeMap = {
        'car': 'Легковые автомобили',
        'truck': 'Грузовые автомобили',
        'bus': 'Автобусы',
        'motorcycle': 'Мотоциклы',
        'trailer': 'Прицепы'
    };

    const selectedVehicleType = document.getElementById('vehicle_type').value || 'car';
    const vehicleModels = ['SPARK', 'COBALT', 'NEXIA', 'LACETTI', 'MALIBU', 'CAPTIVA', 'TRACKER', 'DAMAS', 'LABO'];
    const randomModel = vehicleModels[Math.floor(Math.random() * vehicleModels.length)];
    const randomYear = 2018 + Math.floor(Math.random() * 7); // 2018-2024

    // Simulate a random PINFL (14 digits)
    const randomPinfl = Array(14).fill(0).map(() => Math.floor(Math.random() * 10)).join('');

    // Generate a random owner name
    const firstNames = ['Абдулла', 'Бахтиёр', 'Дильмурод', 'Жамшид', 'Камол', 'Мирзо', 'Нодир', 'Рустам', 'Санжар', 'Улугбек'];
    const lastNames = ['Алиев', 'Каримов', 'Мирзаев', 'Нурматов', 'Рахимов', 'Саидов', 'Хакимов', 'Юсупов', 'Исмаилов', 'Турсунов'];
    const patronymics = ['Абдуллаевич', 'Бахтиёрович', 'Камолович', 'Мирзоевич', 'Нодирович', 'Рустамович', 'Сарварович', 'Улугбекович'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomPatronymic = patronymics[Math.floor(Math.random() * patronymics.length)];

    return {
        success: true,
        vehicle: {
            govNumber: carNumber.toUpperCase(),
            techSeries: techSeries.toUpperCase(),
            techNumber: techNumber,
            model: randomModel,
            type: vehicleTypeMap[selectedVehicleType] || 'Легковые автомобили',
            region: regionMap[regionCode] || 'город Ташкент',
            year: randomYear.toString()
        },
        owner: {
            pinfl: randomPinfl,
            fullName: `${randomLastName} ${randomFirstName} ${randomPatronymic}`
        }
    };
}

/**
 * Clears search results and hides the results container
 */
function clearSearchResults() {
    const resultsContainer = document.getElementById('vehicle_search_results');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }

    // Clear all auto-filled fields
    const fieldsToClear = [
        'vehicle_gov_number', 'vehicle_tech_series', 'vehicle_tech_number',
        'vehicle_model', 'vehicle_type_display', 'vehicle_region', 'vehicle_year',
        'owner_pinfl_display', 'owner_fullname',
        'owner_passport_series', 'owner_passport_number', 'owner_birth_date'
    ];

    fieldsToClear.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) field.value = '';
    });

    // Reset search button text
    const searchBtn = document.getElementById('btn_search_vehicle');
    if (searchBtn) {
        searchBtn.innerHTML = '<span>' + (currentLang === 'uz' ? 'TOPISH' : 'НАЙТИ') + '</span>';
    }
}

// Add translations for search button
if (translations.ru) {
    translations.ru.btn_search = "НАЙТИ";
    translations.ru.btn_search_again = "НАЙТИ ПОВТОРНО";
}
if (translations.uz) {
    translations.uz.btn_search = "TOPISH";
    translations.uz.btn_search_again = "QAYTA TOPISH";
}
if (translations.en) {
    translations.en.btn_search = "SEARCH";
    translations.en.btn_search_again = "SEARCH AGAIN";
}
