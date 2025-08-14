import price from './data/price.mjs';

const CONSTANTS = { HOUR_OFFSET: 484788, STORAGE_KEYS: { balance:'yarikcoin_balance', coinBalance:'yarikcoin_onBalance', volume:'yarikcoin_volume', language:'yarikcoin_lang', tx:'yarikcoin_tx', orders:'yarikcoin_orders', lastHour: 'yarikcoin_last_hour', minerLevel: 'yarikcoin_miner_level', minerTotal: 'yarikcoin_miner_total', minerLastSeen: 'yarikcoin_miner_lastseen', chartHours: 'yarikcoin_chart_hours', chartGranularity: 'yarikcoin_chart_granularity', chartType: 'yarikcoin_chart_type', chartTheme: 'yarikcoin_chart_theme', showMarkers: 'yarikcoin_show_markers', showTrades: 'yarikcoin_show_trades', activeTab: 'yarikcoin_active_tab', currentJob: 'yarikcoin_current_job', jobAccum: 'yarikcoin_job_accum' } };

// DOM pointers
const DOM = {
  price: document.getElementById('price'), balance: document.getElementById('balance'), onBalance: document.getElementById('onBalance'),
  maxPrice: document.getElementById('maxPrice'), minPrice: document.getElementById('minPrice'), priceChartCanvas: document.getElementById('priceChart'),
  timeSelector: document.getElementById('timeSelector'), buyBtn: document.getElementById('buyBtn'), sellBtn: document.getElementById('sellBtn'),
  tradeModal: document.getElementById('tradeModal'), tradeTitle: document.getElementById('tradeTitle'), tradeLabel: document.getElementById('tradeLabel'),
  tradeAmount: document.getElementById('tradeAmount'), tradeInfo: document.getElementById('tradeInfo'), confirmTradeBtn: document.getElementById('confirmTradeBtn'), cancelTradeBtn: document.getElementById('cancelTradeBtn'),
  mainMusic: document.getElementById('mainMusic'), clickSound: document.getElementById('clickSound'), settingsBtn: document.getElementById('settingsBtn'), settingsModal: document.getElementById('settingsModal'), closeSettings: document.getElementById('closeSettings'),
  volumeControl: document.getElementById('volumeControl'), languageSwitch: document.getElementById('languageSwitch'), granularity: document.getElementById('granularity'),
  prevRangeBtn: document.getElementById('prevRangeBtn'), nextRangeBtn: document.getElementById('nextRangeBtn'),
  prevPeriodBtn: document.getElementById('prevPeriodBtn'), nextPeriodBtn: document.getElementById('nextPeriodBtn'),
  txList: document.getElementById('txList'), ordersList: document.getElementById('ordersList'), placeOrder: document.getElementById('placeOrder'), orderAmount: document.getElementById('orderAmount'), orderPrice: document.getElementById('orderPrice'), cancelAllOrders: document.getElementById('cancelAllOrders'),
  minerLevel: document.getElementById('minerLevel'), minerNextCost: document.getElementById('minerNextCost'), minerTotalMined: document.getElementById('minerTotalMined'), minerAvgTime: document.getElementById('minerAvgTime'), minerUpgrade: document.getElementById('minerUpgrade'), minerClaim: document.getElementById('minerClaim'),
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
  workHint: document.getElementById('workHint')
};

// translations (T)
const T = {
  'en': { buy:'Buy', sell:'Sell', close:'Close', cancel:'Cancel', place:'Place', cancelAll:'Cancel all', noOrders:'No orders', invalidOrderData: 'Invalid order data', buyPriceLow: 'Buy price must be lower than current price', sellPriceHigh: 'Sell price must be higher than current price', clear: 'Clear', confirm: 'Confirm', upgrade: 'Upgrade', claim: 'Claim', period: 'Period', granularity: 'Granularity', notEnoughFunds: 'Not enough funds', notEnoughYarikCoin: 'Not enough YarikCoin', confirmClearTx: 'Are you sure you want to clear all transactions?', type: 'Type', theme: 'Theme', line: 'Line', bar: 'Bar', filled: 'Filled', options: 'Options', markers: 'Maximal & Minimal Price', trades: 'My Trades', for: 'for', received: 'received', green: 'Green', blue: 'Blue', red: 'Red', purple: 'Purple', gr_auto: 'Auto', gr_hour: 'Hour', gr_day: 'Day', gr_month: 'Month', p_1d: '1 day', p_1w: '1 week', p_1m: '1 month', p_1y: '1 year', p_all: 'All time', work_title: 'Job', tab_miner: 'Miner', tab_work: 'Job', work_none: 'No job', work_current: 'Current job', work_next: 'Next job', accumulated: 'Accumulated salary', earn_day: 'Earn (day)', earn_hour: 'Earn (hour)', hire: 'Hire next job', work_hint_initial: 'Get a job to start earning' },
  'ru': { buy:'Купить', sell:'Продать', close:'Закрыть', cancel:'Отмена', place:'Разместить', cancelAll:'Отменить все', noOrders:'Ордеров нет', invalidOrderData: 'Неверные данные ордера', buyPriceLow: 'Цена покупки должна быть ниже текущей', sellPriceHigh: 'Цена продажи должна быть выше текущей', clear: 'Очистить', confirm: 'Подтвердить', upgrade: 'Улучшить', claim: 'Забрать', period: 'Период', granularity: 'Детализация', notEnoughFunds: 'Недостаточно средств', notEnoughYarikCoin: 'Недостаточно YarikCoin', confirmClearTx: 'Вы уверены, что хотите очистить историю транзакций?', type: 'Тип', theme: 'Тема', line: 'Линия', bar: 'Бар', filled: 'Закрашенный', options: 'Опции', markers: 'Макс. и Мин. цена', trades: 'Мои сделки', for: 'за', received: 'получено', green: 'Зеленая', blue: 'Синяя', red: 'Красная', purple: 'Фиолетовая', gr_auto: 'Авто', gr_hour: 'Час', gr_day: 'День', gr_month: 'Месяц', p_1d: '1 день', p_1w: '1 неделя', p_1m: '1 месяц', p_1y: '1 год', p_all: 'Все время', work_title: 'Работа', tab_miner: 'Майнер', tab_work: 'Работа', work_none: 'Нет работы', work_current: 'Текущая работа', work_next: 'Следующая работа', accumulated: 'Накопленная зарплата', earn_day: 'Зарплата в день', earn_hour: 'Зарплата в час', hire: 'Получить следующую работу', work_hint_initial: 'Наймитесь на работу, чтобы начать зарабатывать' }
};

