// ============================================
// DARK / LIGHT THEME TOGGLE
// ============================================

/**
 * Theme Management System
 * - Manual toggle: User clicks the theme button
 * - Automatic: Based on time (19:00-07:00 = dark, 07:00-19:00 = light)
 * - Priority: User preference (localStorage) > Automatic
 */

// Check if user has saved theme preference
function getSavedTheme() {
    return localStorage.getItem('es_theme');
}

// Save theme preference
function saveTheme(theme) {
    localStorage.setItem('es_theme', theme);
}

// Get current hour (0-23)
function getCurrentHour() {
    return new Date().getHours();
}

// Determine automatic theme based on time
// Dark theme: 19:00 (7 PM) to 07:00 (7 AM)
// Light theme: 07:00 (7 AM) to 19:00 (7 PM)
function getAutoTheme() {
    const hour = getCurrentHour();
    return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

// Apply theme to the page
function applyTheme(theme) {
    const body = document.body;
    const themeIconSvg = document.getElementById('theme-icon-svg');

    if (theme === 'dark') {
        body.classList.add('dark');
        // Moon icon for dark mode
        if (themeIconSvg) themeIconSvg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
        body.classList.remove('dark');
        // Sun icon for light mode
        if (themeIconSvg) themeIconSvg.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
}

// Toggle theme manually (user clicks button)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Apply and save the choice
    applyTheme(newTheme);
    saveTheme(newTheme);
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = getSavedTheme();

    if (savedTheme) {
        // User has a saved preference - use it
        applyTheme(savedTheme);
    } else {
        // No saved preference - use automatic based on time
        const autoTheme = getAutoTheme();
        applyTheme(autoTheme);
        // DON'T save automatic theme - only save manual choices
    }
}

// Run theme initialization immediately
initTheme();

// Telegram Web App Initialization
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();

    // Initialize Telegram Back Button
    tg.BackButton.onClick(() => {
        prevStep();
    });
}

// ============================================
// REGION CODE MAPPING - Uzbekistan License Plates
// ============================================

/**
 * Official Uzbekistan region code mapping
 * Based on territorial codes (first 2 digits of license plate)
 * Category: 'tashkent' for Tashkent city/region, 'other' for all other regions
 */
const REGION_CODE_MAP = {
    // 01 → Tashkent city
    '01': { name: 'город Ташкент', category: 'tashkent' },

    // 10–19 → Tashkent region
    '10': { name: 'Ташкентская область', category: 'tashkent' },
    '11': { name: 'Ташкентская область', category: 'tashkent' },
    '12': { name: 'Ташкентская область', category: 'tashkent' },
    '13': { name: 'Ташкентская область', category: 'tashkent' },
    '14': { name: 'Ташкентская область', category: 'tashkent' },
    '15': { name: 'Ташкентская область', category: 'tashkent' },
    '16': { name: 'Ташкентская область', category: 'tashkent' },
    '17': { name: 'Ташкентская область', category: 'tashkent' },
    '18': { name: 'Ташкентская область', category: 'tashkent' },
    '19': { name: 'Ташкентская область', category: 'tashkent' },

    // 20–24 → Syrdarya region
    '20': { name: 'Сырдарьинская область', category: 'other' },
    '21': { name: 'Сырдарьинская область', category: 'other' },
    '22': { name: 'Сырдарьинская область', category: 'other' },
    '23': { name: 'Сырдарьинская область', category: 'other' },
    '24': { name: 'Сырдарьинская область', category: 'other' },

    // 25–29 → Jizzakh region
    '25': { name: 'Джизакская область', category: 'other' },
    '26': { name: 'Джизакская область', category: 'other' },
    '27': { name: 'Джизакская область', category: 'other' },
    '28': { name: 'Джизакская область', category: 'other' },
    '29': { name: 'Джизакская область', category: 'other' },

    // 30–39 → Samarkand region
    '30': { name: 'Самаркандская область', category: 'other' },
    '31': { name: 'Самаркандская область', category: 'other' },
    '32': { name: 'Самаркандская область', category: 'other' },
    '33': { name: 'Самаркандская область', category: 'other' },
    '34': { name: 'Самаркандская область', category: 'other' },
    '35': { name: 'Самаркандская область', category: 'other' },
    '36': { name: 'Самаркандская область', category: 'other' },
    '37': { name: 'Самаркандская область', category: 'other' },
    '38': { name: 'Самаркандская область', category: 'other' },
    '39': { name: 'Самаркандская область', category: 'other' },

    // 40–49 → Fergana region
    '40': { name: 'Ферганская область', category: 'other' },
    '41': { name: 'Ферганская область', category: 'other' },
    '42': { name: 'Ферганская область', category: 'other' },
    '43': { name: 'Ферганская область', category: 'other' },
    '44': { name: 'Ферганская область', category: 'other' },
    '45': { name: 'Ферганская область', category: 'other' },
    '46': { name: 'Ферганская область', category: 'other' },
    '47': { name: 'Ферганская область', category: 'other' },
    '48': { name: 'Ферганская область', category: 'other' },
    '49': { name: 'Ферганская область', category: 'other' },

    // 50–59 → Namangan region
    '50': { name: 'Наманганская область', category: 'other' },
    '51': { name: 'Наманганская область', category: 'other' },
    '52': { name: 'Наманганская область', category: 'other' },
    '53': { name: 'Наманганская область', category: 'other' },
    '54': { name: 'Наманганская область', category: 'other' },
    '55': { name: 'Наманганская область', category: 'other' },
    '56': { name: 'Наманганская область', category: 'other' },
    '57': { name: 'Наманганская область', category: 'other' },
    '58': { name: 'Наманганская область', category: 'other' },
    '59': { name: 'Наманганская область', category: 'other' },

    // 60–69 → Andijan region
    '60': { name: 'Андижанская область', category: 'other' },
    '61': { name: 'Андижанская область', category: 'other' },
    '62': { name: 'Андижанская область', category: 'other' },
    '63': { name: 'Андижанская область', category: 'other' },
    '64': { name: 'Андижанская область', category: 'other' },
    '65': { name: 'Андижанская область', category: 'other' },
    '66': { name: 'Андижанская область', category: 'other' },
    '67': { name: 'Андижанская область', category: 'other' },
    '68': { name: 'Андижанская область', category: 'other' },
    '69': { name: 'Андижанская область', category: 'other' },

    // 70–74 → Kashkadarya region
    '70': { name: 'Кашкадарьинская область', category: 'other' },
    '71': { name: 'Кашкадарьинская область', category: 'other' },
    '72': { name: 'Кашкадарьинская область', category: 'other' },
    '73': { name: 'Кашкадарьинская область', category: 'other' },
    '74': { name: 'Кашкадарьинская область', category: 'other' },

    // 75–79 → Surkhandarya region
    '75': { name: 'Сурхандарьинская область', category: 'other' },
    '76': { name: 'Сурхандарьинская область', category: 'other' },
    '77': { name: 'Сурхандарьинская область', category: 'other' },
    '78': { name: 'Сурхандарьинская область', category: 'other' },
    '79': { name: 'Сурхандарьинская область', category: 'other' },

    // 80–84 → Bukhara region
    '80': { name: 'Бухарская область', category: 'other' },
    '81': { name: 'Бухарская область', category: 'other' },
    '82': { name: 'Бухарская область', category: 'other' },
    '83': { name: 'Бухарская область', category: 'other' },
    '84': { name: 'Бухарская область', category: 'other' },

    // 85–89 → Navoi region
    '85': { name: 'Навоийская область', category: 'other' },
    '86': { name: 'Навоийская область', category: 'other' },
    '87': { name: 'Навоийская область', category: 'other' },
    '88': { name: 'Навоийская область', category: 'other' },
    '89': { name: 'Навоийская область', category: 'other' },

    // 90–94 → Khorezm region
    '90': { name: 'Хорезмская область', category: 'other' },
    '91': { name: 'Хорезмская область', category: 'other' },
    '92': { name: 'Хорезмская область', category: 'other' },
    '93': { name: 'Хорезмская область', category: 'other' },
    '94': { name: 'Хорезмская область', category: 'other' },

    // 95–99 → Republic of Karakalpakstan
    '95': { name: 'Республика Каракалпакстан', category: 'other' },
    '96': { name: 'Республика Каракалпакстан', category: 'other' },
    '97': { name: 'Республика Каракалпакстан', category: 'other' },
    '98': { name: 'Республика Каракалпакстан', category: 'other' },
    '99': { name: 'Республика Каракалпакстан', category: 'other' }
};

