const group = document.getElementById("group");
const input = document.getElementById("input");
const result = document.getElementById("result");
const MenuButton = document.getElementById("menu");
const list = document.getElementById("list");
const time = document.getElementById("time");
const chTime = document.getElementById("clock");
const date = document.getElementById("date");
const chDate = document.getElementById("chDate");
const chCurs = document.getElementById("chCurs");
const curs = document.getElementById("curses");

// Функция открытия сайта
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
        openSite();
    }
});

MenuButton.onclick = function() {
    list.classList.toggle('hidden');
};

// ========== СОХРАНЕНИЕ ТЕМЫ ==========
function applyTheme() {
    if (document.body.classList.contains('темная')) {
        localStorage.setItem('savedTheme', 'dark');
        Theme.checked = true;
    } else {
        localStorage.setItem('savedTheme', 'light');
        Theme.checked = false;
    }
}
// ========== ЧАСЫ ==========
function Time() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    if (time) time.textContent = `${hours}:${minutes}:${seconds}`;
}
Time();
setInterval(Time, 1000);

// Сохранение/загрузка видимости часов
function saveClockVisibility() {
    localStorage.setItem('clockVisible', chTime.checked);
}

function toggleClockVisibility() {
    if (chTime.checked) {
        time.style.cssText = 'position: relative; height: auto; text-align: center; padding: 0; margin-bottom: 0; margin-top: 0px; margin-left: 10px; margin-right: 10px; transition: all 0.3s ease;';
    } else {
        time.style.cssText = 'opacity: 0; max-height: 0; position: relative; font-size: 0px; height: auto; text-align: center; padding: 0; margin-bottom: 0; margin-top: 0px; margin-left: 10px; margin-right: 10px; transition: all 0.3s ease;';
    }
    saveClockVisibility();
}

chTime.addEventListener('change', toggleClockVisibility);

const savedClock = localStorage.getItem('clockVisible');
if (savedClock !== null) {
    chTime.checked = savedClock === 'true';
} else {
    chTime.checked = true;
}
toggleClockVisibility();

// ========== ДАТА ==========
function getDate() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    date.textContent = `${day}.${month}.${year}`;
}
getDate();

function saveDateVisibility() {
    localStorage.setItem('dateVisible', chDate.checked);
}

function toggleDate() {
    if (chDate.checked) {
        date.style.cssText = 'text-align: center; font-size: 32px; height: auto; opacity: 1; padding: 0; margin: 0; transition: all 0.4s ease;';
    } else {
        date.style.cssText = 'text-align: center; font-size: 32px; height: auto; opacity: 0; padding: 0; margin: 0; transition: all 0.4s ease;';
    }
    saveDateVisibility();
}

chDate.addEventListener('change', toggleDate);

const savedDate = localStorage.getItem('dateVisible');
if (savedDate !== null) {
    chDate.checked = savedDate === 'true';
} else {
    chDate.checked = true;
}
toggleDate();

// ========== КУРСЫ ВАЛЮТ ==========
async function loadCurrency() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        const eur = data.rates.RUB / data.rates.EUR;
        curs.textContent = "$ " + data.rates.RUB + " € " + eur.toFixed(2);
    } catch (e) {
        console.warn('Курсы не загрузились:', e);
        curs.textContent = "Курсы недоступны";
    }
}

function saveCurrencyVisibility() {
    localStorage.setItem('currencyVisible', chCurs.checked);
}

function toggleCurs() {
    if (chCurs.checked) {
        curs.style.cssText = 'text-align: center; font-size: 18px; height: auto; opacity: 1; padding: 0; margin: 0; transition: all 0.4s ease;';
        loadCurrency();
    } else {
        curs.style.cssText = 'text-align: center; font-size: 18px; height: auto; opacity: 0; padding: 0; margin: 0; transition: all 0.4s ease;';
    }
    saveCurrencyVisibility();
}

chCurs.addEventListener('change', toggleCurs);

const savedCurrency = localStorage.getItem('currencyVisible');
if (savedCurrency !== null) {
    chCurs.checked = savedCurrency === 'true';
} else {
    chCurs.checked = true;
}
toggleCurs();

// Загрузка курсов при старте
document.addEventListener('DOMContentLoaded', () => {
    if (chCurs.checked) loadCurrency();
    setInterval(loadCurrency, 10 * 60 * 1000);
});
// ========== ТЕМЫ ИЗ .item (светло-синяя, светло-зеленая, светло-желтая, фиолетовая) ==========
const themeItems = document.querySelectorAll('.item');
const themesDiv = document.getElementById('divthemes');
const themesButton = document.getElementById('themes');

if (themesButton && themesDiv) {
    themesButton.onclick = () => {
        themesDiv.classList.toggle('hidden');
    };
}

function applyColorTheme(themeName) {
    // Удаляем предыдущие тематические классы
    document.body.classList.remove('light-cyan', 'light-green', 'light-yellow', 'purple', 'dark', 'light');
    // Добавляем новый класс
    document.body.classList.add(themeName);
    // Сохраняем тему в localStorage
    localStorage.setItem('colorTheme', themeName);
}

function loadColorTheme() {
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

if (themeItems.length) {
    themeItems.forEach(item => {
        item.onclick = () => {
            const text = item.textContent.trim();
            if (text === 'Светло синяя') applyColorTheme('light-cyan');
            else if (text === 'Светло зеленая') applyColorTheme('light-green');
            else if (text === 'Светло желтая') applyColorTheme('light-yellow');
            else if (text === 'Фиолетовая') applyColorTheme('purple');
            else if (text === 'Темная') applyColorTheme('dark');
            else if (text === 'Светлая') applyColorTheme('light');
        };
    });
}

loadColorTheme();