const chartThemes = {
  green: { main: '#2e7d32', gradient: ['rgba(46,125,50,0.14)', 'rgba(46,125,50,0.02)'], maxMarker: '#2196f3', minMarker: '#f44336' },
  blue: { main: '#1976d2', gradient: ['rgba(25,118,210,0.14)', 'rgba(25,118,210,0.02)'], maxMarker: '#2196f3', minMarker: '#f44336' },
  red: { main: '#c62828', gradient: ['rgba(198,40,40,0.14)', 'rgba(198,40,40,0.02)'], maxMarker: '#2196f3', minMarker: '#f44336' },
  purple: { main: '#6a1b9a', gradient: ['rgba(106,27,154,0.14)', 'rgba(106,27,154,0.02)'], maxMarker: '#2196f3', minMarker: '#f44336' }
};

// initial state
const state = {
  currentLang: localStorage.getItem(CONSTANTS.STORAGE_KEYS.language) || 'en',
  balance: parseFloat(localStorage.getItem(CONSTANTS.STORAGE_KEYS.balance)||'100'),
  coinBalance: parseFloat(localStorage.getItem(CONSTANTS.STORAGE_KEYS.coinBalance)||'0'),
  volume: parseFloat(localStorage.getItem(CONSTANTS.STORAGE_KEYS.volume)||'0.2'),
  chart:null,
  chartType: localStorage.getItem(CONSTANTS.STORAGE_KEYS.chartType) || 'filled',
  chartTheme: localStorage.getItem(CONSTANTS.STORAGE_KEYS.chartTheme) || 'green',
  showMarkers: localStorage.getItem(CONSTANTS.STORAGE_KEYS.showMarkers) !== 'false',
  showTrades: localStorage.getItem(CONSTANTS.STORAGE_KEYS.showTrades) === 'true',
  viewHours: parseInt(localStorage.getItem(CONSTANTS.STORAGE_KEYS.chartHours)) || 24,
  granularity: localStorage.getItem(CONSTANTS.STORAGE_KEYS.chartGranularity) || 'hour',
  tx: JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_KEYS.tx)||'[]'),
  orders: JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_KEYS.orders)||'[]'),
  miner: { level: parseInt(localStorage.getItem(CONSTANTS.STORAGE_KEYS.minerLevel)||'0'), totalMined: parseFloat(localStorage.getItem(CONSTANTS.STORAGE_KEYS.minerTotal)||'0'), lastSeen: parseInt(localStorage.getItem(CONSTANTS.STORAGE_KEYS.minerLastSeen)||Date.now()) },
  currentOrderType: 'buy',
  currentJob: parseInt(localStorage.getItem(CONSTANTS.STORAGE_KEYS.currentJob) || '0'),
  jobAccum: parseFloat(localStorage.getItem(CONSTANTS.STORAGE_KEYS.jobAccum) || '0'),
  activeTab: localStorage.getItem(CONSTANTS.STORAGE_KEYS.activeTab) || 'miner'
};

// job list (sequential)
const jobs = [
  { id:0, name:{en:'No job',ru:'Нет работы'}, cost:0, daily:0 },
  { id:1, name:{en:'Cleaner',ru:'Уборщик'}, cost:20, daily:0.4 },
  { id:2, name:{en:'Cashier',ru:'Кассир'}, cost:100, daily:1.5 },
  { id:3, name:{en:'Teacher',ru:'Учитель'}, cost:500, daily:7.5 },
  { id:4, name:{en:'Engineer',ru:'Инженер'}, cost:2500, daily:37.5 },
  { id:5, name:{en:'Programmer',ru:'Программист'}, cost:12500, daily:187.5 },
  { id:6, name:{en:'Cosmonaut',ru:'Космонавт'}, cost:62500, daily:937.5 },
  { id:7, name:{en:'Businessman',ru:'Бизнесмен'}, cost:312500, daily:4687.5 },
  { id:8, name:{en:'Governor',ru:'Губернатор'}, cost:1562500, daily:23437.5 },
  { id:9, name:{en:'President',ru:'Президент'}, cost:7812500, daily:117187.5 },
  { id:10, name:{en:'Emperor',ru:'Император'}, cost:39062500, daily:585937.5 },
  { id:11, name:{en:'World Ruler',ru:'Повелитель мира'}, cost:1000000000, daily:585937.5 * 20 }
];

/* -------------------------
   Helpers
   ------------------------- */
function formatCurrency(v){ return Number(Number(v || 0).toFixed(5)) + '$' }
function getCurrentHour(){ return Math.floor(Date.now()/3600000 - CONSTANTS.HOUR_OFFSET) }
function showNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerText = message;
  DOM.notificationArea.appendChild(notif);
  setTimeout(() => {
    notif.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => notif.remove(), 500);
  }, 4000);
}

function updateBalanceUI(){
  DOM.balance.innerText = `${Number(state.balance || 0).toFixed(5)}$`;
  DOM.onBalance.innerText = Number(state.coinBalance || 0).toFixed(5);
  if (DOM.buyBtn) DOM.buyBtn.disabled = !(state.balance > 0);
  if (DOM.sellBtn) DOM.sellBtn.disabled = !(state.coinBalance > 0);
}

/* -------------------------
   Chart utils & render
   ------------------------- */
