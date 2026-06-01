let site = localStorage.getItem("SearchQuery");
let back = document.getElementById("back");
let search2 = document.getElementById("search");
let inputSearch = document.getElementById("urlAdress");
let divSites = document.getElementById("sites");
let start = document.getElementById("start");
start.src = site;
let active = [];
let max = 12;
search2.onclick = function() {
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
document.addEventListener("keydown", (e) => {
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
back.onclick = function() {
history.back();
}
let reload = document.getElementById("reload");
reload.onclick = function reload() {
location.reload();
}
let forward = document.getElementById("forward");
forward.onclick = function() {
    history.forward();
}
let Home = document.getElementById("Home");
Home.onclick = function() {
    open("index.html")
}