// Track if region was auto-detected (to lock the field)
let regionAutoDetected = false;

/**
 * Detect region from license plate number
 * @param {string} plateNumber - The vehicle license plate (e.g., "01A123AA" or "01 A 123 AA")
 * @returns {Object|null} - { name, category } or null if not found
 */
function detectRegionFromPlate(plateNumber) {
    if (!plateNumber || plateNumber.length < 2) return null;

    // Extract first 2 characters (digits) - remove any spaces first
    const cleanPlate = plateNumber.replace(/\s/g, '');
    const regionCode = cleanPlate.substring(0, 2);

    // Validate it's a valid 2-digit code
    if (!/^\d{2}$/.test(regionCode)) return null;

    return REGION_CODE_MAP[regionCode] || null;
}

/**
 * Update region fields based on license plate input
 * Called when user enters/changes the license plate
 */
function updateRegionFromPlate() {
    const govNumberInput = document.getElementById('osago_gov_number');
    const calcRegionSelect = document.getElementById('calc_region');

    if (!govNumberInput || !calcRegionSelect) return;

    const plateNumber = govNumberInput.value.trim();
    const regionInfo = detectRegionFromPlate(plateNumber);

    if (regionInfo) {
        // Auto-detected: update dropdown and lock it
        calcRegionSelect.value = regionInfo.category;
        calcRegionSelect.disabled = true;
        calcRegionSelect.classList.add('readonly', 'auto-detected');
        regionAutoDetected = true;

        // Store detected region name for display in vehicle info
        window.detectedRegionName = regionInfo.name;
    } else {
        // No valid region code: unlock dropdown for manual selection
        calcRegionSelect.disabled = false;
        calcRegionSelect.classList.remove('readonly', 'auto-detected');
        regionAutoDetected = false;
        window.detectedRegionName = null;
    }
}

// ============================================
// OSAGO PRICING CALCULATION
// ============================================

/**
 * OSAGO Pricing Table (на 1 год)
 * Based on the official pricing structure
 * 
 * Prices based on:
 * - Vehicle Type (Вид ТС): car, truck, bus, motorcycle
 * - Region (Регион): tashkent (Ташкент/обл.), other (Другие регионы)
 * - Driver Count: limited (огр./до 5), unlimited (неогр.)
 */
const OSAGO_PRICES = {
    car: {
        tashkent: { limited: 192000, unlimited: 384000 },
        other: { limited: 160000, unlimited: 320000 }
    },
    truck: {
        tashkent: { limited: 336000, unlimited: 672000 },
        other: { limited: 280000, unlimited: 560000 }
    },
    bus: {
        tashkent: { limited: 384000, unlimited: 768000 },
        other: { limited: 320000, unlimited: 640000 }
    },
    motorcycle: {
        tashkent: { limited: 72000, unlimited: 144000 },
        other: { limited: 60000, unlimited: 120000 }
    }
};

/**
 * Calculate OSAGO price based on parameters
 * @param {string} vehicleType - Type of vehicle: 'car', 'truck', 'bus', 'motorcycle'
 * @param {string} region - Region: 'tashkent' or 'other'  
 * @param {string} driverCount - Driver count: 'limited' or 'unlimited'
 * @param {string} period - Insurance period: '6months' or '1year'
 * @returns {number} - Price in UZS
 */
