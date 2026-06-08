const tools = document.getElementById("tools"); //инструменты
const group = document.getElementById("group"); // ссекция с инструментами
const input = document.getElementById("input"); // главный input на странице
const result = document.getElementById("result"); // кнопка поиска
const MenuButton = document.getElementById("menu");  //кнопка настроек
const list = document.getElementById("list"); //настройки
const time = document.getElementById("time"); // часы
const chTime = document.getElementById("clock"); // чекбокс часов
const date = document.getElementById("date"); //дата
const chDate = document.getElementById("chDate"); // checkbox для даты
const chCurs = document.getElementById("chCurs"); //checkbox для часов
const Theme = document.getElementById("Theme"); // кнопка смены темы
const curs = document.getElementById("curses"); //checkbox для курсов
const svg = document.getElementsByClassName("svg");
tools.onclick = function() { //функция показа инструментов
    group.classList.toggle("скрыт");
};
function openSite() { //функция открытия сайта, либо поиска
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
input.addEventListener('keydown', (e) => { //при нажатии Enter выполняется поиск
    if(e.key === 'Enter') {
        e.preventDefault();
        openSite()
}
})
MenuButton.onclick = function() {
    list.classList.toggle('hidden');
}
Theme.onclick = function() {
document.body.classList.toggle("темная")
if (document.body.classList.contains('темная')) {
        localStorage.setItem('savedTheme', 'dark');
    } else {
        localStorage.setItem('savedTheme', 'light');
    }
};
const currentTheme = localStorage.getItem('savedTheme'); //сохранение темы
if (currentTheme === 'dark') {
    document.body.classList.add('темная');
    svg.fill = "#ffffff"
} else {
    document.body.classList.remove('темная');
    svg.fill = "#000000"
}
function Time() { //время
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
function toggleCurs() {
    if(chCurs.checked) {
         curs.style = 'text-align: center;font-size: 18px;height: auto; opacity: 1; padding: 0;margin: 0;transition: all 0.4s ease;'
    } else {
        curs.style = 'text-align: center; font-size: 18px; height: auto; opacity: 0; padding: 0;margin: 0; transition: all 0.4s ease;'
        
    }
};
toggleClockVisibility();
toggleDate();
toggleCurs();
if (chDate) {
    chDate.addEventListener('change', toggleDate);
}
if (chCurs) {
    chCurs.addEventListener('change', toggleCurs);
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
async function loadCurrency() {
  try {

const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
const data = await res.json();
const eur = data.rates.RUB / data.rates.EUR
curs.textContent = "$ " + data.rates.RUB + " € " + eur.toFixed(2);
  } catch (e) {
    console.warn('Курсы не загрузились:', e);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadCurrency();
  setInterval(loadCurrency, 10 * 60 * 1000);
});