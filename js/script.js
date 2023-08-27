// seleção dos elementos

const display = document.querySelector("#displayInput")
const equalButton = document.querySelector(".equal")
const pointButton = document.querySelector(".point")
const numButton = document.querySelectorAll(".num")
const operatorButton = document.querySelectorAll(".operator")

// variáveis globais

let currentOperation = ""
let operator = null
let previousValue = ""
let calculating = false

// funções

function updateDisplay() {
    display.value = currentOperation
}

function insertNumber(event) {
    if (calculating) {
        currentOperation = event.target.textContent
        calculating = false;
    } else {
        currentOperation += event.target.textContent
    }

    updateDisplay()
}

function insertPoint() {
    if(currentOperation.indexOf(".") === -1) {
        currentOperation += "."
        updateDisplay();
    }
}

function insertOperator(event) {
    if(currentOperation !== "") {
        if(!calculating){
            if(operator !== null) {
                calculate()
            }
            previousValue = currentOperation
            currentOperation = ""
        }
        operator = event.target.textContent
    }
}

function calculate() {
    let result = null
    const previousOperator = parseFloat(previousValue)
    const currentOperator = parseFloat(currentOperation)

    switch (operator) {
        case "+":
            result = previousOperator + currentOperator
            break
        case "-":
            result = previousOperator - currentOperator
            break
        case "*":
            result = previousOperator * currentOperator
            break
        case "/":
            result = previousOperator / currentOperator
            break   
    }

    currentOperation = String(result)
    previousValue = currentOperation
    calculating = true
    updateDisplay()
}

// eventos

pointButton.addEventListener("click", insertPoint)
numButton.forEach((button) => button.addEventListener("click", insertNumber))
operatorButton.forEach((button) => button.addEventListener("click", insertOperator))
equalButton.addEventListener("click", calculate)