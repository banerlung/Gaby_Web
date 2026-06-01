const tools = document.getElementById("tools"); //кнопка для появления инструментов
const group = document.getElementById("group"); // ссекция с инструментами
let input = document.getElementById("input"); // главный инпут на странице
let result = document.getElementById("result"); // кнопка поиска
let MenuButton = document.getElementById("menu");  //кнопка настроек
let list = document.getElementById("list"); // лист настроек
let time = document.getElementById("time"); // часы
let chTime = document.getElementById("clock"); // чекбокс часов
let date = document.getElementById("date"); //дата
let chDate = document.getElementById("chDate"); // чекбокс для даты
tools.onclick = function() {
    group.classList.toggle("скрыт"); // при нажатии меняем появления инструментов
};
function openSite() {
    let query = input.value.trim();
    if (!query) return;
    
    localStorage.setItem("SearchQuery", query);

    if(query.includes("https://") || query.includes("http:/")) {
        window.open("browser.html");
    } else {
        window.open("Sites.html"); 
    }
}
result.onclick = openSite;
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        openSite()
}
})
MenuButton.onclick = function() {
    list.classList.toggle('hidden');
}
let Theme = document.getElementById("Theme");
Theme.onclick = function() {
document.body.classList.toggle("темная")
if (document.body.classList.contains('темная')) {
        localStorage.setItem('savedTheme', 'dark');
    } else {
        localStorage.setItem('savedTheme', 'light');
    }
};
let currentTheme = localStorage.getItem('savedTheme');
if (currentTheme === 'dark') {
    document.body.classList.add('темная');
} else {
    document.body.classList.remove('темная');
}
function Time() {
    let now = new Date(); 
    let hours = now.getHours();
    let minutes = now.getMinutes(); 
    let seconds = now.getSeconds(); 
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    let timeElement = document.getElementById('time'); 
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}
Time();
setInterval(Time, 1000);
function toggleClockVisibility() {
    if (chTime.checked) {
        time.style = 'position: relative; height: auto;text-align: center;padding: 0;margin-bottom: 0;margin-top: 0px;margin-left: 10px;margin-right: 10px;transition: all 0.3s ease;';
    } else {
        time.style = 'opacity: 0; max-height: 0;position: relative;font-size: 0px;height: auto;text-align: center;padding: 0;margin-bottom: 0;margin-top: 0px;margin-left: 10px;margin-right: 10px;transition: all 0.3s ease;';
    }
};
function toggleDate() {
    if(chDate.checked) {
         date.style = 'text-align: center;font-size: 32px;height: auto; opacity: 1; padding: 0;margin: 0;transition: all 0.4s ease;'
    } else {
        date.style = 'text-align: center; font-size: 32px; height: auto; opacity: 0; padding: 0;margin: 0; transition: all 0.4s ease;'
        
    }
};
toggleClockVisibility();
toggleDate();
if (chDate) {
    chDate.addEventListener('change', toggleDate);
}
if (chTime) {
    chTime.addEventListener('change', toggleClockVisibility);
}
function getDate() {
    let now = new Date();
    let day =  now.getDate();
    let mounth = now.getMonth() + 1;
    let year = now.getFullYear();
    if (day < 10) day = '0' + day;
    if (mounth < 10) mounth = '0' + mounth;
    date.textContent = `${day}.${mounth}.${year}`;
}
getDate();
async function loadRates() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD,EUR,CNY');
    const data = await res.json();
    
    const rates = data.rates;
    const el = document.getElementById('rates');
    
    if (el && rates) {
      el.innerHTML = `
        $ ${rates.USD?.toFixed(2) || '—'} | 
        € ${rates.EUR?.toFixed(2) || '—'} | 
        ¥ ${rates.CNY?.toFixed(2) || '—'}
      `;
    }
  } catch (e) {
    console.log('Курсы не загрузились:', e);
    const el = document.getElementById('rates');
    if (el) el.textContent = '—';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadRates();
  setInterval(loadRates, 10 * 60 * 1000);
});