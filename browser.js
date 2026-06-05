const site = localStorage.getItem("SearchQuery"); //url сайта с поиска
const back = document.getElementById("back"); //кнопка назад
const searchBtn = document.getElementById("search"); //кнопка поиска
const inputSearch = document.getElementById("urlAdress"); //input поиска
const divSites = document.getElementById("sites"); //сайты
const start = document.getElementById("start"); //стартовый iframe
start.src = site;
let active = []; //активные вкладки
let max = 12; //максимальное количество вкладок
if (back) {
    back.onclick = function() { history.back(); };
}

const reload = document.getElementById("reload");
if (reload) {
    reload.onclick = function() { location.reload(); };
}

const forward = document.getElementById("forward");
if (forward) {
    forward.onclick = function() { history.forward(); };
}
const homeBtn = document.getElementById("Home");
if (homeBtn) {
    homeBtn.onclick = function() { 
        open("index.html"); 
    };
}
searchBtn.onclick = function() {
    let url = inputSearch.value;
    inputSearch.value = null;
    if (!url) return;
    if (active.length < max) {
        let site2 = document.createElement('button');
        let close = document.createElement('span');
        let spanText = document.createElement('span');
        let iframe = document.createElement("iframe");
        site2.classList.add('site');
        site2.appendChild(spanText);
        site2.appendChild(close);
        spanText.innerText = url;
        close.innerHTML = "&times;";
        close.classList.add("close");
        iframe.src = url;
        iframe.classList.add("window");
        document.body.appendChild(iframe);
        divSites.appendChild(site2);
        active.push(site2.textContent);     
        site2.onclick = function(e) {
        showTab(site2, iframe);
        };

        close.onclick = function(e) {
            iframe.remove();
            site2.remove();
        };
    } else {
        alert("Максимум вкладок!");
    }
    
};
document.addEventListener("keydown", (e) => { //бета
    if (e.ctrlKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        iframe.remove();
        site2.remove();
    }
})
    function showTab(btn, activeFrame) {
    let allFrames = document.querySelectorAll('.window');
    for (let i = 0; i < allFrames.length; i++) {
        allFrames[i].style.display = 'none';
    }
    let Allbtn = document.querySelectorAll(".site");
    for(let i = 0; i < Allbtn.length; i++) {
        Allbtn[i].style.border = "solid 3px black"
    }
    btn.style = "border: solid 3px white"
    activeFrame.style.display = 'block';
};

