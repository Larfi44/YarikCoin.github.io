import price from '../data/price.mjs';

const STORAGE_KEYS = {
    balance: 'yarikcoin_balance',
    coinBalance: 'yarikcoin_onBalance',
    volume: 'yarikcoin_volume',
    language: 'yarikcoin_lang',
    tx: 'yarikcoin_tx',
    orders: 'yarikcoin_orders',
    lastHour: 'yarikcoin_last_hour',
    minerLevel: 'yarikcoin_miner_level',
    minerTotal: 'yarikcoin_miner_total',
    minerLastSeen: 'yarikcoin_miner_lastseen',
    minerFrac: 'yarikcoin_miner_frac',
    chartHours: 'yarikcoin_chart_hours',
    chartGranularity: 'yarikcoin_chart_granularity',
    chartType: 'yarikcoin_chart_type',
    chartTheme: 'yarikcoin_chart_theme',
    showMarkers: 'yarikcoin_show_markers',
    showTrades: 'yarikcoin_show_trades',
    activeTab: 'yarikcoin_active_tab',
    currentJob: 'yarikcoin_current_job',
    jobAccum: 'yarikcoin_job_accum',
    jobLastSeen: 'yarikcoin_job_lastseen',
    usedPromos: 'yarikcoin_used_promos'
};