function calculateOSAGOPrice(vehicleType, region, driverCount, period) {
    // Get base price for 1 year
    const basePrice = OSAGO_PRICES[vehicleType]?.[region]?.[driverCount] || 0;

    // If 6 months, return half price
    if (period === '6months') {
        return Math.round(basePrice / 2);
    }

    return basePrice;
}

/**
 * Update the pricing display in the results panel
 */
function updatePricingDisplay() {
    const vehicleType = document.getElementById('calc_vehicle_type')?.value || 'car';
    const region = document.getElementById('calc_region')?.value || 'tashkent';
    const driverCount = document.getElementById('calc_driver_count')?.value || 'unlimited';
    const period = document.getElementById('calc_period')?.value || '1year';

    const price = calculateOSAGOPrice(vehicleType, region, driverCount, period);

    // Update the displayed price
    const costAmountEl = document.querySelector('.cost-amount');
    if (costAmountEl) {
        // Format price with spaces for thousands
        const formattedPrice = price.toLocaleString('ru-RU');
        // Calculate approximate USD value (assuming 1 USD ≈ 12,200 UZS)
        const usdPrice = (price / 12200).toFixed(2);
        costAmountEl.innerHTML = `${formattedPrice} сум <span class="cost-usd">(${usdPrice} $)</span>`;
    }
}



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
        label_tech_passport: "Данные тех. паспорта*",
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
        label_tech_passport: "Texnik pasport*",
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
        label_tech_passport: "Tech Passport*",
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
    const nameEl = document.getElementById('current-lang-name');
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
        // Blur search if focused
        const searchInput = document.getElementById('header-search-input');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.blur();
        }
    }
    // Ctrl+K to focus header search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('header-search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
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
let wizardProgress = 0;

// Progress indicator management
function updateProgressIndicator(percentage) {
    wizardProgress = percentage;
    const progressBar = document.querySelector('.wizard-progress-bar');
    const progressFill = document.querySelector('.wizard-progress-fill');
    const progressText = document.querySelector('.wizard-progress-text');

    if (progressBar) {
        // Show progress bar if hidden
        if (percentage > 0) {
            progressBar.style.display = 'flex';
        }
    }

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.textContent = `${Math.round(percentage)}%`;
    }
}

function hideProgressIndicator() {
    const progressBar = document.querySelector('.wizard-progress-bar');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
    wizardProgress = 0;
}

function calculateProgressBySection() {
    // Progress increases by meaningful sections, not individual fields
    // Each section represents a logical completion milestone

    if (currentStep === 1) {
        // Initial step - vehicle data entry
        return 35; // Starting meaningful value
    } else if (currentStep === 2) {
        // Vehicle data loaded and confirmed
        return 50;
    } else if (currentStep === 3) {
        // Owner data section complete
        return 65;
    } else if (currentStep === 4) {
        // Applicant data confirmed
        return 75;
    } else if (currentStep === 5) {
        // Period/insurance parameters set
        return 85;
    } else if (currentStep === 6) {
        // Drivers information complete
        return 92;
    } else if (currentStep === 7) {
        // Final confirmation - ready for payment
        return 100;
    }

    return 35; // Default starting value
}

// Transfer car number from hero section to wizard
function startQuickQuote() {
    const heroCarNumber = document.getElementById('hero_car_number');
    const carNumber = heroCarNumber ? heroCarNumber.value.trim() : '';

    // Open wizard with the car number
    openWizard(carNumber);
}

function openWizard(carNumber = '') {
    document.getElementById('main-landing').style.display = 'none';
    document.getElementById('wizard-container').style.display = 'block';
    window.scrollTo(0, 0);
    resetWizard();

    // Pre-fill car number if provided
    if (carNumber) {
        const osagoGovNumber = document.getElementById('osago_gov_number');
        if (osagoGovNumber) {
            osagoGovNumber.value = carNumber;

            // Trigger region detection if the function exists
            if (typeof updateRegionFromPlate === 'function') {
                updateRegionFromPlate();
            }
        }
    }

    // Show progress starting at meaningful value (35%)
    updateProgressIndicator(35);
}

function closeWizard() {
    document.getElementById('main-landing').style.display = 'block';
    document.getElementById('wizard-container').style.display = 'none';

    // Hide progress indicator when returning to hero
    hideProgressIndicator();
}

function resetWizard() {
    currentStep = 1;
    drivers = [];
    renderDrivers();
    updateWizardUI();

    // Use correct checkbox ID
    const agreeCheckbox = document.getElementById('osago_agree_terms');
    if (agreeCheckbox) {
        agreeCheckbox.checked = false;
    }

    // Clear search results when resetting wizard
    clearSearchResults();

    // Reset progress to initial value
    updateProgressIndicator(35);
}

function updateWizardUI() {

    // Update progress bar based on current section
    const sectionProgress = calculateProgressBySection();
    updateProgressIndicator(sectionProgress);

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
        addDriver(true);  // Add initial default driver (Owner)
    }
}

