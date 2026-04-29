let btn = document.getElementById("result");
let text = document.getElementById("tr");
let clear = document.getElementById("clear");
let back = document.getElementById("back");
btn.onclick = function() {
    let num1 = +document.getElementById("num1").value;
    let num2 = +document.getElementById("num2").value;
    let op = document.getElementById("op").value;
    let result;

    if (op == "+") {
        result = num1 + num2;
    } else if (op == "-") {
        result = num1 - num2;
    } else if (op == "*") {
        result = num1 * num2;
    } else if (op == "/") {
        result = num1 / num2;
    } else {
        result = "Ошибка";
    }

    text.textContent = `result: ${result}`;
}
clear.onclick = function() {
num1.value = null;
num2.value = null;
text.textContent = "result"
}

function addNumber(num) {
    
}
back.onclick = function() { 
    history.back();
}