const DOM = {
    price: document.getElementById('price'),
    priceLabel: document.getElementById('priceLabel'),
    balance: document.getElementById('balance'),
    onBalance: document.getElementById('onBalance'),
    maxPrice: document.getElementById('maxPrice'),
    minPrice: document.getElementById('minPrice'),
    priceChartCanvas: document.getElementById('priceChart'),
    timeSelector: document.getElementById('timeSelector'),
    buyBtn: document.getElementById('buyBtn'),
    sellBtn: document.getElementById('sellBtn'),
    tradeModal: document.getElementById('tradeModal'),
    tradeTitle: document.getElementById('tradeTitle'),
    tradeLabel: document.getElementById('tradeLabel'),
    tradeAmount: document.getElementById('tradeAmount'),
    tradeInfo: document.getElementById('tradeInfo'),
    confirmTradeBtn: document.getElementById('confirmTradeBtn'),
    cancelTradeBtn: document.getElementById('cancelTradeBtn'),
    mainMusic: document.getElementById('mainMusic'),
    clickSound: document.getElementById('clickSound'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettings: document.getElementById('closeSettings'),
    volumeControl: document.getElementById('volumeControl'),
    languageSwitch: document.getElementById('languageSwitch'),
    granularity: document.getElementById('granularity'),
    prevRangeBtn: document.getElementById('prevRangeBtn'),
    nextRangeBtn: document.getElementById('nextRangeBtn'),
    prevPeriodBtn: document.getElementById('prevPeriodBtn'),
    nextPeriodBtn: document.getElementById('nextPeriodBtn'),
    txList: document.getElementById('txList'),
    ordersList: document.getElementById('ordersList'),
    placeOrder: document.getElementById('placeOrder'),
    orderAmount: document.getElementById('orderAmount'),
    orderPrice: document.getElementById('orderPrice'),
    orderTotalPreview: document.getElementById('orderTotalPreview'),
    cancelAllOrders: document.getElementById('cancelAllOrders'),
    minerLevel: document.getElementById('minerLevel'),
    minerTotalMined: document.getElementById('minerTotalMined'),
    minerAvgTime: document.getElementById('minerAvgTime'),
    minerUpgrade: document.getElementById('minerUpgrade'),
    minerClaim: document.getElementById('minerClaim'),
    orderTypeSelector: document.getElementById('orderTypeSelector'),
    notificationArea: document.getElementById('notification-area'),
    clearTxBtn: document.getElementById('clearTxBtn'),
    chartTypeSelector: document.getElementById('chartTypeSelector'),
    chartThemeSelector: document.getElementById('chartThemeSelector'),
    chartOptionsSelector: document.getElementById('chartOptionsSelector'),
    periodChange: document.getElementById('periodChange'),
    minerContent: document.getElementById('minerContent'),
    workContent: document.getElementById('workContent'),
    tabMiner: document.getElementById('tabMiner'),
    tabWork: document.getElementById('tabWork'),
    hireNextJob: document.getElementById('hireNextJob'),
    currentJob: document.getElementById('currentJob'),
    nextJob: document.getElementById('nextJob'),
    accSalary: document.getElementById('accSalary'),
    jobEarnings: document.getElementById('jobEarnings'),
    workHint: document.getElementById('workHint'),
    claimJob: document.getElementById('claimJob'),
    yarikNote: document.getElementById('yarik-note'),
    shopTitle: document.getElementById('shop-title'),
    orderDesc: document.getElementById('orderDesc'),
    supportBtn: document.getElementById('supportBtn'),
    minerChanceVal: document.getElementById('minerChanceVal'),
    minerTotalUsd: document.getElementById('minerTotalUsd'),
    toggleCustomBtn: document.getElementById('toggleCustomBtn'),
    customPanel: document.getElementById('customPanel'),
    promocodeInput: document.getElementById('promocodeInput'),
    promocodeApply: document.getElementById('promocodeApply')
};

const LOCALES = {
    en: {
        'brand.title': 'YarikCoin', 'brand.subtitle': 'Version 2.1',
        'title.main': 'YarikCoin',
        'price.label': 'Price:',
        'yarik_note': 'Price changes every hour',
        'shop.label': 'Shop:',
        'button.buy': 'Buy','button.sell':'Sell','button.close':'Close','button.cancel':'Cancel','button.place':'Place',
        'button.clear':'Clear','button.confirm':'Confirm','button.upgrade':'Upgrade','button.claim':'Claim',
        'period.1d':'1 day','period.1w':'1 week','period.1m':'1 month','period.1y':'1 year','period.all':'All time',
        'chart.period':'Period','chart.granularity':'Granularity','chart.type':'Type','chart.theme':'Theme','chart.options':'Options',
        'type.filled':'Filled','type.filled_solid':'Fully filled','type.line':'Line','type.bar':'Bar',
        'options.markers':'Max & Min Price','options.trades':'My Trades',
        'theme.green':'Green','theme.blue':'Blue','theme.red':'Red','theme.purple':'Purple','theme.black':'Black',
        'gr.auto':'Auto','gr.hour':'Hour','gr.day':'Day','gr.month':'Month',
        'transactions.title':'Transactions','transactions.hint':'Your buy/sell history',
        'orders.title':'Orders','orders.desc':'Your active orders (limit buys and sells).',
        'orders.type':'Type','orders.amount':'Amount','orders.price':'Price (per coin)',
        'button.cancelAll':'Cancel all','button.open_custom':'Open Customisation','button.close_custom':'Close Customisation',
        'promocode.title':'Promocodes','promocode.hint':'Send promocode (English only)','promocode.submit':'Apply',
        'promocode.success':'Promocode accepted — granted {coins} YarikCoin (≈ $25).','promocode.already':'Promocode already used.','promocode.invalid':'Invalid promocode.','promocode.lang_only':'Promocodes must be submitted in English.',
        'miner.title':'Miner','miner.hint':'Upgrade miner to start earning','miner.level_label':'Level:','miner.chance_label':'Chance to find per second:','miner.total_label':'Total mined:','miner.avg_label':'Average time per coin:',
        'tab.miner':'Miner','tab.work':'Job','work.title':'Work','work.current_label':'Current job:','work.next_label':'Next job:','work.accum_label':'Accumulated salary:','work.earn_label':'Earn per day:','work.hire':'Get next job','work.claim':'Claim salary',
        'balance.label':'Balance:','onbalance.label':'YarikCoin on balance:','settings.title':'Settings','settings.volume':'Volume','settings.language':'Language',
        'button.support':'Tech support','transactions.no':'No transactions','noOrders':'No orders',
        'order.total_preview': 'Total: {total}'
    },
    ru: {
        'brand.title': 'YarikCoin','brand.subtitle': 'Версия 2.1',
        'title.main': 'YarikCoin',
        'price.label': 'Цена:',
        'yarik_note': 'Цена изменяется каждый час',
        'shop.label': 'Магазин:',
        'button.buy': 'Купить','button.sell':'Продать','button.close':'Закрыть','button.cancel':'Отмена','button.place':'Разместить',
        'button.clear':'Очистить','button.confirm':'Подтвердить','button.upgrade':'Улучшить','button.claim':'Забрать',
        'period.1d':'1 день','period.1w':'1 неделя','period.1m':'1 месяц','period.1y':'1 год','period.all':'Все время',
        'chart.period':'Период','chart.granularity':'Детализация','chart.type':'Тип','chart.theme':'Тема','chart.options':'Опции',
        'type.filled':'Закрашенный','type.filled_solid':'Полностью закрашенный','type.line':'Линия','type.bar':'Бар',
        'options.markers':'Макс. и Мин. цена','options.trades':'Мои сделки',
        'theme.green':'Зеленая','theme.blue':'Синяя','theme.red':'Красная','theme.purple':'Фиолетовая','theme.black':'Чёрная',
        'gr.auto':'Авто','gr.hour':'Час','gr.day':'День','gr.month':'Месяц',
        'transactions.title':'Транзакции','transactions.hint':'История ваших покупок/продаж',
        'orders.title':'Ордеры','orders.desc':'Здесь показаны ваши размещённые ордера (лимитные покупки и продажи).',
        'orders.type':'Тип','orders.amount':'Количество','orders.price':'Цена за монету',
        'button.cancelAll':'Отменить все','button.open_custom':'Открыть настройки','button.close_custom':'Закрыть настройки',
        'promocode.title':'Промокоды','promocode.hint':'Вводите промокоды (только на английском языке)','promocode.submit':'Применить',
        'promocode.success':'Промокод принят — начислено {coins} YarikCoin (≈ $25).','promocode.already':'Промокод уже использован.','promocode.invalid':'Неверный промокод.','promocode.lang_only':'Промокоды нужно отправлять только на английском.',
        'miner.title':'Майнер','miner.hint':'Улучшите майнер, чтобы начать добычу','miner.level_label':'Уровень:','miner.chance_label':'Шанс добыть каждую секунду:','miner.total_label':'Всего добыто:','miner.avg_label':'Среднее время на монету:',
        'tab.miner':'Майнер','tab.work':'Работа','work.title':'Работа','work.current_label':'Текущая работа:','work.next_label':'Следующая работа:','work.accum_label':'Накопленная зарплата:','work.earn_label':'Зарплата в день:','work.hire':'Получить следующую работу','work.claim':'Забрать зарплату',
        'balance.label':'Баланс:','onbalance.label':'YarikCoin на балансе:','settings.title':'Настройки','settings.volume':'Громкость','settings.language':'Язык',
        'button.support':'Техподдержка','transactions.no':'Транзакций нет','noOrders':'Ордеров нет',
        'order.total_preview': 'Всего: {total}'
    }
};

const chartThemes = {
    green: { main: '#2e7d32', gradient: ['rgba(46,125,50,0.14)', 'rgba(46,125,50,0.02)'] },
    blue: { main: '#1976d2', gradient: ['rgba(25,118,210,0.14)', 'rgba(25,118,210,0.02)'] },
    red: { main: '#c62828', gradient: ['rgba(198,40,40,0.14)', 'rgba(198,40,40,0.02)'] },
    purple: { main: '#6a1b9a', gradient: ['rgba(106,27,154,0.14)', 'rgba(106,27,154,0.02)'] },
    black: { main: '#111111', gradient: ['rgba(17,17,17,0.22)', 'rgba(17,17,17,0.04)'] }
};

const state = {
    currentLang: localStorage.getItem(STORAGE_KEYS.language) || 'ru',
    balance: parseFloat(localStorage.getItem(STORAGE_KEYS.balance) || '100'),
    coinBalance: parseFloat(localStorage.getItem(STORAGE_KEYS.coinBalance) || '0'),
    volume: parseFloat(localStorage.getItem(STORAGE_KEYS.volume) || '0.2'),
    chart: null,
    chartType: localStorage.getItem(STORAGE_KEYS.chartType) || 'filled',
    chartTheme: localStorage.getItem(STORAGE_KEYS.chartTheme) || 'green',
    showMarkers: localStorage.getItem(STORAGE_KEYS.showMarkers) !== 'false',
    showTrades: localStorage.getItem(STORAGE_KEYS.showTrades) === 'true',
    viewHours: parseInt(localStorage.getItem(STORAGE_KEYS.chartHours)) || 24,
    granularity: localStorage.getItem(STORAGE_KEYS.chartGranularity) || 'hour',
    tx: JSON.parse(localStorage.getItem(STORAGE_KEYS.tx) || '[]'),
    orders: JSON.parse(localStorage.getItem(STORAGE_KEYS.orders) || '[]'),
    miner: {
        level: parseInt(localStorage.getItem(STORAGE_KEYS.minerLevel) || '0'),
        totalMined: parseFloat(localStorage.getItem(STORAGE_KEYS.minerTotal) || '0'),
        lastSeen: parseInt(localStorage.getItem(STORAGE_KEYS.minerLastSeen) || Date.now()),
        fracCarry: parseFloat(localStorage.getItem(STORAGE_KEYS.minerFrac) || '0')
    },
    currentOrderType: 'buy',
    currentJob: parseInt(localStorage.getItem(STORAGE_KEYS.currentJob) || '0'),
    jobAccum: parseFloat(localStorage.getItem(STORAGE_KEYS.jobAccum) || '0') || 0,
    activeTab: localStorage.getItem(STORAGE_KEYS.activeTab) || 'miner',
    usedPromos: JSON.parse(localStorage.getItem(STORAGE_KEYS.usedPromos) || '[]'),
    currentPrice: 0
};

const jobs = [
    { id: 0, name: { en: 'No job', ru: 'Нет работы' }, cost: 0, daily: 0 },
    { id: 1, name: { en: 'Cleaner', ru: 'Уборщик' }, cost: 20, daily: 0.5 },
    { id: 2, name: { en: 'Cashier', ru: 'Кассир' }, cost: 100, daily: 2.5 },
    { id: 3, name: { en: 'Teacher', ru: 'Учитель' }, cost: 500, daily: 12.5 },
    { id: 4, name: { en: 'Engineer', ru: 'Инженер' }, cost: 2500, daily: 60 },
    { id: 5, name: { en: 'Programmer', ru: 'Программист' }, cost: 12500, daily: 300 },
    { id: 6, name: { en: 'Linux Engineer', ru: 'Инженер Linux' }, cost: 60000, daily: 1500 },
    { id: 7, name: { en: 'Cosmonaut', ru: 'Космонавт' }, cost: 300000, daily: 7500 },
    { id: 8, name: { en: 'Businessman', ru: 'Бизнесмен' }, cost: 1500000, daily: 37500 },
    { id: 9, name: { en: 'Governor', ru: 'Губернатор' }, cost: 7500000, daily: 200000 },
    { id: 10, name: { en: 'President', ru: 'Президент' }, cost: 40000000, daily: 1000000 },
    { id: 11, name: { en: 'King', ru: 'Король' }, cost: 200000000, daily: 1000000 },
    { id: 12, name: { en: 'Emperor', ru: 'Император' }, cost: 1000000000, daily: 5000000 },
    { id: 13, name: { en: 'World Ruler', ru: 'Повелитель мира' }, cost: 10000000000, daily: 50000000 }
];

function localeCode(lang) {
    if (lang === 'ru') return 'ru-RU';
    return 'en-US';
}

function trim5(v) {
    const n = Number(v || 0);
    const s = n.toFixed(5);
    return s.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
}
function formatCurrency(v) { return trim5(v) + '$'; }
function currentHourIndex() { const H = 484788; return Math.floor(Date.now() / 3600000 - H); }
function showNotification(msg) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.innerText = msg;
    DOM.notificationArea.appendChild(n);
    setTimeout(() => { n.style.animation = 'fadeOut 0.5s forwards'; setTimeout(() => n.remove(), 500); }, 4000);
}
function updateBalanceUI() {
    DOM.balance.innerText = formatCurrency(state.balance);
    DOM.onBalance.innerText = trim5(state.coinBalance);
    if (DOM.buyBtn) DOM.buyBtn.disabled = !(state.balance > 0);
    if (DOM.sellBtn) DOM.sellBtn.disabled = !(state.coinBalance > 0);
}

