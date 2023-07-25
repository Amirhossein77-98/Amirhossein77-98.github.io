let numBtnEl = document.getElementById("num-btns")
let inputFieldEl = document.getElementById("input")
let lastRowEl = document.getElementById("last-row")
let numsArray = []
let operations = []

for (let i = 1; i < 10; i++) {
    numBtnEl.innerHTML += `<button id="num${i}" value="${i}" onClick='inputNum(value)'>${i}</button>`
}
lastRowEl.innerHTML += "<button id='comma' value='.' onClick='inputDot()'>.</button>"
lastRowEl.innerHTML += "<button id='num0' value='0' onClick='inputNum(this.value)'>0</button>"
lastRowEl.innerHTML += "<button id='result' value='=' onClick='operator(this.value)'>=</button>"

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    inputFieldEl.disabled = true
}

function inputNum(value) {
    inputFieldEl.value += value
}

inputFieldEl.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        return true
    } else if (event.key.match(/[^0-9\.]/)) {
        event.preventDefault()
    } else if (event.key === "." && inputFieldEl.value.indexOf(".") !== -1) {
        event.preventDefault()
    }
});

function inputDot() {
    inputFieldEl.value += inputFieldEl.value.indexOf(".") !== -1 ? "" : "."
}

function deleteLastNum() {
    inputFieldEl.value = inputFieldEl.value.slice(0, -1)
}

function clearAll() {
    inputFieldEl.value = ""
    numsArray = []
    operations = []
}

function operator(value) {
    if (value === "=") {
        numsArray.push(inputFieldEl.value)
        inputFieldEl.value = ""
        let result = Number(numsArray[0])
        for (let i = 1; i < numsArray.length; i++) {
        if (operations[i - 1] === "+") {
            result += Number(numsArray[i])
        } else if (operations[i - 1] === "-") {
            result -= Number(numsArray[i])
        } else if (operations[i - 1] === "*") {
            result *= Number(numsArray[i])
        } else if (operations[i - 1] === "/") {
            result /= Number(numsArray[i])
        } else if (operations[i - 1] === "**") {
            result **= Number(numsArray[i])
        } else if (operations[i - 1] === "%") {
            result = result % Number(numsArray[i])
        }
    }
    inputFieldEl.value = result
    numsArray = []
    operations = []
    } else {
        numsArray.push(inputFieldEl.value)
        operations.push(value)
        inputFieldEl.value = ""
    }
}
