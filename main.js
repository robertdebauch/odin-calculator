
// default values for all calculation variables
const DEFAULT_NUMBER = "";
const DEFAULT_OPERATOR = "";

// variables for inputs
let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;
let enteringSecondNumber = false;
let calculationOutput = 0;

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
    if (operator === "−") {
        result = subtract(numOne, numTwo);
    }
    if (operator === "×") {
        result = multiply(numOne, numTwo);
    }
    if (operator === "÷") {
        if (numTwo === 0) {
            display.textContent = 'BAD! BAD!';
            return;
        }
        result = divide(numOne, numTwo);
    }
    return result;
}

// ALL NUMBER BUTTONS SELECTION
const numbersButtons = document.querySelectorAll(".number");

const chooseNumber = () => {
    numbersButtons.forEach((number) => {
        number.addEventListener('click', () => {
            let buttonValue = number.textContent;
            // IF operator is NOT chosen yet - then we select numberOne
            if (operator === DEFAULT_OPERATOR) {

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
                console.log(numberOne + " it's number one");
                return numberOne;

                // ELSE (operator is chose) - select numberTwo
            } else if (operator !== DEFAULT_OPERATOR) {

                // switching to the second number
                if (enteringSecondNumber) {
                    display.textContent = "";
                    enteringSecondNumber = false;
                }

                if (display.textContent === defaultDisplayValue) {
                    // display.textContent = "";
                    display.textContent += buttonValue;
                    numberTwo = parseFloat(display.textContent);
                }

                else {
                    if (display.textContent.length <= 10) {
                        display.textContent += buttonValue;
                        numberTwo = parseFloat(display.textContent);
                    } else {
                        return;
                    }
                }
            }
            console.log(numberTwo + " it's number two");
            return numberTwo;

        });
    });

};

chooseNumber();

// EQUALS BUTTON SELECTION
// only blue print for now;
const equalsButton = document.querySelector('#equal');
equalsButton.addEventListener('click', () => {
    if (numberOne != DEFAULT_NUMBER && numberTwo != DEFAULT_NUMBER && operator != DEFAULT_OPERATOR) {
        calculationOutput = operate(numberOne, numberTwo, operator).toFixed(4);
        numberOne = parseFloat(calculationOutput);
        numberTwo = DEFAULT_NUMBER;
        cleanOperator();
        display.textContent = numberOne;
        console.log(numberOne);
    } else {
        return;
    }
});


// ALL OPERATOR BUTTONS SELECTION
const operatorsButton = document.querySelectorAll(".operator");

operatorsButton.forEach((op) => {
    op.addEventListener('click', () => {
        if (display.textContent !== defaultDisplayValue) {
            let buttonValue = op.textContent;
            operator = buttonValue;
            enteringSecondNumber = true;

            operatorsButton.forEach((button) => {
                button.classList.remove('highlight');
            });

            op.classList.toggle('highlight');
            console.log(operator);

        } else {

            return;
        }
    });

    return operator;
});


// DISPLAY CLEARING + VARIABLES RESETING
const clearEverything = () => {
    // displayData = [];
    display.textContent = defaultDisplayValue;
    numberOne = DEFAULT_NUMBER;
    numberTwo = DEFAULT_NUMBER;

    cleanOperator();

    console.clear(); // just for my convenience
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clearEverything);

const cleanOperator = () => {
    operator = DEFAULT_OPERATOR;
    operatorsButton.forEach((button) => {
        button.classList.remove('highlight');
    });
}