function submitWizard() {
    // Validation Logic per step
    if (currentStep === 1) {
        const carNumber = document.getElementById('osago_gov_number').value;
        const techSeries = document.getElementById('osago_tech_series').value;
        const techNumber = document.getElementById('osago_tech_number').value;
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

        // Clear previous error states
        clearFieldError('owner_passport_series');
        clearFieldError('owner_passport_number');
        clearFieldError('owner_birth_date');

        if (!passportSeries || passportSeries.length < 2) {
            setFieldError('owner_passport_series', currentLang === 'uz'
                ? "Majburiy maydon"
                : "Обязательное поле");
            return;
        }

        if (!passportNumber || passportNumber.length < 7) {
            setFieldError('owner_passport_number', currentLang === 'uz'
                ? "Minimum 7 ta belgi"
                : "Минимум 7 символов");
            return;
        }

        if (!birthDate) {
            setFieldError('owner_birth_date', currentLang === 'uz'
                ? "Majburiy maydon"
                : "Обязательное поле");
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
            car: document.getElementById('osago_gov_number').value,
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
    // Use the correct osago field IDs for single source of truth
    const carNumber = document.getElementById('osago_gov_number')?.value || '-';
    document.getElementById('sum_car_number').textContent = carNumber;

    const techSeries = document.getElementById('osago_tech_series')?.value || '';
    const techNumber = document.getElementById('osago_tech_number')?.value || '';
    document.getElementById('sum_tech_passport').textContent = `${techSeries} ${techNumber}`.trim() || '-';

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

    // Validate license plate format: 01 A 123 AA (11 chars with spaces)
    if (!carNumber) {
        showAlert(currentLang === 'uz'
            ? "Iltimos, avtomobil raqamini kiriting"
            : "Пожалуйста, введите гос. номер автомобиля");
        if (heroInput) heroInput.focus();
        return;
    }

    // Check format: should be like "01 A 123 AA" (11 characters with spaces)
    if (!isValidLicensePlate(carNumber)) {
        showAlert(currentLang === 'uz'
            ? "Noto'g'ri format. Masalan: 01 A 123 AA"
            : "Неверный формат. Пример: 01 A 123 AA");
        if (heroInput) heroInput.focus();
        return;
    }

    // Open wizard and populate the government number field (single source of truth)
    openWizard();
    const wizardInput = document.getElementById('osago_gov_number');
    if (wizardInput) {
        wizardInput.value = carNumber.toUpperCase();
        // Also trigger region detection from the plate number
        updateRegionFromPlate();
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

// Alias for showCustomAlert (uses showAlert with additional warning type support)
function showCustomAlert(message, type = 'error') {
    showAlert(message, type === 'warning' ? 'error' : type);
}

// ========================================
// Inline Field Validation Helpers
// ========================================

/**
 * Sets error state on a field with inline message
 * @param {string} fieldId - The ID of the input field
 * @param {string} message - Error message to display
 */
function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Add error class to input
    field.classList.add('input-error');
    field.classList.remove('input-valid');

    // Remove existing error message if any
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();

    // Create and append error message
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.textContent = message;
    field.parentNode.appendChild(errorSpan);

    // Focus and scroll to field
    field.focus();
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Clears error state from a field
 * @param {string} fieldId - The ID of the input field
 */
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('input-error');

    // Remove error message if exists
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
}

/**
 * Marks a field as valid (optional visual feedback)
 * @param {string} fieldId - The ID of the input field
 */
function setFieldValid(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('input-error');
    field.classList.add('input-valid');

    // Remove any error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
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

    // Tech passport series formatting - uppercase letters only (max 3)
    const techSeriesInput = document.getElementById('tech_series');
    if (techSeriesInput) {
        techSeriesInput.addEventListener('input', (e) => {
            // Remove non-letter characters and convert to uppercase
            let val = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
            e.target.value = val.substring(0, 3);
        });
    }

    // Tech passport number formatting - digits only (max 7)
    const techNumberInput = document.getElementById('tech_number');
    if (techNumberInput) {
        techNumberInput.addEventListener('input', (e) => {
            // Remove non-digit characters
            let val = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = val.substring(0, 7);
        });
    }

    // Clear validation errors when user starts typing in owner fields
    const ownerFields = ['owner_passport_series', 'owner_passport_number', 'owner_birth_date'];
    ownerFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => clearFieldError(fieldId));
            field.addEventListener('change', () => clearFieldError(fieldId));
        }
    });
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

// ============================================
// NEW OSAGO WIZARD - JavaScript Functions
// ============================================

// Current OSAGO step (1 = Транспорт, 2 = Собственник, 3 = Заявитель)
let currentOsagoStep = 1;
const totalOsagoInnerSteps = 3;

/**
 * Initialize OSAGO Wizard on page load
 */
function initOsagoWizard() {
    // Set default start date to today
    const startDateInput = document.getElementById('calc_start_date');
    if (startDateInput) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        startDateInput.value = formattedDate;
        updateEndDate();
    }

    // Initialize parameters toggle
    const paramsToggle = document.getElementById('params_toggle_btn');
    if (paramsToggle) {
        paramsToggle.addEventListener('click', toggleParamsContent);
    }

    // Initialize input formatting for new OSAGO fields
    initOsagoInputFormatting();

    // Update inner stepper state
    updateInnerStepper();
}

/**
 * Toggle the calculation parameters section
 */
function toggleParamsContent() {
    const paramsContent = document.getElementById('params-content');
    const toggleBtn = document.getElementById('params_toggle_btn');

    if (paramsContent && toggleBtn) {
        const isExpanded = !paramsContent.classList.contains('collapsed');

        if (isExpanded) {
            paramsContent.classList.add('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'false');
            // Change icon to plus
            toggleBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            `;
        } else {
            paramsContent.classList.remove('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'true');
            // Change icon to minus
            toggleBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            `;
        }
    }
}

/**
 * Update end date based on start date and period
 */
function updateEndDate() {
    const startDateInput = document.getElementById('calc_start_date');
    const endDateInput = document.getElementById('calc_end_date');
    const periodSelect = document.getElementById('calc_period');

    if (startDateInput && endDateInput && startDateInput.value) {
        const startDate = new Date(startDateInput.value);
        let endDate = new Date(startDate);

        // Calculate end date based on selected period
        const period = periodSelect?.value || '1year';

        if (period === '6months') {
            // 6 months
            endDate.setMonth(endDate.getMonth() + 6);
            endDate.setDate(endDate.getDate() - 1);
        } else {
            // Default 1 year
            endDate.setFullYear(endDate.getFullYear() + 1);
            endDate.setDate(endDate.getDate() - 1);
        }

        // Format as dd/mm/yyyy for display
        const day = String(endDate.getDate()).padStart(2, '0');
        const month = String(endDate.getMonth() + 1).padStart(2, '0');
        const year = endDate.getFullYear();

        endDateInput.value = `${day}/${month}/${year}`;
    }
}

/**
 * Initialize input formatting for OSAGO fields
 */
function initOsagoInputFormatting() {
    // Gov number formatting (uppercase, alphanumeric) + region auto-detection
    const govNumber = document.getElementById('osago_gov_number');
    if (govNumber) {
        govNumber.addEventListener('input', function () {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 9);
            // Auto-detect region from license plate
            updateRegionFromPlate();
        });
    }

    // Tech series formatting (uppercase letters only)
    const techSeries = document.getElementById('osago_tech_series');
    if (techSeries) {
        techSeries.addEventListener('input', function () {
            this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
        });
    }

    // Tech number formatting (digits only)
    const techNumber = document.getElementById('osago_tech_number');
    if (techNumber) {
        techNumber.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 7);
        });
    }

    // Passport series formatting (uppercase letters only)
    const passportSeries = document.getElementById('osago_owner_passport_series');
    if (passportSeries) {
        passportSeries.addEventListener('input', function () {
            this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 2);
        });
    }

    // Passport number formatting (digits only)
    const passportNumber = document.getElementById('osago_owner_passport_number');
    if (passportNumber) {
        passportNumber.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 7);
        });
    }

    // Start date change listener
    const startDate = document.getElementById('calc_start_date');
    if (startDate) {
        startDate.addEventListener('change', updateEndDate);
    }
}

