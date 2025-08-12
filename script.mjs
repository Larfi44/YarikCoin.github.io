import price from "./data/price.mjs";
const translations = {
  "brand.title":{en:"YarikCoin",ru:"YarikCoin"},
  "brand.subtitle":{en:"Simple demo coin",ru:"Демонстрационный проект"},
  "title.main":{en:"YarikCoin",ru:"YarikCoin"},
  "price.label":{en:"Price:",ru:"Цена:"},
  "shop.label":{en:"Shop:",ru:"Магазин:"},
  "shop.hint":{en:"Use balance to buy and sell",ru:"Используйте баланс для покупки и продажи"},
  "button.buy":{en:"Buy",ru:"Купить"},
  "button.sell":{en:"Sell",ru:"Продать"},
  "balance.label":{en:"Balance:",ru:"Баланс:"},
  "onbalance.label":{en:"YarikCoin on balance:",ru:"YarikCoin на балансе:"},
  "history.label":{en:"History:",ru:"История:"},
  "history.release":{en:"Release date: April 21, 2025",ru:"Дата релиза: 21 апреля 2025"},
  "history.start":{en:"Start price: 0.4$",ru:"Стартовая цена: 0.4$"},
  "history.max":{en:"Max price:",ru:"Максимальная цена:"},
  "history.min":{en:"Min price:",ru:"Минимальная цена:"},
  "history.before":{en:"Price before:",ru:"Цена ранее:"},
  "time.hour":{en:"Hour ago",ru:"Час назад"},
  "time.3h":{en:"3 hours ago",ru:"3 часа назад"},
  "time.12h":{en:"12 hours ago",ru:"12 часов назад"},
  "time.24h":{en:"Day ago",ru:"День назад"},
  "time.3d":{en:"3 days ago",ru:"3 дня назад"},
  "time.week":{en:"Week ago",ru:"Неделя назад"},
  "time.2w":{en:"2 weeks ago",ru:"2 недели назад"},
  "time.month":{en:"Month ago",ru:"Месяц назад"},
  "time.3m":{en:"3 months ago",ru:"3 месяца назад"},
  "time.6m":{en:"6 months ago",ru:"6 месяцев назад"},
  "time.year":{en:"Year ago",ru:"Год назад"},
  "about.title":{en:"About",ru:"О проекте"},
  "about.text":{en:"Demo project. Replace assets/audio as needed.",ru:"Демонстрационный проект. Замените файлы при необходимости."},
  "settings.preview":{en:"Settings preview",ru:"Превью настроек"},
  "settings.title":{en:"Settings",ru:"Настройки"},
  "volume.label":{en:"Volume",ru:"Громкость"},
  "language.label":{en:"Language:",ru:"Язык:"}
};
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const languageSelect = document.getElementById('language');
const languageModal = document.getElementById('languageModal');
const volumeControl = document.getElementById('volumeControl');
const volumeControlModal = document.getElementById('volumeControlModal');
const mainMusic = document.getElementById('mainMusic');
const clickSound = document.getElementById('clickSound');
clickSound.load();
mainMusic.load();
function applyTranslations(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const t = translations[key];
    if(!t) return;
    el.innerText = t[lang] ?? t.en;
  });
}
function saveLang(lang){
  localStorage.setItem('siteLang',lang);
}
function getSavedLang(){
  const s = localStorage.getItem('siteLang');
  return s ? s : 'en';
}
const currentHour = Math.floor(Date.now()/3600000 - 484788);
const nowPrice = (price[currentHour] ?? 0).toFixed(5);
document.getElementById('price').innerText = nowPrice + '$';
function initPriceStats(){
  let maxPrice = price[0] ?? 0;
  let minPrice = price[0] ?? 0;
  for(let i=1;i<=currentHour;i++){
    if(price[i] > maxPrice) maxPrice = price[i];
    if(price[i] < minPrice) minPrice = price[i];
  }
  document.getElementById('maxPrice').innerText = maxPrice.toFixed(5) + '$';
  document.getElementById('minPrice').innerText = minPrice.toFixed(5) + '$';
}
initPriceStats();
function initBalance(){
  let balance = localStorage.getItem('balance');
  if(balance === null){
    balance = 100;
    localStorage.setItem('balance',String(balance));
  }
  document.getElementById('balance').innerText = Math.abs(parseFloat(balance)).toFixed(5) + '$';
  let onBalance = localStorage.getItem('onBalance');
  if(onBalance === null){
    onBalance = 0;
    localStorage.setItem('onBalance',String(onBalance));
  }
  document.getElementById('onBalance').innerText = onBalance;
  return {balance:parseFloat(balance),onBalance:parseFloat(onBalance)};
}
const state = initBalance();
function updatePriceDisplay(hours,periodName){
  const priceIndex = currentHour - hours;
  const selectedPriceElement = document.getElementById('selectedPrice');
  const priceChangeElement = document.getElementById('priceChange');
  const periodLabelElement = document.getElementById('selectedPeriodLabel');
  periodLabelElement.textContent = periodName + ':';
  if(priceIndex < 0){
    selectedPriceElement.textContent = '0.00000$';
    priceChangeElement.textContent = '';
    return;
  }
  const oldPrice = price[priceIndex] ?? 0;
  selectedPriceElement.textContent = oldPrice.toFixed(5) + '$';
  const change = parseFloat(nowPrice) - oldPrice;
  if(change >= 0){
    priceChangeElement.textContent = '(+' + change.toFixed(5) + '$)';
    priceChangeElement.style.color = 'green';
  } else {
    priceChangeElement.textContent = '(' + change.toFixed(5) + '$)';
    priceChangeElement.style.color = 'red';
  }
}
document.querySelectorAll('.time-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.time-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const hours = parseInt(this.dataset.hours);
    const periodName = this.innerText;
    updatePriceDisplay(hours,periodName);
  });
});
document.querySelector('.time-btn.active')?.click();
function openSettings(){
  settingsModal.classList.add('open');
  settingsModal.setAttribute('aria-hidden','false');
}
function closeSettingsFn(){
  settingsModal.classList.remove('open');
  settingsModal.setAttribute('aria-hidden','true');
}
settingsBtn.addEventListener('click',()=>{clickSound.currentTime=0;clickSound.play();openSettings();});
closeSettings.addEventListener('click',()=>{clickSound.currentTime=0;clickSound.play();closeSettingsFn();});
settingsModal.addEventListener('click',e=>{if(e.target===settingsModal) closeSettingsFn();});
function setVolume(v){
  mainMusic.volume = Number(v);
  localStorage.setItem('musicVolume',String(v));
}
volumeControl.addEventListener('input',e=>{setVolume(e.target.value);volumeControlModal.value = e.target.value;});
volumeControlModal.addEventListener('input',e=>{setVolume(e.target.value);volumeControl.value = e.target.value;});
const savedVolume = localStorage.getItem('musicVolume');
if(savedVolume){
  volumeControl.value = savedVolume;
  volumeControlModal.value = savedVolume;
  mainMusic.volume = Number(savedVolume);
} else {
  volumeControl.value = '0.2';
  volumeControlModal.value = '0.2';
  mainMusic.volume = 0.2;
  localStorage.setItem('musicVolume','0.2');
}
function buy(){
  const balance = parseFloat(localStorage.getItem('balance')) ?? 0;
  const onBalance = parseFloat(localStorage.getItem('onBalance')) ?? 0;
  const maxCanBuy = (balance / parseFloat(nowPrice)).toFixed(5);
  const message = currentLang === 'ru' ? `Сколько YarikCoin вы хотите купить? Максимум: ${maxCanBuy}` : `How many YarikCoin do you want to buy? Max: ${maxCanBuy}`;
  const ans = parseFloat(prompt(message));
  if(Number.isNaN(ans)) return alert(currentLang === 'ru' ? 'Введите число!' : 'Enter a number!');
  if(ans <= 0.00001) return;
  if((ans * parseFloat(nowPrice)).toFixed(5) > balance.toFixed(5)) return alert(currentLang === 'ru' ? 'Недостаточно средств!' : "You don't have enough balance!");
  const newBalance = balance - (ans * parseFloat(nowPrice));
  const newOnBalance = onBalance + ans;
  localStorage.setItem('balance',String(newBalance));
  localStorage.setItem('onBalance',String(newOnBalance));
  document.getElementById('balance').innerText = Math.abs(newBalance).toFixed(5) + '$';
  document.getElementById('onBalance').innerText = newOnBalance;
}
function sell(){
  const balance = parseFloat(localStorage.getItem('balance')) ?? 0;
  const onBalance = parseFloat(localStorage.getItem('onBalance')) ?? 0;
  const maxCanSell = onBalance;
  const message = currentLang === 'ru' ? `Сколько YarikCoin вы хотите продать? Если продать всё, получите ${(maxCanSell * parseFloat(nowPrice)).toFixed(5)}$` : `How many YarikCoin do you want to sell? If you sell all you get ${(maxCanSell * parseFloat(nowPrice)).toFixed(5)}$`;
  const ans = parseFloat(prompt(message));
  if(Number.isNaN(ans)) return alert(currentLang === 'ru' ? 'Введите число!' : 'Enter a number!');
  if(ans <= 0.00001) return;
  if(ans > maxCanSell) return alert(currentLang === 'ru' ? 'У вас недостаточно YarikCoin!' : "You don't have enough YarikCoin!");
  const newBalance = balance + (ans * parseFloat(nowPrice));
  const newOnBalance = onBalance - ans;
  localStorage.setItem('balance',String(newBalance));
  localStorage.setItem('onBalance',String(newOnBalance));
  document.getElementById('balance').innerText = Math.abs(newBalance).toFixed(5) + '$';
  document.getElementById('onBalance').innerText = newOnBalance;
}
document.getElementById('buy').addEventListener('click',buy);
document.getElementById('sell').addEventListener('click',sell);
let currentLang = getSavedLang();
applyTranslations(currentLang);
languageSelect.value = currentLang;
languageModal.value = currentLang;
languageSelect.addEventListener('change',e=>{currentLang = e.target.value;applyTranslations(currentLang);languageModal.value = currentLang;saveLang(currentLang);});
languageModal.addEventListener('change',e=>{currentLang = e.target.value;applyTranslations(currentLang);languageSelect.value = currentLang;saveLang(currentLang);});