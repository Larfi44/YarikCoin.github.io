import price from "./data/price.mjs";

const startDate = 484788;
var nowPrice = price[Math.floor(Date.now() / 3600000 - startDate)].toFixed(5);

document.getElementById("price").innerHTML = nowPrice + "$";

var balance;
if (localStorage.getItem("balance")) {
  balance = Number(localStorage.getItem("balance"));
} else {
  localStorage.setItem("balance", 100);
  balance = 100;
}
document.getElementById("balance").innerHTML =
  Math.abs(balance.toFixed(5)) + "$";

var onBalance;
if (localStorage.getItem("onBalance")) {
  onBalance = Number(localStorage.getItem("onBalance"));
} else {
  localStorage.setItem("onBalance", 0);
  onBalance = 0;
}
document.getElementById("onBalance").innerHTML = onBalance;

var maxPrice = price[0];
var minPrice = price[0];
for (let i = 1; i <= Math.floor(Date.now() / 3600000 - startDate); i++) {
  if (maxPrice < price[i]) {
    maxPrice = price[i];
  }
  if (minPrice > price[i]) {
    minPrice = price[i];
  }
}
document.getElementById("maxPrice").innerHTML = maxPrice.toFixed(5) + "$";
document.getElementById("minPrice").innerHTML = minPrice.toFixed(5) + "$";

function buy() {
  var ans = Number(
    prompt(
      "How many YarikCoin do you want to buy? For the full balance you can buy " +
        Math.abs((balance / nowPrice).toFixed(5)) +
        " YarikCoin."
    )
  );
  if (!(ans == ans.toString())) {
    return alert("Enter a number!");
  }
  if (ans == "") {
    return;
  }
  if ((ans * nowPrice).toFixed(5) > balance.toFixed(5)) {
    return alert("You don’t have enough balance!");
  }
  if (ans < 0.00001) {
    return;
  }
  onBalance = Number(onBalance) + Number(ans);
  localStorage.setItem("onBalance", onBalance);
  onBalance = localStorage.getItem("onBalance");
  balance -= ans * nowPrice;
  localStorage.setItem("balance", balance);
  document.getElementById("balance").innerHTML =
    Math.abs(balance.toFixed(5)) + "$";
  document.getElementById("onBalance").innerHTML = onBalance;
}

function sell() {
  var ans = Number(
    prompt(
      "How many YarikCoin do you want to sell? If you sell all YarikCoin, you will get " +
        Math.abs((onBalance * nowPrice).toFixed(5)) +
        "$"
    )
  );
  if (!(ans == ans.toString())) {
    return alert("Enter a number!");
  }
  if (ans == "") {
    return;
  }
  if (ans > onBalance) {
    return alert("You don’t have enough YarikCoin!");
  }
  if (ans < 0.00001) {
    return;
  }
  onBalance -= ans;
  localStorage.setItem("onBalance", onBalance);
  balance += ans * nowPrice;
  localStorage.setItem("balance", balance);
  document.getElementById("balance").innerHTML =
    Math.abs(balance.toFixed(5)) + "$";
  document.getElementById("onBalance").innerHTML = onBalance;
}

document.getElementById("buy").addEventListener("click", buy);
document.getElementById("sell").addEventListener("click", sell);

const time = {
  hour: 1,
  day: 24,
  week: 168,
  month: 720,
  year: 8760,
};

function updatePrice(period, elementId, changeElementId) {
  const currentIndex = Math.floor(Date.now() / 3600000 - startDate);
  const priceIndex = currentIndex - period;
  const priceElement = document.getElementById(elementId);
  const changeElement = document.getElementById(changeElementId);

  if (priceIndex < 0) {
    priceElement.innerHTML = "None";
    if (changeElement) {
      changeElement.innerHTML = "";
    }
    return;
  }

  const oldPrice = price[priceIndex];
  priceElement.innerHTML = oldPrice.toFixed(5) + "$";

  if (changeElement) {
    const change = nowPrice - oldPrice;
    if (change >= 0) {
      changeElement.innerHTML = `(+${change.toFixed(5)}$)`;
    } else {
      changeElement.innerHTML = `(${change.toFixed(5)}$)`;
    }
  }
}

updatePrice(time.hour, "hourAgo", "hourAgoChange");
updatePrice(time.day, "dayAgo", "dayAgoChange");
updatePrice(time.week, "weekAgo", "weekAgoChange");
updatePrice(time.month, "monthAgo", "monthAgoChange");
updatePrice(time.year, "yearAgo", "yearAgoChange");