/**
 * Load vehicle data by clicking "Загрузить" button
 */
function loadVehicleData() {
    const govNumber = document.getElementById('osago_gov_number')?.value.trim();
    const techSeries = document.getElementById('osago_tech_series')?.value.trim().toUpperCase();
    const techNumber = document.getElementById('osago_tech_number')?.value.trim();

    // Validation
    if (!govNumber) {
        showCustomAlert('Введите государственный номер автомобиля', 'warning');
        return;
    }
    if (!techSeries || techSeries.length !== 3) {
        showCustomAlert('Введите серию техпаспорта (3 буквы)', 'warning');
        return;
    }
    if (!techNumber || techNumber.length < 6) {
        showCustomAlert('Введите номер техпаспорта (минимум 6 цифр)', 'warning');
        return;
    }

    // Show loading state
    const loadBtn = document.getElementById('btn_osago_load');
    if (loadBtn) {
        loadBtn.classList.add('loading');
        loadBtn.disabled = true;
    }

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        if (loadBtn) {
            loadBtn.classList.remove('loading');
            loadBtn.disabled = false;
        }

        // Get auto-detected region from license plate
        const regionInfo = detectRegionFromPlate(govNumber);
        const regionName = regionInfo ? regionInfo.name : 'город Ташкент';

        // Update calc_region dropdown based on detected region
        const calcRegionSelect = document.getElementById('calc_region');
        if (calcRegionSelect && regionInfo) {
            calcRegionSelect.value = regionInfo.category;
            calcRegionSelect.disabled = true;
            calcRegionSelect.classList.add('readonly', 'auto-detected');
            regionAutoDetected = true;
        }

        // Generate mock vehicle data
        const vehicleTypeMap = {
            'car': 'Легковые автомобили',
            'truck': 'Грузовые автомобили',
            'bus': 'Автобусы',
            'motorcycle': 'Мотоциклы',
            'trailer': 'Прицепы'
        };
        const selectedVehicleType = document.getElementById('calc_vehicle_type')?.value || 'car';
        const vehicleModels = ['SPARK', 'COBALT', 'NEXIA', 'LACETTI', 'MALIBU', 'CAPTIVA', 'TRACKER', 'DAMAS', 'LABO'];
        const randomModel = vehicleModels[Math.floor(Math.random() * vehicleModels.length)];
        const randomYear = 2018 + Math.floor(Math.random() * 7);

        // Generate mock owner data
        const randomPinfl = Array(14).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
        const firstNames = ['Абдулла', 'Бахтиёр', 'Дильмурод', 'Жамшид', 'Камол', 'Мирзо', 'Нодир', 'Рустам', 'Санжар', 'Улугбек'];
        const lastNames = ['Алиев', 'Каримов', 'Мирзаев', 'Нурматов', 'Рахимов', 'Саидов', 'Хакимов', 'Юсупов', 'Исмаилов', 'Турсунов'];
        const patronymics = ['Абдуллаевич', 'Бахтиёрович', 'Камолович', 'Мирзоевич', 'Нодирович', 'Рустамович', 'Сарварович', 'Улугбекович'];
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomPatronymic = patronymics[Math.floor(Math.random() * patronymics.length)];

        // Populate vehicle info fields
        document.getElementById('osago_vehicle_model').value = randomModel;
        document.getElementById('osago_vehicle_type_display').value = vehicleTypeMap[selectedVehicleType] || 'Легковые автомобили';
        document.getElementById('osago_vehicle_region').value = regionName;
        document.getElementById('osago_vehicle_year').value = randomYear.toString();

        // Store owner data for step 2
        window.osago_owner_data = {
            pinfl: randomPinfl,
            fullName: `${randomLastName} ${randomFirstName} ${randomPatronymic}`
        };

        // Show vehicle info section
        const vehicleInfoSection = document.getElementById('vehicle_info_section');
        if (vehicleInfoSection) {
            vehicleInfoSection.style.display = 'block';
            vehicleInfoSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }


        showCustomAlert('Данные транспортного средства успешно загружены!', 'success');

        // Update progress indicator after vehicle data is loaded
        updateResultsProgress();
    }, 1200);
}

/**
 * Navigate to next OSAGO inner step
 */
