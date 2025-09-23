
// default values for all calculation variables
const DEFAULT_NUMBER = "";
const DEFAULT_OPERATOR = "";

// variables for inputs
let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;

// let calculationData = []; for future use?

const display = document.querySelector("#display");
const defaultDisplayValue = "0";


const add = (numOne, numTwo) => {
    return numOne + numTwo;
}

const subtract = (numOne, numTwo) => {
    return numOne - numTwo;
}

const multiply = (numOne, numTwo) => {
    return numOne * numTwo;
}

const divide = (numOne, numTwo) => {
    return numOne / numTwo;
}

const operate = (numOne, numTwo, operator) => {

    let result = 0;

    if (operator === "+") {
        result = add(numOne, numTwo);
    }
    if (operator === "-") {
        result = subtract(numOne, numTwo);
    }
    if (operator === "*") {
        result = multiply(numOne, numTwo);
    }
    if (operator === "/") {
        if (numTwo === 0) {
            display.textContent = 'BAD! BAD!';
            return;
        }
        result = divide(numOne, numTwo);
    }
    return result;
}

/*  LATER CASE OF USING:
    let calculationOutput = operate(numberOne, numberTwo, operator);
    if (calculationOutput !== undefined) {
    display.textContent = calculationOutput;
    }
*/

// ALL NUMBER BUTTONS SELECTION
const numbersButton = document.querySelectorAll(".number");
numbersButton.forEach((number) => {
    number.addEventListener('click', () => {
        let buttonValue = number.textContent;

        if (display.textContent === defaultDisplayValue) {
            display.textContent = "";
            display.textContent += buttonValue;
            numberOne = parseFloat(display.textContent);
        }
        else {
            if (display.textContent.length <= 10) {
                display.textContent += buttonValue;
                numberOne = parseFloat(display.textContent);
            } else {
                return;
            }
        }

        console.log(numberOne);

    })
    console.log(numberOne);
    return numberOne;
});

// DISPLAY CLEARING + VARIABLES RESETING
const clearEverything = () => {
    // displayData = [];
    display.textContent = defaultDisplayValue;
    numberOne = DEFAULT_NUMBER;
    numberTwo = DEFAULT_NUMBER;
    operator = DEFAULT_OPERATOR;
    console.clear(); // just for my convenience
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clearEverything);