/* Transactions rendering: exclude mine/job but include promo */
function renderTxs() {
    DOM.txList.innerHTML = '';
    const filtered = state.tx.filter(t => (t.type === 'buy' || t.type === 'sell' || t.type === 'promo'));
    if (filtered.length === 0) {
        const txt = LOCALES[state.currentLang]['transactions.no'] || LOCALES[state.currentLang].noOrders || 'No transactions';
        DOM.txList.innerHTML = `<div class="small-muted">${txt}</div>`;
        return;
    }
    filtered.forEach(t => {
        const div = document.createElement('div'); div.className = 'tx-item';
        const when = new Date(t.time).toLocaleString(localeCode(state.currentLang), { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        if (t.type === 'buy') {
            const action = (state.currentLang === 'ru' ? 'ПОКУПКА' : LOCALES[state.currentLang]['button.buy'].toUpperCase());
            div.innerHTML = `<div><span class="type-buy">${action}</span> ${trim5(t.amount)} YarikCoin — ${formatCurrency(t.total)}</div><div class="small-muted">(${when})</div>`;
        } else if (t.type === 'sell') {
            const action = (state.currentLang === 'ru' ? 'ПРОДАЖА' : LOCALES[state.currentLang]['button.sell'].toUpperCase());
            div.innerHTML = `<div><span class="type-sell">${action}</span> ${trim5(t.amount)} YarikCoin — ${formatCurrency(t.total)}</div><div class="small-muted">(${when})</div>`;
        } else if (t.type === 'promo') {
            const action = (state.currentLang === 'ru' ? 'Промокод' : 'Promocode');
            div.innerHTML = `<div><span class="type-buy">${action}</span> ${trim5(t.amount)} YarikCoin — ${formatCurrency(t.total)}</div><div class="small-muted">(${when})</div>`;
        }
        DOM.txList.appendChild(div);
    });
}

function saveOrders() { localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(state.orders)); renderOrders(); }
function renderOrders() {
    DOM.ordersList.innerHTML = '';
    if (state.orders.length === 0) { DOM.ordersList.innerHTML = `<div class="small-muted">${LOCALES[state.currentLang].noOrders}</div>`; return; }
    state.orders.forEach(o => {
        const d = document.createElement('div'); d.className = 'order-item';
        const when = new Date(o.time).toLocaleString(localeCode(state.currentLang), { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        const badge = o.type === 'buy' ? (state.currentLang === 'ru' ? 'ПОКУПКА' : LOCALES[state.currentLang]['button.buy'].toUpperCase()) : (state.currentLang === 'ru' ? 'ПРОДАЖА' : LOCALES[state.currentLang]['button.sell'].toUpperCase());
        d.innerHTML = `<div><span class="order-badge">${badge}</span> ${trim5(o.amount)} YarikCoin — ${formatCurrency(o.price)} — (${when})</div><button class="cancel-order-btn" data-order-id="${o.id}">×</button>`;
        DOM.ordersList.appendChild(d);
    });
}

function processOfflineOrders() {
    const lastSeenHour = parseInt(localStorage.getItem(STORAGE_KEYS.lastHour) || currentHourIndex());
    const now = currentHourIndex();
    const notifications = [];
    if (now <= lastSeenHour) { localStorage.setItem(STORAGE_KEYS.lastHour, String(now)); return; }
    for (let hour = lastSeenHour; hour < now; hour++) {
        if (hour < 0 || hour >= price.length) continue;
        const histPrice = price[hour];
        if (typeof histPrice === 'undefined' || histPrice === null) continue;
        const remaining = []; let changed = false;
        state.orders.forEach(order => {
            if (order.type === 'buy') {
                if (histPrice <= order.price) {
                    const cost = order.amount * order.price;
                    if (state.balance >= cost) { state.balance -= cost; state.coinBalance += order.amount; state.tx.unshift({ id: 'tx_buy_' + Date.now(), type: 'buy', amount: order.amount, pricePer: order.price, total: order.amount*order.price, time: Date.now() }); changed = true; notifications.push(`${(state.currentLang === 'ru' ? 'Покупка' : 'Buy')} ${trim5(order.amount)} заполнен по ${formatCurrency(order.price)}`); }
                    else remaining.push(order);
                } else remaining.push(order);
            } else if (order.type === 'sell') {
                if (histPrice >= order.price) {
                    if (state.coinBalance >= order.amount) { state.coinBalance -= order.amount; state.balance += order.amount * order.price; state.tx.unshift({ id: 'tx_sell_' + Date.now(), type: 'sell', amount: order.amount, pricePer: order.price, total: order.amount*order.price, time: Date.now() }); changed = true; notifications.push(`${(state.currentLang === 'ru' ? 'Продажа' : 'Sell')} ${trim5(order.amount)} заполнен по ${formatCurrency(order.price)}`); }
                    else remaining.push(order);
                } else remaining.push(order);
            } else remaining.push(order);
        });
        if (changed) {
            state.orders = remaining; saveOrders();
            localStorage.setItem(STORAGE_KEYS.balance, state.balance); localStorage.setItem(STORAGE_KEYS.coinBalance, state.coinBalance); updateBalanceUI();
        }
    }
    localStorage.setItem(STORAGE_KEYS.lastHour, String(now)); notifications.forEach(n => showNotification(n));
}

/* ----- MINER: changes only to probability formula so higher price => harder ----- */
const BASE_PROB_AT_HALF_DOLLAR = 1 / 86400;
function minerNextLevelCost(level) { return 25 * Math.pow(4, Math.max(0, level)); }

/* *** Inverted price factor: higher price -> smaller probability (mining harder at higher price) *** */
function minerProbPerSecond(level, priceVal) {
    if (level <= 0) return 0;
    const levelMultiplier = Math.pow(4, level - 1);
    const priceFactor = 0.5 / (priceVal || 0.000001); // <<--- inverted vs original
    let p = BASE_PROB_AT_HALF_DOLLAR * priceFactor * levelMultiplier;
    if (p > 1) p = 1;
    return p;
}

function minerExpectedSecondsPerCoin(level, priceVal) {
    const p = minerProbPerSecond(level, priceVal);
    if (p <= 0) return Infinity;
    return 1 / p;
}

function initMinerUI() {
    DOM.minerLevel.textContent = String(state.miner.level || 0);
    const nextCost = minerNextLevelCost(state.miner.level);
    if (state.miner.level === 0) {
        DOM.minerUpgrade.innerText = (state.currentLang === 'ru' ? 'Купить майнер' : 'Buy miner') + ` (${nextCost}$)`;
        DOM.minerUpgrade.classList.remove('btn-sell'); DOM.minerUpgrade.classList.add('btn-buy');
    } else {
        DOM.minerUpgrade.innerText = (state.currentLang === 'ru' ? 'Улучшить' : 'Upgrade') + ` (${nextCost}$)`;
    }
    DOM.minerTotalMined.textContent = String(Math.floor(state.miner.totalMined || 0));
    DOM.minerTotalUsd.textContent = formatCurrency((Math.floor(state.miner.totalMined || 0)) * (state.currentPrice || 0));
    const avgSec = minerExpectedSecondsPerCoin(state.miner.level, state.currentPrice);
    if (isFinite(avgSec)) {
        if (avgSec > 3600 * 5) DOM.minerAvgTime.innerText = `${Math.round(avgSec)}s (${Math.round(avgSec / 60)} min, ${Math.round(avgSec / 3600)} h)`;
        else if (avgSec > 600) DOM.minerAvgTime.innerText = `${Math.round(avgSec)}s (${Math.round(avgSec / 60)} min)`;
        else DOM.minerAvgTime.innerText = `${Math.round(avgSec)}s`;
    } else DOM.minerAvgTime.innerText = '—';
    const chancePct = minerProbPerSecond(state.miner.level, state.currentPrice) * 100;
    DOM.minerChanceVal.innerText = (state.miner.level > 0 ? chancePct.toFixed(6) + '%' : '0%');
    if (state.miner.level === 0) {
        DOM.minerContent.querySelector('#minerHint').style.display = 'block';
        DOM.minerContent.querySelector('#minerHint').innerText = (state.currentLang === 'ru' ? LOCALES.ru['miner.hint'] : LOCALES.en['miner.hint']);
    } else DOM.minerContent.querySelector('#minerHint').style.display = 'none';
}

function handleOfflineMining() {
    const last = state.miner.lastSeen || Date.now();
    const now = Date.now();
    const secsAway = Math.floor((now - last) / 1000);
    if (secsAway <= 0) { state.miner.lastSeen = Date.now(); localStorage.setItem(STORAGE_KEYS.minerLastSeen, String(state.miner.lastSeen)); return; }
    const H = 484788;
    let expected = 0;
    let fromTs = last;
    const toTs = now;
    let curHourStart = Math.floor(fromTs / 3600000) * 3600000;
    while (curHourStart < toTs) {
        const nextHourStart = curHourStart + 3600000;
        const intervalStart = Math.max(fromTs, curHourStart);
        const intervalEnd = Math.min(toTs, nextHourStart);
        const secondsInInterval = Math.floor((intervalEnd - intervalStart) / 1000);
        const hourIndex = Math.floor(curHourStart / 3600000 - H);
        let priceHour = price[hourIndex];
        if (typeof priceHour === 'undefined' || priceHour === null) { priceHour = state.currentPrice || 0; }
        const p = minerProbPerSecond(state.miner.level, priceHour);
        expected += p * secondsInInterval;
        curHourStart = nextHourStart;
    }
    expected += (state.miner.fracCarry || 0);
    const successes = Math.floor(expected);
    const newCarry = expected - successes;
    if (successes > 0) {
        state.miner.totalMined = (state.miner.totalMined || 0) + successes;
        state.tx.unshift({ id: 'tx_mine_off_' + Date.now(), type: 'mine', amount: successes, pricePer: state.currentPrice || 0, total: successes * (state.currentPrice || 0), time: Date.now() });
        localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
    }
    state.miner.fracCarry = newCarry;
    state.miner.lastSeen = Date.now();
    localStorage.setItem(STORAGE_KEYS.minerLastSeen, String(state.miner.lastSeen));
    localStorage.setItem(STORAGE_KEYS.minerTotal, String(state.miner.totalMined));
    localStorage.setItem(STORAGE_KEYS.minerFrac, String(state.miner.fracCarry));
    initMinerUI();
}

function handleOfflineWork() {
    const last = parseInt(localStorage.getItem(STORAGE_KEYS.jobLastSeen) || Date.now());
    const now = Date.now();
    const secsAway = Math.floor((now - last) / 1000);
    if (secsAway <= 0) { localStorage.setItem(STORAGE_KEYS.jobLastSeen, String(now)); return; }
    const curJob = jobs.find(j => j.id === (state.currentJob || 0)) || jobs[0];
    if (curJob && curJob.id !== 0 && curJob.daily && curJob.daily > 0) {
        const perSec = curJob.daily / 86400;
        const add = perSec * secsAway;
        state.jobAccum = (state.jobAccum || 0) + add;
        localStorage.setItem(STORAGE_KEYS.jobAccum, String(state.jobAccum));
    }
    localStorage.setItem(STORAGE_KEYS.jobLastSeen, String(now));
    initMinerUI(); updateJobsUI();
}

let minerInterval = null;
function startMinerOnline() {
    if (minerInterval) clearInterval(minerInterval);
    minerInterval = setInterval(() => {
        const p = minerProbPerSecond(state.miner.level, state.currentPrice || 0);
        if (p > 0) {
            if (Math.random() < p) {
                state.miner.totalMined = (state.miner.totalMined || 0) + 1;
                localStorage.setItem(STORAGE_KEYS.minerTotal, String(state.miner.totalMined));
                state.tx.unshift({ id: 'tx_mine_' + Date.now(), type: 'mine', amount: 1, pricePer: state.currentPrice || 0, total: 1 * (state.currentPrice || 0), time: Date.now() });
                localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
                initMinerUI();
            }
        }
    }, 1000);
}

function minerUpgrade() {
    const nextCost = minerNextLevelCost(state.miner.level);
    if (state.miner.level === 0) {
        if (state.balance < nextCost) { alert(LOCALES[state.currentLang].notEnoughFunds); return; }
        state.balance -= nextCost; state.miner.level = 1; localStorage.setItem(STORAGE_KEYS.balance, state.balance); localStorage.setItem(STORAGE_KEYS.minerLevel, String(state.miner.level));
        initMinerUI(); updateBalanceUI(); showNotification((state.currentLang === 'ru' ? 'Майнер куплен' : 'Miner purchased'));
    } else {
        if (state.balance < nextCost) { alert(LOCALES[state.currentLang].notEnoughFunds); return; }
        state.balance -= nextCost; state.miner.level += 1; localStorage.setItem(STORAGE_KEYS.balance, state.balance); localStorage.setItem(STORAGE_KEYS.minerLevel, String(state.miner.level));
        initMinerUI(); updateBalanceUI(); showNotification((state.currentLang === 'ru' ? 'Майнер улучшен' : 'Miner upgraded'));
    }
}

function minerClaim() {
    const amt = Math.floor(state.miner.totalMined || 0);
    if (amt > 0) {
        state.coinBalance += amt; state.miner.totalMined -= amt; localStorage.setItem(STORAGE_KEYS.minerTotal, String(state.miner.totalMined)); localStorage.setItem(STORAGE_KEYS.coinBalance, String(state.coinBalance));
        initMinerUI(); updateBalanceUI(); state.tx.unshift({ id: 'tx_mine_claim_' + Date.now(), type: 'mine', amount: amt, pricePer: state.currentPrice || 0, total: amt * (state.currentPrice || 0), time: Date.now() });
        localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
        showNotification((state.currentLang === 'ru' ? 'Майнер: добыто ' : 'Mined: ') + String(amt) + ' YarikCoin (' + formatCurrency(amt * (state.currentPrice || 0)) + ')');
    } else showNotification(state.currentLang === 'ru' ? 'Нечего забирать' : 'Nothing to claim');
}

function updateJobsUI() {
    const cur = jobs.find(j => j.id === (state.currentJob || 0)) || jobs[0];
    const next = jobs.find(j => j.id === (state.currentJob || 0) + 1);
    DOM.currentJob.innerText = cur.name[state.currentLang];
    DOM.nextJob.innerText = next ? next.name[state.currentLang] : '-';
    DOM.accSalary.innerText = formatCurrency(state.jobAccum || 0);
    const daily = cur.daily || 0;
    DOM.jobEarnings.innerText = `${trim5(daily)}$`;
    if (cur.id === 0) { DOM.workHint.style.display = 'block'; DOM.workHint.innerText = LOCALES[state.currentLang]['work.hire']; } else { DOM.workHint.style.display = 'none'; }
    if (next) {
        if (state.currentJob === 0) DOM.hireNextJob.innerText = (state.currentLang === 'ru' ? `Получить первую работу (${next.cost}$)` : `Get first job (${next.cost}$)`);
        else DOM.hireNextJob.innerText = (state.currentLang === 'ru' ? `Получить следующую работу (${next.cost}$)` : `Get next job (${next.cost}$)`);
        DOM.hireNextJob.style.display = 'inline-block';
    } else DOM.hireNextJob.style.display = 'none';
}

function hireNextJob() {
    const next = jobs.find(j => j.id === (state.currentJob || 0) + 1);
    if (!next) { alert(state.currentLang === 'ru' ? 'Нет следующей работы' : 'No next job'); return; }
    if (state.balance < next.cost) { alert(LOCALES[state.currentLang].notEnoughFunds || 'Not enough funds'); return; }
    state.balance -= next.cost; state.currentJob = next.id; localStorage.setItem(STORAGE_KEYS.balance, state.balance); localStorage.setItem(STORAGE_KEYS.currentJob, String(state.currentJob));
    updateBalanceUI(); updateJobsUI(); showNotification((state.currentLang === 'ru' ? 'Устроились на работу: ' : 'Hired: ') + next.name[state.currentLang]);
}

function claimJobSalary() {
    if (!(state.jobAccum > 0)) { showNotification(state.currentLang === 'ru' ? 'Накопленной зарплаты нет' : 'No salary to claim'); return; }
    const amt = state.jobAccum; state.balance += amt; state.jobAccum = 0; localStorage.setItem(STORAGE_KEYS.balance, String(state.balance)); localStorage.setItem(STORAGE_KEYS.jobAccum, '0'); updateBalanceUI(); updateJobsUI();
    state.tx.unshift({ id: 'tx_job_' + Date.now(), type: 'job', amount: amt, pricePer: 1, total: amt, time: Date.now() });
    localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
    showNotification((state.currentLang === 'ru' ? 'Зарплата забрана: ' : 'Salary claimed: ') + formatCurrency(amt));
}

/* Start per-second job earnings */
let jobEarningsInterval = null;
function startWorkEarnings() {
    if (jobEarningsInterval) clearInterval(jobEarningsInterval);
    jobEarningsInterval = setInterval(() => {
        const cur = jobs.find(j => j.id === (state.currentJob || 0)) || jobs[0];
        if (cur && cur.daily && cur.daily > 0) {
            const perSec = cur.daily / 86400;
            state.jobAccum = (state.jobAccum || 0) + perSec;
            localStorage.setItem(STORAGE_KEYS.jobAccum, String(state.jobAccum));
            updateJobsUI();
        }
    }, 1000);
}

function aggregateData(start, end, bucketHours) {
    const labels = [], data = [];
    for (let t = start; t <= end; t += bucketHours) {
        let sum = 0, cnt = 0;
        for (let i = t; i < Math.min(t + bucketHours, end + 1); i++) {
            if (typeof price[i] !== 'undefined' && price[i] !== null) { sum += price[i]; cnt++; }
        }
        const val = cnt ? (sum / cnt) : null;
        data.push(val);
        const d = new Date((t + 484788) * 3600000);
        const opts = bucketHours >= 24 ? { month: 'short', year: 'numeric' } : (bucketHours >= 1 && bucketHours < 24 ? { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' } : { hour: '2-digit', minute: '2-digit' });
        labels.push(d.toLocaleString(localeCode(state.currentLang), opts));
    }
    if (start === 0 && bucketHours >= 24 && data.length > 0 && (data[0] === null)) data[0] = 0.4;
    return { labels, data };
}

function firstLastNonNull(arr) {
    let first = null, last = null;
    for (let i = 0; i < arr.length; i++) { if (arr[i] !== null && typeof arr[i] !== 'undefined') { first = arr[i]; break; } }
    for (let i = arr.length - 1; i >= 0; i--) { if (arr[i] !== null && typeof arr[i] !== 'undefined') { last = arr[i]; break; } }
    return { first, last };
}

function renderChartFor(hours, customStartHour = null) {
    const now = currentHourIndex();
    // Determine last available index
    let lastAvailableIndex = -1;
    for (let i = price.length - 1; i >= 0; i--) {
        if (typeof price[i] !== 'undefined' && price[i] !== null) { lastAvailableIndex = i; break; }
    }
    const endIndex = (lastAvailableIndex >= 0) ? Math.min(now, lastAvailableIndex) : Math.min(now, price.length - 1);
    const effectiveEnd = Math.max(0, endIndex);

    const availableSpan = effectiveEnd - 0 + 1;
    const hoursToUse = Math.min(hours, Math.max(1, availableSpan));
    let start = (customStartHour !== null) ? customStartHour : Math.max(0, effectiveEnd - hoursToUse + 1);
    if (customStartHour === null) start = Math.max(0, effectiveEnd - hoursToUse + 1);
    const end = start + hoursToUse - 1;

    state.viewHours = hoursToUse; state.viewStartHour = start;

    let bucket = 1;
    if (state.granularity === 'hour') bucket = 1;
    else if (state.granularity === 'day') bucket = 24;
    else if (state.granularity === 'month') bucket = 24 * 30;
    else {
        if (hoursToUse <= 48) bucket = 1;
        else if (hoursToUse <= 720) bucket = 6;
        else if (hoursToUse <= 8760) bucket = 24;
        else bucket = 24 * 30;
    }

    const { labels, data } = aggregateData(start, end, bucket);
    if (state.chart) try { state.chart.destroy(); } catch (e) { /* ignore */ }

    const fl = firstLastNonNull(data);
    if (fl.last !== null && typeof fl.last !== 'undefined') {
        state.currentPrice = fl.last;
    } else {
        let lastAvail = null;
        for (let i = price.length - 1; i >= 0; i--) { if (typeof price[i] !== 'undefined' && price[i] !== null) { lastAvail = price[i]; break; } }
        if (lastAvail !== null) state.currentPrice = lastAvail;
    }
    DOM.price.innerText = state.currentPrice ? formatCurrency(state.currentPrice) : '0$';

    const theme = chartThemes[state.chartTheme] || chartThemes.green;
    const ctx = DOM.priceChartCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, theme.gradient[0]);
    gradient.addColorStop(1, theme.gradient[1]);

    let fillOption = false, background = theme.main, border = theme.main;
    if (state.chartType === 'filled') { fillOption = true; background = gradient; }
    else if (state.chartType === 'filled-solid') { fillOption = true; background = theme.gradient[0]; }
    else if (state.chartType === 'line') { fillOption = false; }

    const mainDataset = { label: 'Price', data, borderColor: border, backgroundColor: background, tension: 0.15, pointRadius: 0, fill: fillOption };
    const datasets = [mainDataset];

    let dataMin = Infinity, dataMax = -Infinity, minIdx = -1, maxIdx = -1;
    data.forEach((v, i) => {
        if (v !== null && typeof v !== 'undefined') {
            if (v < dataMin) { dataMin = v; minIdx = i; }
            if (v > dataMax) { dataMax = v; maxIdx = i; }
        }
    });

    if (state.showTrades) {
        const buyData = new Array(data.length).fill(null);
        const sellData = new Array(data.length).fill(null);
        const startHour = start;
        const bucketHours = bucket;
        state.tx.filter(t => t.type === 'buy' || t.type === 'sell').forEach(t => {
            const tradeHour = Math.floor(t.time / 3600000 - 484788);
            if (tradeHour >= startHour && tradeHour <= end) {
                const index = Math.floor((tradeHour - startHour) / bucketHours);
                if (index >= 0 && index < data.length) {
                    if (t.type === 'buy') buyData[index] = t.pricePer;
                    else sellData[index] = t.pricePer;
                }
            }
        });
        datasets.push({ label: 'Buys', data: buyData, pointRadius: 8, pointStyle: 'rect', pointBackgroundColor: '#4caf50', showLine: false, type: 'line' });
        datasets.push({ label: 'Sells', data: sellData, pointRadius: 8, pointStyle: 'rect', pointBackgroundColor: '#f44336', showLine: false, type: 'line' });

        const predictedBuy = new Array(data.length).fill(null);
        const predictedSell = new Array(data.length).fill(null);

        state.orders.forEach(order => {
            for (let hr = start; hr <= end; hr++) {
                const p = price[hr];
                if (typeof p === 'undefined' || p === null) continue;
                if (order.type === 'buy') {
                    if (p <= order.price) {
                        const idx = Math.floor((hr - start) / bucketHours);
                        if (idx >= 0 && idx < data.length) { if (predictedBuy[idx] === null) predictedBuy[idx] = order.price; }
                        break;
                    }
                } else if (order.type === 'sell') {
                    if (p >= order.price) {
                        const idx = Math.floor((hr - start) / bucketHours);
                        if (idx >= 0 && idx < data.length) { if (predictedSell[idx] === null) predictedSell[idx] = order.price; }
                        break;
                    }
                }
            }
        });

        datasets.push({ label: 'Predicted Buys', data: predictedBuy, pointRadius: 7, borderColor: '#2e7d32', backgroundColor: '#2e7d32', showLine: false, pointStyle: 'circle', type: 'line' });
        datasets.push({ label: 'Predicted Sells', data: predictedSell, pointRadius: 7, borderColor: '#c62828', backgroundColor: '#c62828', showLine: false, pointStyle: 'circle', type: 'line' });
    }

    if (state.showMarkers && minIdx >= 0 && maxIdx >= 0) {
        const maxMarker = new Array(data.length).fill(null);
        const minMarker = new Array(data.length).fill(null);
        maxMarker[maxIdx] = data[maxIdx];
        minMarker[minIdx] = data[minIdx];
        datasets.push({ label: 'Max', data: maxMarker, pointRadius: 7, borderColor: '#2e7d32', backgroundColor: '#2e7d32', showLine: false, pointStyle: 'circle', type: 'line' });
        datasets.push({ label: 'Min', data: minMarker, pointRadius: 7, borderColor: '#f44336', backgroundColor: '#f44336', showLine: false, pointStyle: 'circle', type: 'line' });
        const timeOpts = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        DOM.maxPrice.innerText = (maxIdx >= 0 && isFinite(dataMax)) ? `${formatCurrency(dataMax)} (${new Date((start + maxIdx * bucket + 484788) * 3600000).toLocaleString(localeCode(state.currentLang), timeOpts)})` : '-';
        DOM.minPrice.innerText = (minIdx >= 0 && isFinite(dataMin)) ? `${formatCurrency(dataMin)} (${new Date((start + minIdx * bucket + 484788) * 3600000).toLocaleString(localeCode(state.currentLang), timeOpts)})` : '-';
    } else {
        DOM.maxPrice.innerText = '-'; DOM.minPrice.innerText = '-';
    }

    let suggestedMin = undefined, suggestedMax = undefined;
    if (isFinite(dataMin) && isFinite(dataMax)) {
        const pad = (dataMax - dataMin) * 0.08 || (Math.abs(dataMax) * 0.02) || 0.01;
        suggestedMin = dataMin - pad; suggestedMax = dataMax + pad;
    }

    state.chart = new Chart(ctx, {
        type: (state.chartType === 'bar' ? 'bar' : 'line'),
        data: { labels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index', intersect: false, backgroundColor: 'rgba(11,23,32,0.9)', titleColor: '#fff', bodyColor: '#fff', padding: 10, cornerRadius: 8, displayColors: false,
                    callbacks: { title: (items) => {
                            if (!items || !items.length) return '';
                            const idx = items[0].dataIndex;
                            return labels[idx] || '';
                        }, label: ctx => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}` }
                }
            },
            scales: {
                x: { display: true, grid: { drawOnChartArea: false, color: 'rgba(0,0,0,0.05)' }, ticks: { color: 'var(--muted)', font: { size: 11 } } },
                y: { ticks: { callback: v => trim5(v), color: 'var(--muted)', font: { size: 11 } }, grid: { color: 'rgba(0,0,0,0.05)' }, suggestedMin, suggestedMax }
            }
        }
    });

    const fl2 = firstLastNonNull(data);
    if (fl2.first !== null && fl2.last !== null) {
        const delta = fl2.last - fl2.first;
        const pct = fl2.first !== 0 ? (delta / fl2.first) * 100 : 0;
        const sign = delta >= 0 ? '+' : '';
        DOM.periodChange.innerText = `${sign}${trim5(delta)}$ (${sign}${pct.toFixed(2)}%)`;
        DOM.periodChange.style.color = delta >= 0 ? 'green' : 'red';
    } else DOM.periodChange.innerText = '';

    syncActiveTimeBtnColor();
}

function syncActiveTimeBtnColor() {
    const active = DOM.timeSelector.querySelector('.time-btn.active');
    DOM.timeSelector.querySelectorAll('.time-btn').forEach(b => { b.style.background = ''; b.style.color = ''; b.style.borderColor = ''; });
    if (active) {
        const theme = chartThemes[state.chartTheme] || chartThemes.green;
        active.style.background = theme.main;
        active.style.color = '#fff';
        active.style.borderColor = 'transparent';
    }
}

function panBy(direction, amount) {
    const now = currentHourIndex();
    let newStart = (state.viewStartHour || (now - state.viewHours + 1)) + (direction === 'left' ? -amount : amount);
    if (newStart < 0) newStart = 0;
    let lastAvailableIndex = -1;
    for (let i = price.length - 1; i >= 0; i--) { if (typeof price[i] !== 'undefined' && price[i] !== null) { lastAvailableIndex = i; break; } }
    const maxStart = (lastAvailableIndex >= 0) ? (lastAvailableIndex - state.viewHours + 1) : (now - state.viewHours + 1);
    newStart = Math.min(newStart, Math.max(0, maxStart));
    renderChartFor(state.viewHours, newStart);
}
function panRange(direction) {
    let shift = 0;
    const gr = state.granularity;
    if (gr === 'hour') shift = 1;
    else if (gr === 'day') shift = 24;
    else if (gr === 'month') shift = 24 * 30;
    else shift = Math.max(1, Math.floor(state.viewHours / 4));
    panBy(direction, shift);
}
function panPeriod(direction) { panBy(direction, state.viewHours); }

function openModal(modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal(modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }

function openTrade(type) {
    DOM.tradeTitle.innerText = type === 'buy' ? (state.currentLang === 'ru' ? 'Купить YarikCoin' : 'Buy YarikCoin') : (state.currentLang === 'ru' ? 'Продать YarikCoin' : 'Sell YarikCoin');
    DOM.tradeLabel.innerText = type === 'buy' ? (state.currentLang === 'ru' ? 'Количество для покупки:' : 'Amount to buy:') : (state.currentLang === 'ru' ? 'Количество для продажи:' : 'Amount to sell:');
    DOM.confirmTradeBtn.innerText = LOCALES[state.currentLang]['button.confirm'];
    DOM.confirmTradeBtn.className = type === 'buy' ? 'btn btn-buy' : 'btn btn-sell';
    DOM.tradeAmount.value = '';
    state.pendingTradeType = type;
    updateTradeInfo();
    openModal(DOM.tradeModal);
    DOM.tradeAmount.focus();
}
function updateTradeInfo() {
    const v = parseFloat(DOM.tradeAmount.value);
    const priceNow = state.currentPrice || 0;
    if (state.pendingTradeType === 'buy') {
        const cost = (isFinite(v) && priceNow) ? (v * priceNow) : 0;
        DOM.tradeInfo.innerText = (state.currentLang === 'ru' ? `Стоимость: ${formatCurrency(cost)}` : `Cost: ${formatCurrency(cost)}`);
    } else {
        const rev = (isFinite(v) && priceNow) ? (v * priceNow) : 0;
        DOM.tradeInfo.innerText = (state.currentLang === 'ru' ? `Вы получите: ${formatCurrency(rev)}` : `You will receive: ${formatCurrency(rev)}`);
    }
}
function confirmTrade() {
    const amt = parseFloat(DOM.tradeAmount.value);
    if (!isFinite(amt) || amt <= 0) { alert(LOCALES[state.currentLang].invalidOrderData || 'Invalid'); return; }
    const priceNow = state.currentPrice || 0;
    if (state.pendingTradeType === 'buy') {
        const cost = amt * priceNow;
        if (state.balance < cost) { alert(LOCALES[state.currentLang].notEnoughFunds || 'Not enough funds'); return; }
        state.balance -= cost; state.coinBalance += amt;
        state.tx.unshift({ id: 'tx_buy_' + Date.now(), type: 'buy', amount: amt, pricePer: priceNow, total: cost, time: Date.now() });
        localStorage.setItem(STORAGE_KEYS.balance, String(state.balance)); localStorage.setItem(STORAGE_KEYS.coinBalance, String(state.coinBalance));
    } else {
        if (state.coinBalance < amt) { alert(LOCALES[state.currentLang].notEnoughYarikCoin || 'Not enough YarikCoin'); return; }
        state.coinBalance -= amt; state.balance += amt * priceNow;
        state.tx.unshift({ id: 'tx_sell_' + Date.now(), type: 'sell', amount: amt, pricePer: priceNow, total: amt*priceNow, time: Date.now() });
        localStorage.setItem(STORAGE_KEYS.balance, String(state.balance)); localStorage.setItem(STORAGE_KEYS.coinBalance, String(state.coinBalance));
    }
    localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
    updateBalanceUI(); renderTxs(); closeModal(DOM.tradeModal); showNotification((state.currentLang === 'ru' ? 'Ордер выполнен' : 'Trade executed'));
}

function placeOrder() {
    const amount = parseFloat(DOM.orderAmount.value);
    const priceVal = parseFloat(DOM.orderPrice.value);
    if (!isFinite(amount) || !isFinite(priceVal) || amount <= 0 || priceVal <= 0) { alert(LOCALES[state.currentLang].invalidOrderData || 'Invalid'); return; }
    const type = state.currentOrderType || 'buy';
    const id = 'ord_' + Date.now();
    state.orders.push({ id, type, amount, price: priceVal, time: Date.now() });
    saveOrders();
    showNotification((state.currentLang === 'ru' ? 'Ордер размещён' : 'Order placed'));
    DOM.orderAmount.value = ''; DOM.orderPrice.value = '';
    updateOrderPreview();
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('cancel-order-btn')) {
        const id = e.target.getAttribute('data-order-id');
        state.orders = state.orders.filter(o => o.id !== id);
        saveOrders(); showNotification(state.currentLang === 'ru' ? 'Ордер отменён' : 'Order canceled');
    }
});

function cancelAllOrders() {
    if (!confirm(state.currentLang === 'ru' ? 'Отменить все ордера?' : 'Cancel all orders?')) return;
    state.orders = []; saveOrders();
}

/* Promo handling */
function normalizePromoText(txt) {
    return String(txt || '').toLowerCase().replace(/[’'"]/g, '').replace(/\s+/g, ' ').trim();
}

const promoGroups = {
    'YarikStudio': [
        normalizePromoText('yarikstudio'),
        normalizePromoText('yarik studio'),
    ],
    'Trump': [
        normalizePromoText('trump'),
    ],
    'Hirohito': [
        normalizePromoText('hirohito'),
    ],
    'Canada_is_state_of_usa': [
        normalizePromoText('canada is state of usa'),
        normalizePromoText('canada is state of united states'),
        normalizePromoText('canada is state of unites states of america'),
        normalizePromoText('canada is state of trumpLand'),
        normalizePromoText("canada is state of trump's Land"),
        normalizePromoText('canada is state of trumpsland'),
    ]
};

function findPromoCanonical(norm) {
    for (const canonical in promoGroups) {
        if ((promoGroups[canonical]).includes(norm.toLowerCase())) return canonical;
    }
    return null;
}

function applyPromocode() {
    const raw = String(DOM.promocodeInput.value || '').trim();
    if (!raw) return showNotification(state.currentLang === 'ru' ? 'Введите промокод' : 'Enter promocode');
    const norm = normalizePromoText(raw);
    const canonical = findPromoCanonical(norm);
    if (!canonical) {
        showNotification(LOCALES[state.currentLang]['promocode.invalid'] || 'Invalid promocode.');
        return;
    }
    if (state.usedPromos.includes(canonical)) {
        showNotification(LOCALES[state.currentLang]['promocode.already'] || 'Promocode already used.');
        return;
    }
    const priceNow = state.currentPrice || 1;
    const coins = parseFloat((25 / priceNow).toFixed(5));
    state.coinBalance += coins;
    state.usedPromos.push(canonical);
    localStorage.setItem(STORAGE_KEYS.usedPromos, JSON.stringify(state.usedPromos));
    localStorage.setItem(STORAGE_KEYS.coinBalance, String(state.coinBalance));
    state.tx.unshift({ id: 'tx_promo_' + Date.now(), type: 'promo', amount: coins, pricePer: priceNow, total: coins * priceNow, time: Date.now() });
    localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx));
    updateBalanceUI(); renderTxs();
    const msg = (LOCALES[state.currentLang]['promocode.success'] || 'Promocode accepted').replace('{coins}', String(coins));
    showNotification(msg);
    DOM.promocodeInput.value = '';
}

/* I18N */
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const txt = LOCALES[state.currentLang][key] || LOCALES[state.currentLang][key.replace(/\./g, '_')] || LOCALES[state.currentLang][key] || '';
        if (el.tagName.toLowerCase() === 'input') {
            el.placeholder = txt || el.placeholder || '';
        } else {
            el.textContent = txt || el.textContent || '';
        }
    });
    const promoPlaceholder = (state.currentLang === 'ru') ? 'Введите промокод' : 'Enter promocode';
    DOM.promocodeInput.placeholder = promoPlaceholder;
    if (DOM.customPanel.style.display === 'none') {
        DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.open_custom'] || 'Open Customisation';
    } else {
        DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.close_custom'] || 'Close Customisation';
    }
    DOM.chartThemeSelector.querySelectorAll('.chart-theme-btn').forEach(b => {
        const themeKey = 'theme.' + b.dataset.theme;
        const t = LOCALES[state.currentLang][themeKey] || b.dataset.theme;
        b.title = t;
        b.setAttribute('aria-label', t);
    });
    DOM.priceLabel.textContent = LOCALES[state.currentLang]['price.label'] || DOM.priceLabel.textContent;
}

function switchTab(tab) {
    state.activeTab = tab;
    localStorage.setItem(STORAGE_KEYS.activeTab, tab);
    if (tab === 'miner') {
        DOM.minerContent.style.display = 'block';
        DOM.workContent.style.display = 'none';
        DOM.tabMiner.classList.add('active');
        DOM.tabWork.classList.remove('active');
    } else {
        DOM.minerContent.style.display = 'none';
        DOM.workContent.style.display = 'block';
        DOM.tabMiner.classList.remove('active');
        DOM.tabWork.classList.add('active');
    }
}

function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem(STORAGE_KEYS.language, lang);
    applyTranslations();
    updateBalanceUI();
    renderTxs();
    renderOrders();
    updateJobsUI();
    initMinerUI();
    if (DOM.customPanel.style.display === 'none') DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.open_custom'] || 'Open Customisation';
    else DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.close_custom'] || 'Close Customisation';
    document.querySelectorAll('#languageSwitch .lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
    });
    // Update order total preview localization
    updateOrderPreview();
}

function initUI() {
    DOM.timeSelector.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.timeSelector.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const hours = parseInt(btn.dataset.hours, 10);
            state.viewHours = hours;
            localStorage.setItem(STORAGE_KEYS.chartHours, String(hours));
            renderChartFor(hours);
        });
    });

    DOM.prevRangeBtn.addEventListener('click', () => panRange('left'));
    DOM.nextRangeBtn.addEventListener('click', () => panRange('right'));
    DOM.prevPeriodBtn.addEventListener('click', () => panPeriod('left'));
    DOM.nextPeriodBtn.addEventListener('click', () => panPeriod('right'));

    document.querySelectorAll('.gran-btn').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.gran-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            state.granularity = b.dataset.gr;
            localStorage.setItem(STORAGE_KEYS.chartGranularity, state.granularity);
            renderChartFor(state.viewHours);
        });
    });

    document.querySelectorAll('.chart-type-btn').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.chart-type-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            state.chartType = b.dataset.type;
            localStorage.setItem(STORAGE_KEYS.chartType, state.chartType);
            renderChartFor(state.viewHours);
        });
    });

    document.querySelectorAll('.chart-option-btn').forEach(b => {
        b.addEventListener('click', () => {
            b.classList.toggle('active');
            const opt = b.dataset.option;
            if (opt === 'markers') state.showMarkers = b.classList.contains('active');
            else if (opt === 'trades') state.showTrades = b.classList.contains('active');
            localStorage.setItem(STORAGE_KEYS.showMarkers, String(state.showMarkers));
            localStorage.setItem(STORAGE_KEYS.showTrades, String(state.showTrades));
            renderChartFor(state.viewHours);
        });
    });

    DOM.chartThemeSelector.querySelectorAll('.chart-theme-btn').forEach(b => {
        b.addEventListener('click', () => {
            DOM.chartThemeSelector.querySelectorAll('.chart-theme-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            state.chartTheme = b.dataset.theme;
            localStorage.setItem(STORAGE_KEYS.chartTheme, state.chartTheme);
            renderChartFor(state.viewHours);
            syncActiveTimeBtnColor();
        });
    });

    DOM.toggleCustomBtn.addEventListener('click', () => {
        if (DOM.customPanel.style.display === 'none' || DOM.customPanel.style.display === '') {
            DOM.customPanel.style.display = 'flex';
            DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.close_custom'] || 'Close Customisation';
        } else {
            DOM.customPanel.style.display = 'none';
            DOM.toggleCustomBtn.textContent = LOCALES[state.currentLang]['button.open_custom'] || 'Open Customisation';
        }
    });

    DOM.buyBtn.addEventListener('click', () => openTrade('buy'));
    DOM.sellBtn.addEventListener('click', () => openTrade('sell'));
    DOM.confirmTradeBtn.addEventListener('click', confirmTrade);
    DOM.tradeAmount.addEventListener('input', updateTradeInfo);
    DOM.cancelTradeBtn.addEventListener('click', () => closeModal(DOM.tradeModal));

    DOM.settingsBtn.addEventListener('click', () => openModal(DOM.settingsModal));
    DOM.closeSettings.addEventListener('click', () => closeModal(DOM.settingsModal));
    DOM.volumeControl.addEventListener('input', () => {
        try { DOM.mainMusic.volume = parseFloat(DOM.volumeControl.value); } catch (e) { /* ignore */ }
    });

    document.querySelectorAll('#languageSwitch .lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    DOM.clearTxBtn.addEventListener('click', () => {
        if (!confirm(LOCALES[state.currentLang].confirmClearTx || 'Clear transactions?')) return;
        state.tx = []; localStorage.setItem(STORAGE_KEYS.tx, JSON.stringify(state.tx)); renderTxs();
    });

    DOM.placeOrder.addEventListener('click', placeOrder);
    DOM.cancelAllOrders.addEventListener('click', cancelAllOrders);

    DOM.orderTypeSelector.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.orderTypeSelector.querySelectorAll('.btn').forEach(x => x.classList.remove('active'));
            btn.classList.add('active');
            state.currentOrderType = btn.dataset.type;
        });
    });

    DOM.minerUpgrade.addEventListener('click', minerUpgrade);
    DOM.minerClaim.addEventListener('click', minerClaim);

    DOM.hireNextJob.addEventListener('click', hireNextJob);
    DOM.claimJob.addEventListener('click', claimJobSalary);

    DOM.promocodeApply.addEventListener('click', applyPromocode);
    DOM.promocodeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') applyPromocode(); });

    DOM.tabMiner.addEventListener('click', () => { switchTab('miner'); });
    DOM.tabWork.addEventListener('click', () => { switchTab('work'); });

    // Order preview live update
    DOM.orderAmount.addEventListener('input', updateOrderPreview);
    DOM.orderPrice.addEventListener('input', updateOrderPreview);
}

function updateOrderPreview() {
    const amt = parseFloat(DOM.orderAmount.value);
    const priceVal = parseFloat(DOM.orderPrice.value);
    if (!isFinite(amt) || !isFinite(priceVal) || amt <= 0 || priceVal <= 0) {
        DOM.orderTotalPreview.textContent = '—';
        return;
    }
    const total = amt * priceVal;
    const template = LOCALES[state.currentLang]['order.total_preview'] || 'Total: {total}';
    const formatted = template.replace('{total}', formatCurrency(total));
    DOM.orderTotalPreview.textContent = formatted;
}

function init() {
    applyTranslations();
    document.querySelectorAll('#languageSwitch .lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
    });
    DOM.promocodeInput.placeholder = state.currentLang === 'ru' ? 'Введите промокод' : 'Enter promocode';
    DOM.promocodeApply.textContent = LOCALES[state.currentLang]['promocode.submit'] || 'Apply';

    const defaultBtn = DOM.timeSelector.querySelector(`.time-btn[data-hours="${state.viewHours}"]`);
    if (defaultBtn) defaultBtn.classList.add('active');

    document.querySelectorAll('.gran-btn').forEach(b => { if (b.dataset.gr === state.granularity) b.classList.add('active'); });
    document.querySelectorAll('.chart-type-btn').forEach(b => { if (b.dataset.type === state.chartType) b.classList.add('active'); });
    document.querySelectorAll('.chart-option-btn').forEach(b => {
        const opt = b.dataset.option;
        if ((opt === 'markers' && state.showMarkers) || (opt === 'trades' && state.showTrades)) b.classList.add('active');
    });
    const themeBtn = DOM.chartThemeSelector.querySelector(`.chart-theme-btn[data-theme="${state.chartTheme}"]`);
    if (themeBtn) themeBtn.classList.add('active');

    initUI();
    switchTab(state.activeTab || 'miner');

    renderChartFor(state.viewHours || 24);
    updateBalanceUI();
    renderTxs();
    renderOrders();
    updateJobsUI();
    initMinerUI();

    processOfflineOrders();
    handleOfflineMining();
    handleOfflineWork();

    // Start intervals: miner and job earnings
    startMinerOnline();
    startWorkEarnings();

    // ensure order preview initially updated
    updateOrderPreview();
}

init();