function nextOsagoStep() {
    // Validate current step
    if (!validateOsagoStep(currentOsagoStep)) {
        return;
    }

    if (currentOsagoStep < totalOsagoInnerSteps) {
        // Mark current step as completed
        const currentStepEl = document.querySelector(`.inner-step[data-step="${currentOsagoStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
            currentStepEl.classList.add('completed');
        }

        // Hide current step content
        const currentContent = document.getElementById(`osago_step_${currentOsagoStep}`);
        if (currentContent) {
            currentContent.style.display = 'none';
        }

        currentOsagoStep++;

        // Show next step content
        const nextContent = document.getElementById(`osago_step_${currentOsagoStep}`);
        if (nextContent) {
            nextContent.style.display = 'block';

            // If moving to owner step, populate owner data
            if (currentOsagoStep === 2 && window.osago_owner_data) {
                document.getElementById('osago_owner_pinfl').value = window.osago_owner_data.pinfl;
                document.getElementById('osago_owner_name').value = window.osago_owner_data.fullName;
            }
        }

        // Update inner stepper
        updateInnerStepper();

        // Show back button
        const backBtn = document.getElementById('osago_btn_back');
        if (backBtn) {
            backBtn.style.display = 'inline-flex';
        }
    } else {
        // Last inner step - proceed to next main stage
        showCustomAlert('Все данные заполнены! Переход к заключению договора...', 'success');
        // Here you would transition to the next main stage (Заключение договора)
    }
}

/**
 * Navigate to previous OSAGO inner step
 */
function prevOsagoStep() {
    if (currentOsagoStep > 1) {
        // Hide current step content
        const currentContent = document.getElementById(`osago_step_${currentOsagoStep}`);
        if (currentContent) {
            currentContent.style.display = 'none';
        }

        // Mark current step as not active
        const currentStepEl = document.querySelector(`.inner-step[data-step="${currentOsagoStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active', 'completed');
        }

        currentOsagoStep--;

        // Show previous step content
        const prevContent = document.getElementById(`osago_step_${currentOsagoStep}`);
        if (prevContent) {
            prevContent.style.display = 'block';
        }

        // Update inner stepper
        updateInnerStepper();

        // Hide back button if on first step
        if (currentOsagoStep === 1) {
            const backBtn = document.getElementById('osago_btn_back');
            if (backBtn) {
                backBtn.style.display = 'none';
            }
        }
    }
}

/**
 * Update inner stepper visual state
 */
function updateInnerStepper() {
    for (let i = 1; i <= totalOsagoInnerSteps; i++) {
        const stepEl = document.querySelector(`.inner-step[data-step="${i}"]`);
        if (stepEl) {
            stepEl.classList.remove('active', 'completed');

            if (i < currentOsagoStep) {
                stepEl.classList.add('completed');
            } else if (i === currentOsagoStep) {
                stepEl.classList.add('active');
            }
        }
    }
}

/**
 * Validate current OSAGO step
 */
function validateOsagoStep(step) {
    switch (step) {
        case 1:
            // Validate transport data
            const vehicleInfoSection = document.getElementById('vehicle_info_section');
            if (!vehicleInfoSection || vehicleInfoSection.style.display === 'none') {
                showCustomAlert('Сначала загрузите данные транспортного средства', 'warning');
                return false;
            }
            return true;

        case 2:
            // Validate owner data
            const passportSeries = document.getElementById('osago_owner_passport_series')?.value.trim();
            const passportNumber = document.getElementById('osago_owner_passport_number')?.value.trim();
            const dob = document.getElementById('osago_owner_dob')?.value;

            if (!passportSeries || passportSeries.length !== 2) {
                showCustomAlert('Введите серию паспорта (2 буквы)', 'warning');
                return false;
            }
            if (!passportNumber || passportNumber.length !== 7) {
                showCustomAlert('Введите номер паспорта (7 цифр)', 'warning');
                return false;
            }
            if (!dob) {
                showCustomAlert('Выберите дату рождения', 'warning');
                return false;
            }
            return true;

        case 3:
            // Validate applicant data
            const isOwner = document.getElementById('osago_applicant_is_owner')?.checked;
            if (!isOwner) {
                const phone = document.getElementById('osago_applicant_phone')?.value.trim();
                if (!phone || phone.length < 9) {
                    showCustomAlert('Введите номер телефона заявителя', 'warning');
                    return false;
                }
            }
            return true;

        default:
            return true;
    }
}

/**
 * Toggle applicant fields visibility
 */
function toggleOsagoApplicantFields() {
    const isOwner = document.getElementById('osago_applicant_is_owner')?.checked;
    const fieldsContainer = document.getElementById('osago_applicant_fields');

    if (fieldsContainer) {
        fieldsContainer.style.display = isOwner ? 'none' : 'block';
    }
}

// Initialize OSAGO wizard when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initOsagoWizard();
});

// ========================================
// Dynamic Progress Indicator - Results Panel
// ========================================

let formProgress = 0;

/**
 * Calculate form completion progress based on filled required fields
 * NEW Progress rules - distributed across ALL steps:
 * - License plate: +10%
 * - Tech passport series: +10%
 * - Tech passport number: +10%
 * - Vehicle data loaded: +15%
 * - Calculation parameters (vehicle type, region, drivers, period, start date): +25%
 * - Owner passport series: +10%
 * - Owner passport number: +10%
 * - Owner date of birth: +10%
 * Total: 100%
 */
function calculateFormProgress() {
    let progress = 0;

    // Step 1: Basic vehicle identification
    // 1. License plate entered → +10%
    const licensePlate = document.getElementById('osago_gov_number')?.value.trim();
    if (licensePlate && licensePlate.length >= 8) {
        progress += 10;
    }

    // 2. Technical passport series entered → +10%
    const techSeries = document.getElementById('osago_tech_series')?.value.trim();
    if (techSeries && techSeries.length === 3) {
        progress += 10;
    }

    // 3. Technical passport number entered → +10%
    const techNumber = document.getElementById('osago_tech_number')?.value.trim();
    if (techNumber && techNumber.length === 7) {
        progress += 10;
    }

    // 4. Vehicle data successfully loaded → +15%
    // Check if vehicle info section is visible (indicates successful data load)
    const vehicleInfoSection = document.getElementById('vehicle_info_section');
    const isVehicleDataLoaded = vehicleInfoSection && vehicleInfoSection.style.display !== 'none';
    if (isVehicleDataLoaded) {
        progress += 15;
    }

    // 5. Calculation parameters completed → +25%
    // All calculation parameters (vehicle type, region, driver count, period, start date)
    const vehicleType = document.getElementById('calc_vehicle_type')?.value;
    const region = document.getElementById('calc_region')?.value;
    const driverCount = document.getElementById('calc_driver_count')?.value;
    const period = document.getElementById('calc_period')?.value;
    const startDate = document.getElementById('calc_start_date')?.value;

    // All calculation parameter fields must be filled
    if (vehicleType && region && driverCount && period && startDate) {
        progress += 25;
    }

    // Step 2: Owner personal data (passport and DOB)
    // 6. Owner passport series → +10%
    const passportSeries = document.getElementById('osago_owner_passport_series')?.value.trim();
    if (passportSeries && passportSeries.length === 2) {
        progress += 10;
    }

    // 7. Owner passport number → +10%
    const passportNumber = document.getElementById('osago_owner_passport_number')?.value.trim();
    if (passportNumber && passportNumber.length === 7) {
        progress += 10;
    }

    // 8. Owner date of birth → +10%
    const dob = document.getElementById('osago_owner_dob')?.value;
    if (dob) {
        progress += 10;
    }

    return Math.min(progress, 100); // Cap at 100%
}

