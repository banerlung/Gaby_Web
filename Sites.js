let search = localStorage.getItem("SearchQuery");
let input = document.getElementById("input");
let searchBtn = document.getElementById("search");
function SiteOrUrl(url) {
    if(url.includes("http:/") || url.includes("https:/")) {
        localStorage.setItem("resultSearch", url);
        window.open("browser.html");
    } else {
        ShowSites(url);
    };
};
searchBtn.onclick = function() {
SiteOrUrl(input.value);
}
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        SiteOrUrl(input.value)
}
});
document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'r') {
    e.preventDefault();
    location.reload();
  }
})
function home() {
    window.open("index.html", target = "_self");
};
if(!search) {
    console.error("Ошибка! перейдите на главную страницу!")
}

document.addEventListener('DOMContentLoaded', () => { 
    ShowSites(search);
    input.value = search;
})
async function ShowSites(urlSite) {
    try {
    const API = "ad9f8d9e56c377337213506262d2f698e1a01625";
    const searxInstance = 'https://search.sapti.me'; 
    const url = 'https://google.serper.dev/search';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-API-KEY': API,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                q: urlSite, 
                gl: 'ru',   // Россия
                hl: 'ru'    // Русский язык
            })
        });
        const AiDiv = document.getElementById("AI");
        let requiest = Summary(urlSite).then(val => { AiDiv.innerHTML = "";
        AiDiv.innerHTML =  val;});
    const data = await response.json();
    let topics = data.organic;
    let list = document.getElementById("results");
    list.innerHTML = '';
        topics.forEach(site => {
            let url = site.link;
            let text = site.snippet;
            let header = site.title;
            let result = document.createElement('div');
            let TextUrl = document.createElement("a");
            let description = document.createElement("p");
            let headerText = document.createElement("h2");
            let icon = document.createElement("img");
            result.appendChild(icon);
            result.appendChild(headerText);
            result.appendChild(description);
            headerText.textContent = header;
            headerText.classList.add("title");
            icon.src = `https://www.google.com/s2/favicons?domain=${url}`;
            icon.classList.add("img");
            description.textContent = text;
            TextUrl.textContent = url;
            TextUrl.classList.add("url");
            TextUrl.href = url;
            description.classList.add("description");
            result.classList.add("result");
            list.appendChild(result);
            result.appendChild(TextUrl);
            result.onclick = function() {
            localStorage.setItem("resultSearch", url);
            window.open("browser.html", target = "_self");
            }
        });
    } catch(error) {
        console.error("Ошибка:" + error);
    };
};