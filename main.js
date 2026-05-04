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
result.onclick = async function() {
    let query = input.value.trim();
    if (!query) return; // Если пусто, ничего не делаем

    // Показываем, что думаем (можно добавить элемент loading, если есть)
    // Если у тебя нет специального блока для вывода ИИ, давай выведем его прямо в консоль или alert для теста:
    
    try {
        // Вызываем функцию Summary из файла Summary.js
        // Убедись, что Summary.js подключен в HTML ПОСЛЕ main.js или до него, но глобально доступен
        const answer = await Summary(query); 
        
        // Выводим результат. 
        // Так как у тебя в Sites.html есть <div id="results"></div>, давай используем его.
        // Но если ты на главной странице (где main.js), то results может не быть.
        
        // Для теста пока просто покажем в alert или запишем в localStorage, как ты делал раньше:
        alert("Ответ ИИ: " + answer); 
        
        // А потом уже открывай страницу, если нужно:
        // window.open("Sites.html"); 

    } catch (error) {
        console.error(error);
        alert("Ошибка при запросе к ИИ");
    }
    if(resultSearch.includes("https://") || resultSearch.includes("http:/")) {
    window.open("browser.html");
}
};

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
    let mounth = now.getMonth();
    let year = now.getFullYear();
    if (day < 10) day = '0' + day;
    if (mounth < 10) mounth = '0' + mounth;
    date.textContent = `${day}.${mounth}.${year}`;
}
getDate();