/**
 * Update the progress indicator in the results panel
 */
function updateResultsProgress() {
    const newProgress = calculateFormProgress();

    // Only update if progress has changed (avoid unnecessary DOM updates)
    if (newProgress !== formProgress) {
        formProgress = newProgress;

        const progressFill = document.getElementById('results_progress_fill');
        const progressText = document.getElementById('results_progress_text');

        if (progressFill) {
            progressFill.style.width = `${formProgress}%`;
        }

        if (progressText) {
            progressText.textContent = `${formProgress}%`;
        }
    }
}

/**
 * Attach progress tracking to all relevant form fields
 */
function initializeFormProgressTracking() {
    // Get all input fields that affect progress
    const trackedFields = [
        'osago_gov_number',
        'osago_tech_series',
        'osago_tech_number',
        'calc_vehicle_type',
        'calc_region',
        'calc_period',
        'calc_driver_count',
        'calc_start_date',
        'osago_owner_passport_series',
        'osago_owner_passport_number',
        'osago_owner_dob'
    ];

    // Add event listeners for real-time updates
    trackedFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Listen to both input and change events for comprehensive coverage
            field.addEventListener('input', updateResultsProgress);
            field.addEventListener('change', updateResultsProgress);
        }
    });

    // Initial progress calculation on page load
    updateResultsProgress();
}

// Initialize progress tracking when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeFormProgressTracking();

    // Add event listeners for pricing calculation updates
    const calcVehicleType = document.getElementById('calc_vehicle_type');
    const calcRegion = document.getElementById('calc_region');
    const calcDriverCount = document.getElementById('calc_driver_count');
    const calcPeriod = document.getElementById('calc_period');

    [calcVehicleType, calcRegion, calcDriverCount, calcPeriod].forEach(element => {
        if (element) {
            element.addEventListener('change', updatePricingDisplay);
        }
    });

    // Initial pricing calculation
    updatePricingDisplay();
});

// Also initialize if DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    // Already set up above
} else {
    // DOM is already ready
    initializeFormProgressTracking();
}
// ============================================\r
// ============================================
// Toggle Relatives Document Item
// ============================================

/**
 * Toggles the "Relatives' passport" document item visibility
 * based on driver count selection (limited vs unlimited)
 */
function toggleRelativesDocItem() {
    const driverCountSelect = document.getElementById('calc_driver_count');
    const relativesDocItem = document.getElementById('relatives_doc_item');

    if (driverCountSelect && relativesDocItem) {
        const driverCount = driverCountSelect.value;

        // Show relatives doc only if "limited" is selected
        if (driverCount === 'limited') {
            relativesDocItem.style.display = 'list-item';
        } else {
            relativesDocItem.style.display = 'none';
        }
    }
}

// ============================================
// Hero Quick Quote Function
// ============================================

/**
 * Starts the OSAGO wizard from the hero section
 * Transfers the license plate number from hero input to wizard
 */
function startQuickQuote() {
    // Get the license plate entered in hero section
    const heroCarNumber = document.getElementById('hero_car_number');
    const wizardCarNumber = document.getElementById('osago_car_number');

    // Transfer value if it exists
    if (heroCarNumber && wizardCarNumber && heroCarNumber.value.trim()) {
        wizardCarNumber.value = heroCarNumber.value.trim();
    }

    // Hide main landing page
    const mainLanding = document.getElementById('main-landing');
    const wizardContainer = document.getElementById('wizard-container');

    if (mainLanding) {
        mainLanding.style.display = 'none';
    }

    if (wizardContainer) {
        wizardContainer.style.display = 'block';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Sidebar Block Toggle Functions  
// ============================================

/**
 * Toggles collapsible sidebar blocks
 */
function toggleSidebarBlock(blockId) {
    const block = document.getElementById(blockId);
    const parentBlock = block ? block.closest('.collapsible-block') : null;

    if (parentBlock) {
        parentBlock.classList.toggle('collapsed');
    }
}

/**
 * Toggles coverage information visibility
 */
function toggleCoverageInfo() {
    const coverageInfo = document.getElementById('coverage-info');

    if (coverageInfo) {
        if (coverageInfo.style.display === 'none') {
            coverageInfo.style.display = 'block';
        } else {
            coverageInfo.style.display = 'none';
        }
    }
}

/**
 * Toggles coverage information in new clean sidebar card
 */
function toggleCoverage() {
    const content = document.getElementById('coverage-content');
    const header = document.querySelector('.coverage-header');

    if (content && header) {
        content.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
    }
}


/**
 * Updates the step progress bar based on current step
 * @param {number} currentStep - The current step number (1, 2, or 3)
 */
function updateStepProgress(currentStep) {
    const stepItems = document.querySelectorAll('.step-item');
    const stepLines = document.querySelectorAll('.step-line');

    stepItems.forEach((item, index) => {
        const stepNumber = index + 1;

        // Remove all states
        item.classList.remove('active', 'completed');

        // Add appropriate state
        if (stepNumber < currentStep) {
            item.classList.add('completed');
        } else if (stepNumber === currentStep) {
            item.classList.add('active');
        }
    });

    // Update progress lines
    stepLines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Fill line if the step before it is completed
        if (lineNumber < currentStep) {
            line.classList.add('filled');
        } else {
            line.classList.remove('filled');
        }
    });
}