function aggregateData(start,end,bucketHours){
  const labels=[]; const data=[];
  for(let t=start; t<=end; t+=bucketHours){
    let sum=0,cnt=0;
    for(let i=t;i<Math.min(t+bucketHours,end+1);i++){
      if(typeof price[i] !== 'undefined' && price[i] !== null){
        sum += price[i];
        cnt++;
      }
    }
    const val = cnt ? (sum/cnt) : null;
    data.push(val);
    const d = new Date((t+CONSTANTS.HOUR_OFFSET)*3600000);
    const opts = bucketHours>=24 ? { month:'short', year:'numeric' } : (bucketHours>=1 && bucketHours<24 ? { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' } : { hour:'2-digit', minute:'2-digit' });
    labels.push(d.toLocaleString(state.currentLang, opts));
  }
  if(start===0 && bucketHours>=24 && data.length>0 && (data[0]===null)) data[0]=0.4;
  return {labels,data};
}
function firstLastNonNull(arr){
  let first = null, last = null;
  for(let i=0;i<arr.length;i++){ if(arr[i]!==null && typeof arr[i] !== 'undefined'){ first = arr[i]; break; } }
  for(let i=arr.length-1;i>=0;i--){ if(arr[i]!==null && typeof arr[i] !== 'undefined'){ last = arr[i]; break; } }
  return { first, last };
}

function renderChartFor(hours, customStartHour = null){
  const now = getCurrentHour();
  const start = (customStartHour !== null) ? customStartHour : Math.max(0, now - hours + 1);
  const end = start + hours - 1;
  state.viewHours = hours;
  state.viewStartHour = start;

  let bucket = 1;
  if(state.granularity==='hour') bucket=1; else if(state.granularity==='day') bucket=24; else if(state.granularity==='month') bucket=24*30;
  else { if(hours <= 48) bucket=1; else if(hours <= 720) bucket=6; else if(hours <= 8760) bucket=24; else bucket=24*30 }

  const {labels,data} = aggregateData(start,end,bucket);

  if(state.chart) try{ state.chart.destroy(); }catch(e){}

  const theme = chartThemes[state.chartTheme] || chartThemes.green;
  const ctx = DOM.priceChartCanvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0,0,0,300);
  gradient.addColorStop(0,theme.gradient[0]); gradient.addColorStop(1,theme.gradient[1]);

  const chartType = (state.chartType === 'bar') ? 'bar' : 'line';
  const mainDataset = {
    label: 'Price',
    data,
    borderColor: theme.main,
    backgroundColor: state.chartType === 'filled' ? gradient : theme.main,
    tension: state.chartType !== 'bar' ? 0.15 : 0,
    pointRadius: 0,
    fill: state.chartType === 'filled'
  };

  const datasets = [ mainDataset ];

  // markers calc
  let dataMin = Infinity, dataMax = -Infinity, minIdx = -1, maxIdx = -1;
  data.forEach((v,i)=>{ if(v!==null && typeof v !== 'undefined'){ if(v < dataMin){ dataMin = v; minIdx = i } if(v > dataMax){ dataMax = v; maxIdx = i } } });

  if (state.showMarkers && minIdx >= 0 && maxIdx >= 0){
    const maxMarker = new Array(data.length).fill(null);
    const minMarker = new Array(data.length).fill(null);
    maxMarker[maxIdx] = data[maxIdx];
    minMarker[minIdx] = data[minIdx];
    datasets.push({ label:'Max', data: maxMarker, pointRadius:6, borderColor:'#2196f3', backgroundColor:'#2196f3', showLine:false, pointStyle:'circle', type:'line' });
    datasets.push({ label:'Min', data: minMarker, pointRadius:6, borderColor:'#f44336', backgroundColor:'#f44336', showLine:false, pointStyle:'circle', type:'line' });

    const timeOpts = { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' };
    DOM.maxPrice.innerText = (maxIdx>=0 && isFinite(dataMax)) ? `${formatCurrency(dataMax)} (${new Date((start + maxIdx*bucket + CONSTANTS.HOUR_OFFSET)*3600000).toLocaleString(state.currentLang, timeOpts)})` : '-';
    DOM.minPrice.innerText = (minIdx>=0 && isFinite(dataMin)) ? `${formatCurrency(dataMin)} (${new Date((start + minIdx*bucket + CONSTANTS.HOUR_OFFSET)*3600000).toLocaleString(state.currentLang, timeOpts)})` : '-';
  } else {
    DOM.maxPrice.innerText = '-';
    DOM.minPrice.innerText = '-';
  }

  // trades markers (squares)
  if(state.showTrades){
    const buyData = new Array(data.length).fill(null);
    const sellData = new Array(data.length).fill(null);
    const startHour = start;
    const bucketHours = bucket;
    state.tx.filter(t => t.type === 'buy' || t.type === 'sell').forEach(t => {
      const tradeHour = Math.floor(t.time / 3600000 - CONSTANTS.HOUR_OFFSET);
      if (tradeHour >= startHour && tradeHour <= end){
        const index = Math.floor((tradeHour - startHour) / bucketHours);
        if(index >= 0 && index < data.length){
          if(t.type === 'buy') buyData[index] = t.pricePer;
          else sellData[index] = t.pricePer;
        }
      }
    });
    datasets.push({ label:'Buys', data: buyData, pointRadius:8, pointStyle:'rect', pointBackgroundColor:'#4caf50', showLine:false, type:'line' });
    datasets.push({ label:'Sells', data: sellData, pointRadius:8, pointStyle:'rect', pointBackgroundColor:'#f44336', showLine:false, type:'line' });
  }

  let suggestedMin = undefined, suggestedMax = undefined;
  if(isFinite(dataMin) && isFinite(dataMax)){
    const pad = (dataMax - dataMin) * 0.08 || (Math.abs(dataMax) * 0.02) || 0.01;
    suggestedMin = dataMin - pad;
    suggestedMax = dataMax + pad;
  }

  state.chart = new Chart(ctx, {
    type: chartType,
    data: { labels, datasets },
    options: {
      responsive:true, maintainAspectRatio:false, interaction: { mode: 'index', intersect: false },
      plugins:{ legend:{display:false}, tooltip:{
          mode:'index', intersect:false, backgroundColor:'rgba(11,23,32,0.9)', titleColor:'#fff', bodyColor:'#fff',
          titleFont:{size:14, weight:'bold'}, bodyFont:{size:12}, padding:10, cornerRadius:8, displayColors:false,
          callbacks:{ label: ctx => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}` }
        }},
      scales:{
        x:{ display:true, grid:{ drawOnChartArea:false, color:'rgba(0,0,0,0.05)' }, ticks:{ color:'var(--muted)', font:{ size:11 } } },
        y:{ ticks:{ callback: v => Number(v).toFixed(5), color:'var(--muted)', font:{ size:11 } }, grid:{ color:'rgba(0,0,0,0.05)' }, suggestedMin, suggestedMax }
      }
    }
  });

  // period delta
  const fl = firstLastNonNull(data);
  if(fl.first !== null && fl.last !== null){
    const delta = fl.last - fl.first;
    const pct = fl.first !== 0 ? (delta / fl.first) * 100 : 0;
    const sign = delta >= 0 ? '+' : '';
    const color = delta >= 0 ? 'green' : 'red';
    DOM.periodChange.innerText = `${sign}${delta.toFixed(5)}$ (${sign}${pct.toFixed(2)}%)`;
    DOM.periodChange.style.color = color;
  } else {
    DOM.periodChange.innerText = '';
  }
}

/* -------------------------
   Transactions
   ------------------------- */
function addTx(type, amount, pricePer){
  const tx = { id: 'tx_'+Date.now(), type, amount, pricePer, total: amount*pricePer, time: Date.now() };
  state.tx.unshift(tx);
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.tx, JSON.stringify(state.tx));
  renderTxs();
}
function renderTxs(){
  DOM.txList.innerHTML='';
  const filtered = state.tx.filter(t => t.type === 'buy' || t.type === 'sell');
  filtered.forEach(t=>{
    const div=document.createElement('div'); div.className='tx-item';
    const when = new Date(t.time).toLocaleString(state.currentLang,{ year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' });
    if(t.type==='buy'){
      div.innerHTML = `<div><span class="type-buy">${T[state.currentLang].buy.toUpperCase()}</span> ${t.amount.toFixed(5)} YarikCoin — ${T[state.currentLang].for} ${t.total.toFixed(5)}$</div><div class="small-muted">(${when})</div>`;
    } else {
      div.innerHTML = `<div><span class="type-sell">${T[state.currentLang].sell.toUpperCase()}</span> ${t.amount.toFixed(5)} YarikCoin — ${T[state.currentLang].received} ${t.total.toFixed(5)}$</div><div class="small-muted">(${when})</div>`;
    }
    DOM.txList.appendChild(div);
  });
}

/* -------------------------
   Orders + offline processing
   ------------------------- */
function saveOrders(){ localStorage.setItem(CONSTANTS.STORAGE_KEYS.orders, JSON.stringify(state.orders)); renderOrders(); }
function renderOrders(){
  DOM.ordersList.innerHTML='';
  if(state.orders.length===0){ DOM.ordersList.innerHTML = `<div class="small-muted">${T[state.currentLang].noOrders}</div>`; return; }
  state.orders.forEach(o=>{
    const d=document.createElement('div'); d.className='order-item';
    const when = new Date(o.time).toLocaleString(state.currentLang,{year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit'});
    const badgeText = o.type==='buy' ? T[state.currentLang].buy.toUpperCase() : T[state.currentLang].sell.toUpperCase();
    const badgeClass = o.type==='buy' ? 'order-buy' : 'order-sell';
    d.innerHTML = `<div><span class="order-badge ${badgeClass}">${badgeText}</span> ${o.amount} YarikCoin за ${o.price.toFixed(5)}$ — (${when})</div><button class="cancel-order-btn" data-order-id="${o.id}">×</button>`;
    DOM.ordersList.appendChild(d);
  });
}

function processOfflineOrders(){
  const lastSeenHour = parseInt(localStorage.getItem(CONSTANTS.STORAGE_KEYS.lastHour) || getCurrentHour());
  const nowHour = getCurrentHour();
  const notifications = [];

  if (nowHour <= lastSeenHour) {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.lastHour, String(nowHour));
    return;
  }

  for (let hour = lastSeenHour; hour < nowHour; hour++) {
    if (hour < 0 || hour >= price.length) continue;
    const histPrice = price[hour];
    if (typeof histPrice === 'undefined' || histPrice === null) continue;

    const remaining = [];
    let changed = false;

    state.orders.forEach(order => {
      let filled = false;
      if (order.type === 'buy') {
        if (histPrice <= order.price) {
          const cost = order.amount * order.price;
          if (state.balance >= cost) {
            state.balance -= cost;
            state.coinBalance += order.amount;
            addTx('buy', order.amount, order.price);
            filled = true; changed = true;
            notifications.push(`${T[state.currentLang].buy} order for ${order.amount.toFixed(5)} filled @ ${order.price.toFixed(5)}$`);
          } else {
            remaining.push(order);
          }
        } else {
          remaining.push(order);
        }
      } else if (order.type === 'sell') {
        if (histPrice >= order.price) {
          if (state.coinBalance >= order.amount) {
            state.coinBalance -= order.amount;
            state.balance += order.amount * order.price;
            addTx('sell', order.amount, order.price);
            filled = true; changed = true;
            notifications.push(`${T[state.currentLang].sell} order for ${order.amount.toFixed(5)} filled @ ${order.price.toFixed(5)}$`);
          } else {
            remaining.push(order);
          }
        } else {
          remaining.push(order);
        }
      } else {
        remaining.push(order);
      }
    });

    if (changed) {
      state.orders = remaining;
      saveOrders();
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.balance, state.balance);
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.coinBalance, state.coinBalance);
      updateBalanceUI();
    }
  }

  localStorage.setItem(CONSTANTS.STORAGE_KEYS.lastHour, String(nowHour));
  if (notifications.length > 0) notifications.forEach(msg => showNotification(msg));
}

/* -------------------------
   Miner
   ------------------------- */
function minerCoinsPerSecond(level) { if(level <= 0) return 0; return 0.001 * Math.pow(1.8, level - 1); }
function minerNextCost(level){ return 25 * Math.pow(4, Math.max(0, level)); }
function minerAvgTimePerCoin(level){ const pps = minerCoinsPerSecond(level); if(pps <= 0) return Infinity; return 1 / pps; }
function initMinerUI(){ DOM.minerLevel.innerText = state.miner.level; DOM.minerNextCost.innerText = minerNextCost(state.miner.level) + '$'; DOM.minerTotalMined.innerText = (state.miner.totalMined || 0).toFixed(5); const avg = minerAvgTimePerCoin(state.miner.level); if(isFinite(avg)){ if(avg > 3600*5){ DOM.minerAvgTime.innerText = `${Math.round(avg)}s (${Math.round(avg/60)} min, ${Math.round(avg/3600)} h)` } else if(avg > 600){ DOM.minerAvgTime.innerText = `${Math.round(avg)}s (${Math.round(avg/60)} min)` } else { DOM.minerAvgTime.innerText = `${Math.round(avg)}s` } } else DOM.minerAvgTime.innerText = '—'; }
function handleOfflineMining(){ const last = state.miner.lastSeen || Date.now(); const secsAway = Math.floor((Date.now() - last)/1000); if(secsAway > 0){ const expected = secsAway * minerCoinsPerSecond(state.miner.level); if(expected > 0){ state.miner.totalMined = (state.miner.totalMined || 0) + expected; localStorage.setItem(CONSTANTS.STORAGE_KEYS.minerTotal, String(state.miner.totalMined)); } } state.miner.lastSeen = Date.now(); localStorage.setItem(CONSTANTS.STORAGE_KEYS.minerLastSeen, String(state.miner.lastSeen)); }
function minerUpgrade(){ const nextCost = minerNextCost(state.miner.level); if(state.balance < nextCost){ alert(T[state.currentLang].notEnoughFunds); return } state.balance -= nextCost; state.miner.level += 1; localStorage.setItem(CONSTANTS.STORAGE_KEYS.balance, state.balance); localStorage.setItem(CONSTANTS.STORAGE_KEYS.minerLevel, String(state.miner.level)); initMinerUI(); updateBalanceUI(); showNotification(T[state.currentLang].upgrade + ' OK'); }
function minerClaim(){ const amt = state.miner.totalMined || 0; if(amt>0){ state.coinBalance += amt; state.miner.totalMined = 0; localStorage.setItem(CONSTANTS.STORAGE_KEYS.minerTotal,'0'); localStorage.setItem(CONSTANTS.STORAGE_KEYS.coinBalance, state.coinBalance); initMinerUI(); updateBalanceUI(); showNotification(T[state.currentLang].claim + ' OK'); } }
function startMinerOnline(){ setInterval(()=>{ const inc = minerCoinsPerSecond(state.miner.level); if (inc > 0){ state.miner.totalMined = (state.miner.totalMined || 0) + inc; localStorage.setItem(CONSTANTS.STORAGE_KEYS.minerTotal, String(state.miner.totalMined)); initMinerUI(); } }, 1000); }

/* -------------------------
   Work (Jobs)
   ------------------------- */
function updateJobsUI(){
  const cur = jobs.find(j => j.id === (state.currentJob || 0)) || jobs[0];
  const next = jobs.find(j => j.id === (state.currentJob || 0) + 1);
  const jobDetails = DOM.workContent.querySelector('#jobDetails');

  if (cur.id === 0) {
    jobDetails.style.display = 'none';
    DOM.workHint.style.display = 'block';
    DOM.workHint.innerText = T[state.currentLang].work_hint_initial;
  } else {
    jobDetails.style.display = 'block';
    DOM.workHint.style.display = 'none';
  }

  DOM.currentJob.innerText = cur.name[state.currentLang];
  DOM.nextJob.innerText = next ? `${next.name[state.currentLang]} (${next.cost}$)` : '-';
  DOM.accSalary.innerText = (state.jobAccum || 0).toFixed(5) + '$';
  const daily = cur.daily || 0;
  const hourly = daily / 24;
  DOM.jobEarnings.innerText = `${daily.toFixed(5)}$ / ${hourly.toFixed(5)}$`;
  DOM.hireNextJob.style.display = next ? 'block' : 'none';
}

function hireNextJob(){
  const next = jobs.find(j => j.id === (state.currentJob || 0) + 1);
  if(!next){ alert(state.currentLang==='ru' ? 'Нет следующей работы' : 'No next job'); return; }
  if(state.balance < next.cost){ alert(T[state.currentLang].notEnoughFunds); return; }
  state.balance -= next.cost;
  state.currentJob = next.id;
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.balance, state.balance);
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.currentJob, String(state.currentJob));
  updateBalanceUI();
  updateJobsUI();
  showNotification(next.name[state.currentLang] + ' hired');
}

function startWorkEarnings(){
  setInterval(()=>{
    const cur = jobs.find(j => j.id === (state.currentJob || 0)) || jobs[0];
    if(cur && cur.daily && cur.daily > 0){
      const perSec = cur.daily / 86400;
      state.jobAccum = (state.jobAccum || 0) + perSec;
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.jobAccum, String(state.jobAccum));
      updateJobsUI();
    }
  }, 1000);
}

/* -------------------------
   Trade UI
   ------------------------- */
function openTrade(type){
  DOM.tradeTitle.innerText = type==='buy' ? (state.currentLang==='ru' ? 'Купить YarikCoin' : 'Buy YarikCoin') : (state.currentLang==='ru' ? 'Продать YarikCoin' : 'Sell YarikCoin');
  DOM.tradeLabel.innerText = type==='buy' ? (state.currentLang==='ru' ? 'Количество для покупки:' : 'Amount to buy:') : (state.currentLang==='ru' ? 'Количество для продажи:' : 'Amount to sell:');
  DOM.confirmTradeBtn.innerText = T[state.currentLang].confirm;
  DOM.confirmTradeBtn.className = type==='buy' ? 'btn btn-buy' : 'btn btn-sell';
  DOM.tradeAmount.value='';
  state.pendingTradeType = type;
  updateTradeInfo();
  openModal(DOM.tradeModal);
  DOM.tradeAmount.focus();
}
function updateTradeInfo(){
  const v=parseFloat(DOM.tradeAmount.value);
  const maxBuy = state.currentPrice>0 ? (state.balance/state.currentPrice) : 0;
  const maxSell = state.coinBalance;
  if(!v||v<=0){
    if(state.pendingTradeType==='buy') DOM.tradeInfo.innerText = `${state.currentLang==='ru' ? 'Макс к покупке:' : 'Max to buy:'} ${maxBuy.toFixed(5)} YarikCoin`;
    else DOM.tradeInfo.innerText = `${state.currentLang==='ru' ? 'Макс к продаже:' : 'Max to sell:'} ${maxSell.toFixed(5)} YarikCoin`;
    return;
  }
  if(state.pendingTradeType==='buy'){ const cost=v*state.currentPrice; DOM.tradeInfo.innerText = `${state.currentLang==='ru' ? 'Стоимость:' : 'Cost:'} ${formatCurrency(cost)} (${state.currentLang==='ru' ? 'Макс:' : 'Max:'} ${maxBuy.toFixed(5)})` }
  else { const gain=v*state.currentPrice; DOM.tradeInfo.innerText = `${state.currentLang==='ru' ? 'Вы получите:' : 'You will receive:'} ${formatCurrency(gain)} (${state.currentLang==='ru' ? 'Макс:' : 'Max:'} ${maxSell.toFixed(5)})` }
}
function confirmTrade(){
  const v=parseFloat(DOM.tradeAmount.value);
  if(!v||v<=0){ alert(T[state.currentLang].invalidOrderData); return; }
  if(state.pendingTradeType==='buy'){
    const cost=v*state.currentPrice;
    if(cost>state.balance){ alert(T[state.currentLang].notEnoughFunds); return; }
    state.balance -= cost; state.coinBalance += v; addTx('buy', v, state.currentPrice);
  } else {
    if(v>state.coinBalance){ alert(T[state.currentLang].notEnoughYarikCoin); return; }
    state.coinBalance -= v; state.balance += v*state.currentPrice; addTx('sell', v, state.currentPrice);
  }
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.balance, state.balance);
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.coinBalance, state.coinBalance);
  updateBalanceUI(); closeModal(DOM.tradeModal);
}

function openModal(modal){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false') }
function closeModal(modal){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true') }

/* -------------------------
   Language + init
   ------------------------- */
function setLanguage(lang){
  state.currentLang = lang;
  localStorage.setItem(CONSTANTS.STORAGE_KEYS.language, lang);

  // static translations map
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const map = {
      'brand.title': { en: 'YarikCoin', ru: 'YarikCoin' },
      'brand.subtitle': { en: 'Version 2.0', ru: 'Версия 2.0' },
      'title.main': { en: 'YarikCoin', ru: 'YarikCoin' }, 'price.label': { en: 'Price:', ru: 'Цена:' },
      'shop.label': { en: 'Shop:', ru: 'Магазин:' }, 'shop.hint': { en: 'Use balance to buy and sell', ru: 'Используйте баланс для покупки и продажи' },
      'balance.label': { en: 'Balance:', ru: 'Баланс:' }, 'onbalance.label': { en: 'YarikCoin on balance:', ru: 'YarikCoin на балансе:' },
      'history.before': { en: 'Chart:', ru: 'График:' }, 'history.max_period': { en: 'Max price in period:', ru: 'Макс. цена за период:' },
      'history.min_period': { en: 'Min price in period:', ru: 'Мин. цена за период:' }, 'transactions.title': { en: 'Transactions', ru: 'Транзакции' },
      'transactions.hint': { en: 'Your buy/sell history', ru: 'История ваших покупок/продаж' }, 'orders.title': { en: 'Orders', ru: 'Ордеры' },
      'orders.type': { en: 'Type', ru: 'Тип' }, 'orders.amount': { en: 'Amount', ru: 'Количество' },
      'orders.price': { en: 'Price (per 1 coin)', ru: 'Цена (за 1 монету)' }, 'miner.title': { en: 'Miner', ru: 'Майнер' },
      'miner.hint': { en: 'Upgrade miner to start earning', ru: 'Улучшите майнер, чтобы начать добычу' },
      'miner.level': { en: 'Level: ', ru: 'Уровень: ' }, 'miner.next_cost': { en: 'Next level cost: ', ru: 'Цена след. уровня: ' },
      'miner.total': { en: 'Total mined: ', ru: 'Всего добыто: ' }, 'miner.avg': { en: 'Average time per coin: ', ru: 'Среднее время на монету: ' },
      'settings.title': { en: 'Settings', ru: 'Настройки' }, 'settings.volume': { en: 'Volume', ru: 'Громкость' }, 'settings.language': { en: 'Language', ru: 'Язык' },
      'chart.period': { en: 'Period', ru: 'Период' },
      'chart.granularity': { en: 'Granularity', ru: 'Детализация' }, 'chart.type': { en: 'Type', ru: 'Тип' }, 'chart.theme': { en: 'Theme', ru: 'Тема' }, 'chart.options': { en: 'Options', ru: 'Опции' },
      'work.title': { en: 'Job', ru: 'Работа' },
      'work.hint': { en: 'Get a job to start earning', ru: 'Наймитесь на работу, чтобы начать зарабатывать' },
      'work.current': { en: 'Current job:', ru: 'Текущая работа:' },
      'work.next': { en: 'Next job:', ru: 'Следующая работа:' },
      'work.accumulated': { en: 'Accumulated salary:', ru: 'Накопленная зарплата:' },
      'work.earn': { en: 'Earn (per day / hour):', ru: 'Зарплата (день / час):' },
      'work.hire': { en: 'Hire next job', ru: 'Получить следующую работу' },
      'button.buy': { en: T.en.buy, ru: T.ru.buy }, 'button.sell': { en: T.en.sell, ru: T.ru.sell },
      'button.clear': { en: T.en.clear, ru: T.ru.clear }, 'button.cancelAll': { en: T.en.cancelAll, ru: T.ru.cancelAll },
      'button.place': { en: T.en.place, ru: T.ru.place }, 'button.upgrade': { en: T.en.upgrade, ru: T.ru.upgrade },
      'button.claim': { en: T.en.claim, ru: T.ru.claim }, 'button.close': { en: T.en.close, ru: T.ru.close },
      'button.cancel': { en: T.en.cancel, ru: T.ru.cancel }, 'button.confirm': { en: T.en.confirm, ru: T.ru.confirm },
      'gr.auto': {en: T.en.gr_auto, ru: T.ru.gr_auto}, 'gr.hour': {en: T.en.gr_hour, ru: T.ru.gr_hour}, 'gr.day': {en: T.en.gr_day, ru: T.ru.gr_day}, 'gr.month': {en: T.en.gr_month, ru: T.ru.gr_month},
      'period.1d': {en: T.en.p_1d, ru: T.ru.p_1d}, 'period.1w': {en: T.en.p_1w, ru: T.ru.p_1w}, 'period.1m': {en: T.en.p_1m, ru: T.ru.p_1m}, 'period.1y': {en: T.en.p_1y, ru: T.ru.p_1y}, 'period.all': {en: T.en.p_all, ru: T.ru.p_all},
      'type.line': {en: T.en.line, ru: T.ru.line}, 'type.bar': {en: T.en.bar, ru: T.ru.bar}, 'type.filled': {en: T.en.filled, ru: T.ru.filled},
      'theme.green': {en: T.en.green, ru: T.ru.green}, 'theme.blue': {en: T.en.blue, ru: T.ru.blue}, 'theme.red': {en: T.en.red, ru: T.ru.red}, 'theme.purple': {en: T.en.purple, ru: T.ru.purple},
      'options.markers': {en: T.en.markers, ru: T.ru.markers}, 'options.trades': {en: T.en.trades, ru: T.ru.trades},
    };
    if(map[key] && map[key][lang]) el.innerText = map[key][lang];
  });

  // update some grouped selectors
  document.querySelectorAll('.chart-type-btn').forEach(b => { const t = b.dataset.type; if(t==='line') b.innerText = T[lang].line; if(t==='bar') b.innerText = T[lang].bar; if(t==='filled') b.innerText = T[lang].filled; });
  document.querySelectorAll('.chart-theme-btn').forEach(b => { const t = b.dataset.theme; b.innerText = T[lang][t] || b.innerText; });
  document.querySelectorAll('.gran-btn').forEach(b=>{ const g = b.dataset.gr; if(g==='auto') b.innerText = T[lang].gr_auto; if(g==='hour') b.innerText = T[lang].gr_hour; if(g==='day') b.innerText = T[lang].gr_day; if(g==='month') b.innerText = T[lang].gr_month; });
  document.querySelectorAll('.time-btn').forEach(b=>{ const h = b.dataset.hours; if(h==='24') b.innerText = T[lang].p_1d; if(h==='168') b.innerText = T[lang].p_1w; if(h==='720') b.innerText = T[lang].p_1m; if(h==='8760') b.innerText = T[lang].p_1y; if(h==='999999') b.innerText = T[lang].p_all; });
  // chart options translations
  document.querySelectorAll('.chart-option-btn').forEach(btn => {
    const opt = btn.dataset.option;
    if(opt === 'markers') btn.innerText = T[lang].markers;
    if(opt === 'trades') btn.innerText = T[lang].trades;
  });

  // orders buy/sell labels
  DOM.orderTypeSelector.querySelector('[data-type="buy"]').innerText = T[lang].buy;
  DOM.orderTypeSelector.querySelector('[data-type="sell"]').innerText = T[lang].sell;

  // language switch UI
  Array.from(DOM.languageSwitch.querySelectorAll('.lang-btn')).forEach(b=>{ b.classList.toggle('active', b.dataset.lang===lang) });

  // tabs
  DOM.tabMiner.innerText = T[lang].tab_miner;
  DOM.tabWork.innerText = T[lang].tab_work;

  // work block
  document.querySelectorAll('[data-i18n]').forEach(()=>{}); // ensure reflow
  DOM.clearTxBtn.innerText = T[lang].clear;
  DOM.cancelAllOrders.innerText = T[lang].cancelAll;
  DOM.placeOrder.innerText = T[lang].place;
  DOM.hireNextJob && (DOM.hireNextJob.innerText = T[lang].hire);

  updateJobsUI();
  renderTxs();
  renderOrders();
  renderChartFor(state.viewHours, state.viewStartHour);
}

/* -------------------------
   Pan & init
   ------------------------- */
function panBy(direction, amount) {
  const now = getCurrentHour();
  let newStartHour = (state.viewStartHour || (now - state.viewHours + 1)) + (direction === 'left' ? -amount : amount);
  newStartHour = Math.max(0, newStartHour);
  newStartHour = Math.min(newStartHour, now - state.viewHours + 1);
  renderChartFor(state.viewHours, newStartHour);
}
function panRange(direction){
  let shift = 0;
  const gr = state.granularity;
  if (gr === 'hour') shift = 1;
  else if (gr === 'day') shift = 24;
  else if (gr === 'month') shift = 24 * 30;
  else shift = Math.max(1, Math.floor(state.viewHours / 4));
  panBy(direction, shift);
}
function panPeriod(direction) { panBy(direction, state.viewHours); }

function init(){
  // restore active tab
  if(state.activeTab === 'work'){ DOM.minerContent.style.display='none'; DOM.workContent.style.display='block'; DOM.tabWork.classList.add('active'); DOM.tabMiner.classList.remove('active'); }
  else { DOM.minerContent.style.display='block'; DOM.workContent.style.display='none'; DOM.tabMiner.classList.add('active'); DOM.tabWork.classList.remove('active'); }

  DOM.tabMiner.addEventListener('click', ()=>{ DOM.minerContent.style.display='block'; DOM.workContent.style.display='none'; DOM.tabMiner.classList.add('active'); DOM.tabWork.classList.remove('active'); state.activeTab='miner'; localStorage.setItem(CONSTANTS.STORAGE_KEYS.activeTab, state.activeTab); });
  DOM.tabWork.addEventListener('click', ()=>{ DOM.minerContent.style.display='none'; DOM.workContent.style.display='block'; DOM.tabWork.classList.add('active'); DOM.tabMiner.classList.remove('active'); state.activeTab='job'; localStorage.setItem(CONSTANTS.STORAGE_KEYS.activeTab, state.activeTab); });

  // language
  setLanguage(state.currentLang);
  DOM.languageSwitch.querySelectorAll('.lang-btn').forEach(b => { b.addEventListener('click', ()=>{ setLanguage(b.dataset.lang); }); });

  // volume
  DOM.volumeControl.value = state.volume;
  DOM.volumeControl.addEventListener('input', e=>{ state.volume = parseFloat(e.target.value); localStorage.setItem(CONSTANTS.STORAGE_KEYS.volume, state.volume); DOM.mainMusic.volume = state.volume; });
  DOM.mainMusic.volume = state.volume;
  DOM.mainMusic.load();

  const nowHour = getCurrentHour();
  state.currentPrice = price[nowHour] ?? 0;
  DOM.price.innerText = formatCurrency(state.currentPrice);

  processOfflineOrders();
  updateBalanceUI();
  renderTxs();
  renderOrders();

  // time selector
  DOM.timeSelector.querySelectorAll('.time-btn').forEach(btn=>{ btn.addEventListener('click', e=>{ e.preventDefault(); btn.blur(); try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; const hoursRaw = parseInt(btn.dataset.hours); let hours = hoursRaw; let startHour = null; const now = getCurrentHour(); if (hoursRaw === 999999) { startHour = 0; hours = now + 1; } else { hours = Math.min(hoursRaw, now + 1); } localStorage.setItem(CONSTANTS.STORAGE_KEYS.chartHours, hours); DOM.timeSelector.querySelectorAll('.time-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); if ( (state.granularity === 'day' && hours <= 24) || (state.granularity === 'month' && hours < 24 * 30) ) { state.granularity = 'auto'; localStorage.setItem(CONSTANTS.STORAGE_KEYS.chartGranularity, 'auto'); DOM.granularity.querySelectorAll('.gran-btn').forEach(b => b.classList.remove('active')); DOM.granularity.querySelector('[data-gr="auto"]').classList.add('active'); } renderChartFor(hours, startHour); }) });

  // granularity
  state.granularityBtns = Array.from(document.querySelectorAll('.gran-btn'));
  state.granularityBtns.forEach(b=>{ b.addEventListener('click', e=>{ e.preventDefault(); b.blur(); if(b.disabled) return; state.granularity = b.dataset.gr; localStorage.setItem(CONSTANTS.STORAGE_KEYS.chartGranularity, state.granularity); state.granularityBtns.forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderChartFor(state.viewHours, state.viewStartHour); }) });

  // chart controls
  DOM.chartTypeSelector.querySelectorAll('.chart-type-btn').forEach(btn => { btn.addEventListener('click', () => { state.chartType = btn.dataset.type; localStorage.setItem(CONSTANTS.STORAGE_KEYS.chartType, state.chartType); DOM.chartTypeSelector.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderChartFor(state.viewHours, state.viewStartHour); }); });
  DOM.chartThemeSelector.querySelectorAll('.chart-theme-btn').forEach(btn => { btn.addEventListener('click', () => { state.chartTheme = btn.dataset.theme; localStorage.setItem(CONSTANTS.STORAGE_KEYS.chartTheme, state.chartTheme); DOM.chartThemeSelector.querySelectorAll('.chart-theme-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderChartFor(state.viewHours, state.viewStartHour); }); });
  DOM.chartOptionsSelector.querySelectorAll('.chart-option-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const option = e.target.dataset.option;
      if (option === 'markers') state.showMarkers = !state.showMarkers;
      if (option === 'trades') state.showTrades = !state.showTrades;
      e.target.classList.toggle('active');
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.showMarkers, String(state.showMarkers));
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.showTrades, String(state.showTrades));
      renderChartFor(state.viewHours, state.viewStartHour);
    });
  });

  DOM.timeSelector.querySelector(`[data-hours="${state.viewHours}"]`)?.classList.add('active');
  DOM.granularity.querySelector(`[data-gr="${state.granularity}"]`)?.classList.add('active');
  DOM.chartTypeSelector.querySelector(`[data-type="${state.chartType}"]`)?.classList.add('active');
  DOM.chartThemeSelector.querySelector(`[data-theme="${state.chartTheme}"]`)?.classList.add('active');
  if(state.showMarkers) DOM.chartOptionsSelector.querySelector(`[data-option="markers"]`)?.classList.add('active');
  if(state.showTrades) DOM.chartOptionsSelector.querySelector(`[data-option="trades"]`)?.classList.add('active');

  DOM.prevRangeBtn.addEventListener('click', e=>{ e.preventDefault(); e.target.blur(); panRange('left') });
  DOM.nextRangeBtn.addEventListener('click', e=>{ e.preventDefault(); e.target.blur(); panRange('right') });
  DOM.prevPeriodBtn.addEventListener('click', e=>{ e.preventDefault(); e.target.blur(); panPeriod('left') });
  DOM.nextPeriodBtn.addEventListener('click', e=>{ e.preventDefault(); e.target.blur(); panPeriod('right') });

  // buy/sell
  DOM.buyBtn.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; openTrade('buy') });
  DOM.sellBtn.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; openTrade('sell') });
  DOM.confirmTradeBtn.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; confirmTrade() });
  DOM.cancelTradeBtn.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; closeModal(DOM.tradeModal) });
  DOM.tradeAmount.addEventListener('input', updateTradeInfo);

  // settings
  DOM.settingsBtn.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; openModal(DOM.settingsModal) });
  DOM.closeSettings.addEventListener('click', ()=>{ try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{}; closeModal(DOM.settingsModal) });
  DOM.settingsModal.addEventListener('click', e=>{ if(e.target===DOM.settingsModal) closeModal(DOM.settingsModal) });

  // order type
  DOM.orderTypeSelector.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      try{ DOM.clickSound.currentTime=0; DOM.clickSound.play() }catch{};
      const type = btn.dataset.type;
      state.currentOrderType = type;
      DOM.orderTypeSelector.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const placeBtn = DOM.placeOrder;
      placeBtn.classList.remove('btn-buy', 'btn-sell');
      placeBtn.classList.add(type === 'buy' ? 'btn-buy' : 'btn-sell');
    });
  });
  DOM.orderTypeSelector.querySelector(`[data-type="${state.currentOrderType}"]`)?.classList.add('active');

  DOM.placeOrder.addEventListener('click', ()=>{
    const type = state.currentOrderType;
    const amount = parseFloat(DOM.orderAmount.value);
    const priceVal = parseFloat(DOM.orderPrice.value);
    if(!amount || amount <= 0 || !priceVal || priceVal <= 0){ alert(T[state.currentLang].invalidOrderData); return; }
    if (type === 'buy') {
      if (priceVal >= state.currentPrice) { alert(T[state.currentLang].buyPriceLow); return; }
      if (amount * priceVal > state.balance) { alert(T[state.currentLang].notEnoughFunds); return; }
    } else {
      if (priceVal <= state.currentPrice) { alert(T[state.currentLang].sellPriceHigh); return; }
      if (amount > state.coinBalance) { alert(T[state.currentLang].notEnoughYarikCoin); return; }
    }
    const o = { id:'ord_'+Date.now(), type, amount, price:priceVal, time:Date.now() };
    state.orders.unshift(o);
    saveOrders();
    DOM.orderAmount.value=''; DOM.orderPrice.value='';
  });
  DOM.cancelAllOrders.addEventListener('click', ()=>{ state.orders=[]; saveOrders(); });

  DOM.clearTxBtn.addEventListener('click', () => {
    if (confirm(T[state.currentLang].confirmClearTx)) {
      state.tx = [];
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.tx, '[]');
      renderTxs();
    }
  });

  DOM.ordersList.addEventListener('click', e => {
    if (e.target.classList.contains('cancel-order-btn')) {
      const orderId = e.target.dataset.orderId;
      state.orders = state.orders.filter(o => o.id !== orderId);
      saveOrders();
    }
  });

  // miner/work actions
  DOM.minerUpgrade.addEventListener('click', minerUpgrade);
  DOM.minerClaim.addEventListener('click', minerClaim);
  DOM.hireNextJob && DOM.hireNextJob.addEventListener('click', hireNextJob);

  // sound start on gesture
  DOM.clickSound.load();
  document.body.addEventListener('click', e=>{ DOM.mainMusic.play().catch(()=>{}); }, { once:true });

  // init miner & jobs
  initMinerUI();
  handleOfflineMining();
  startMinerOnline();
  startWorkEarnings();

  processOfflineOrders();

  renderChartFor(state.viewHours, state.viewStartHour);
  document.addEventListener('click', e=>{ if(e.target.tagName==='BUTTON') e.target.blur() });
}

document.addEventListener('DOMContentLoaded', init);