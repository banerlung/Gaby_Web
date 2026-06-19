const site = localStorage.getItem("url"); //url сайта с поиска
const back = document.getElementById("back"); //кнопка назад
const searchBtn = document.getElementById("search"); //кнопка поиска
const inputSearch = document.getElementById("urlAdress"); //input поиска
const divSites = document.getElementById("sites"); //сайты
const start = document.getElementById("start"); //стартовый iframe
start.src = site;
let active = []; //активные вкладки
if(active.length <= 0) {
    divSites.style.display = "none"
}
if (back) {
    back.onclick = function() { history.back(); };
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
inputSearch.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        showSites()
    }
})
function showSites() {
    let url = inputSearch.value;
    divSites.style.display = "block";
    inputSearch.value = null;
    if (!url) return;
    
    let site2 = document.createElement('button');
    let close = document.createElement('span');
    let spanText = document.createElement('span');
    let iframe = document.createElement("iframe");
    let icon = document.createElement("img");
    
    icon.src = `https://www.google.com/s2/favicons?domain=${url}`;
    icon.classList.add('icon');
    site2.classList.add('site');
    site2.appendChild(icon);
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
    showTab(site2, iframe);   
    site2.onclick = function(e) {
        showTab(site2, iframe);
    };
    close.onclick = function() {
        const index = active.indexOf(site2.textContent);
        if (index !== -1) {
            active.splice(index, 1);
        }
        iframe.remove();
        site2.remove();
        
        if (active.length <= 0) {
            divSites.style.display = "none";
        }
    };
    
};
searchBtn.onclick = showSites();
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