// Call on page load to set initial state
document.addEventListener('DOMContentLoaded', function () {
    updateStepProgress(1); // Start at step 1
});

// ============================================
// Currency Exchange Integration
// ============================================

const EXCHANGE_API_KEY = '06e784f25e2ce7fa8ba68f96';
const EXCHANGE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/UZS`;

// Store exchange rates
let exchangeRates = {
    USD: null,
    EUR: null,
    RUB: null,
    lastUpdated: null
};

/**
 * Fetches latest exchange rates from API
 */
async function fetchExchangeRates() {
    try {
        const response = await fetch(EXCHANGE_API_URL);
        const data = await response.json();

        if (data.result === 'success') {
            exchangeRates.USD = data.conversion_rates.USD;
            exchangeRates.EUR = data.conversion_rates.EUR;
            exchangeRates.RUB = data.conversion_rates.RUB;
            exchangeRates.lastUpdated = new Date();

            console.log('Exchange rates updated:', exchangeRates);
            return true;
        }
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        return false;
    }
}

/**
 * Converts UZS amount to target currency
 * @param {number} amountUZS - Amount in Uzbekistan Sum
 * @param {string} targetCurrency - Target currency code (USD, EUR, RUB)
 * @returns {number} Converted amount
 */
function convertCurrency(amountUZS, targetCurrency) {
    if (!exchangeRates[targetCurrency]) {
        return null;
    }

    const converted = amountUZS * exchangeRates[targetCurrency];
    return Math.round(converted * 100) / 100; // Round to 2 decimals
}

/**
 * Formats currency amount with proper separators
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency) {
    const symbols = {
        UZS: 'СЃСѓРј',
        USD: '$',
        EUR: 'в‚¬',
        RUB: 'в‚Ѕ'
    };

    if (currency === 'UZS') {
        // Format UZS with space separator (e.g., 384.000)
        return amount.toLocaleString('ru-RU').replace(/,/g, '.') + ' ' + symbols[currency];
    } else {
        // Format other currencies with standard formatting
        return symbols[currency] + amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

/**
 * Updates price display with currency conversion
 */
function updatePriceWithCurrency() {
    const priceElement = document.getElementById('policy_price');
    if (!priceElement) return;

    // Get current price in UZS (remove formatting)
    const priceText = priceElement.textContent;
    const priceUZS = parseInt(priceText.replace(/[^\d]/g, ''));

    if (!priceUZS) return;

    // Format UZS price
    const uzsFormatted = formatCurrency(priceUZS, 'UZS');

    // Build price HTML
    let priceHTML = `<span class="price-main">${uzsFormatted}</span>`;

    // Add converted prices if rates are available
    if (exchangeRates.USD) {
        const usdAmount = convertCurrency(priceUZS, 'USD');
        const eurAmount = convertCurrency(priceUZS, 'EUR');

        priceHTML += `
            <span class="price-converted">
                ${formatCurrency(usdAmount, 'USD')} / ${formatCurrency(eurAmount, 'EUR')}
            </span>
        `;
    }

    priceElement.innerHTML = priceHTML;
}

/**
 * Initialize currency exchange on page load
 */
async function initCurrencyExchange() {
    const success = await fetchExchangeRates();

    if (success) {
        updatePriceWithCurrency();

        // Refresh rates every 1 hour
        setInterval(fetchExchangeRates, 3600000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initCurrencyExchange();
});

// ============================================
// Currency Selector in Header
// ============================================

let selectedCurrency = 'UZS'; // Global currency selection

/**
 * Toggles the currency dropdown menu
 */
function toggleCurrencyDropdown() {
    const dropdown = document.getElementById('currency-dropdown');
    const btn = document.getElementById('currency-btn');

    if (dropdown && btn) {
        dropdown.classList.toggle('active');
        btn.classList.toggle('active');
    }
}

/**
 * Selects a currency and updates the display
 * @param {string} currency - Currency code (UZS, USD, EUR)
 */
function selectCurrency(currency) {
    selectedCurrency = currency;

    // Update button text
    const selectedCurrencyEl = document.getElementById('selected-currency');
    if (selectedCurrencyEl) {
        selectedCurrencyEl.textContent = currency;
    }

    // Update active state in dropdown
    const options = document.querySelectorAll('.currency-option');
    options.forEach(option => {
        if (option.dataset.currency === currency) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Close dropdown
    toggleCurrencyDropdown();

    // Update all prices on the page
    updateAllPricesWithCurrency(currency);

    console.log('Currency changed to:', currency);
}

/**
 * Updates all prices on the page based on selected currency
 * @param {string} currency - Target currency code
 */
function updateAllPricesWithCurrency(currency) {
    const priceElement = document.getElementById('policy_price');
    if (!priceElement) return;

    // Get base price in UZS
    const basePriceUZS = 384000; // You can make this dynamic

    if (currency === 'UZS') {
        priceElement.innerHTML = `<span class="price-main">${formatCurrency(basePriceUZS, 'UZS')}</span>`;
    } else if (exchangeRates[currency]) {
        const converted = convertCurrency(basePriceUZS, currency);
        priceElement.innerHTML = `
            <span class="price-main">${formatCurrency(converted, currency)}</span>
            <span class="price-converted">${formatCurrency(basePriceUZS, 'UZS')}</span>
        `;
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const currencySelector = document.querySelector('.currency-selector');
    const dropdown = document.getElementById('currency-dropdown');

    if (currencySelector && dropdown && !currencySelector.contains(event.target)) {
        dropdown.classList.remove('active');
        document.getElementById('currency-btn')?.classList.remove('active');
    }
});
