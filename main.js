const DEFAULT_NUMBER = null;
const DEFAULT_OPERATOR = "";
const MAX_STRING_LENGTH = 9;

let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;

let enteringSecondNumber = false;
let isError = false;
let calculationOutput = null;

const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector('#equal');
const decimalPoint = document.querySelector('#point');

const display = document.querySelector("#display");
const displayValueElement = document.querySelector("#display-value");
const indicator = document.querySelector('.indicator');

const defaultDisplayValue = "TYPE NUMBERS";
let displayValue = defaultDisplayValue;

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

    let result;

    if (operator === "+") {
        result = add(numOne, numTwo);
    }
    else if (operator === "−") {
        result = subtract(numOne, numTwo);
    }
    else if (operator === "×") {
        result = multiply(numOne, numTwo);
    }
    else if (operator === "÷") {
        if (numTwo === 0) {
            return null;
        }
        result = divide(numOne, numTwo);
    }
    return result;
}


/* indicator */
const showIndicator = () => {
    indicator.classList.add('indicator-visible');
}

const hideIndicator = () => {
    indicator.classList.remove('indicator-visible');
}

const displayFocus = () => {
    display.classList.add('display-focus');
}

const clearDisplayFocus = () => {
    display.classList.remove('display-focus');
}

showIndicator();
clearDisplayFocus();

const numbersButtons = document.querySelectorAll(".number");

const updateDisplay = () => {
    displayValueElement.textContent = displayValue;
    if (displayValue.length >= (MAX_STRING_LENGTH + 12)) {
        display.setAttribute('style', 'font-size: 1.5rem');
    } else if (displayValue.length >= (MAX_STRING_LENGTH + 8)) {
        display.setAttribute('style', 'font-size: 2rem');
    } else if (displayValue.length >= (MAX_STRING_LENGTH + 4)) {
        display.setAttribute('style', 'font-size: 2.5rem');
    } else {
        display.setAttribute('style', 'font-size: 3rem');
    }
}

const validateNumber = (value) => {
    if (!isNaN(value)) {
        return value;
    } else {
        return DEFAULT_NUMBER;
    }
}

const parseAndValidate = (value) => {
    const parsedValue = parseFloat(value);
    let num = validateNumber(parsedValue);
    return num;
}

const enterSecondNumberIfNeeded = () => {
    if (enteringSecondNumber === true) {
        displayValue = "";
        enteringSecondNumber = false;
    }
};

const appendDigit = (buttonValue, targetNumber) => {
    if (isError) { clearEverything(); }

    if (targetNumber === "two") {
        enterSecondNumberIfNeeded();
        showIndicator();
        clearDisplayFocus();
    }

    const currentNumberIsDefault = (displayValue === defaultDisplayValue);

    const displayString = currentNumberIsDefault ? "" : String(displayValue);

    const currentLength = currentNumberIsDefault ? 0 : displayString.length;

    if (currentLength >= MAX_STRING_LENGTH) {
        return;
    }

    displayValue = currentNumberIsDefault ? buttonValue : displayString + buttonValue;

    updateDisplay();

    const parsed = parseAndValidate(displayValue);
    if (targetNumber === "one") {
        numberOne = parsed;
    } else {
        numberTwo = parsed;
    }
}


const chooseNumber = () => {
    numbersButtons.forEach((number) => {
        number.addEventListener('click', () => {
            if (isError) {
                clearEverything();
            }

            let buttonValue = number.textContent;

            if (numberOne === calculationOutput && calculationOutput !== null && operator === DEFAULT_OPERATOR) {
                clearEverything();
            }

            if (operator === DEFAULT_OPERATOR) {

                appendDigit(buttonValue, "one");

            } else {

                appendDigit(buttonValue, "two");
            }

        });
    });

};

chooseNumber();

const operatorsButton = document.querySelectorAll(".operator");

operatorsButton.forEach((op) => {
    op.addEventListener('click', () => {

        if (isError) {
            clearEverything();
        }

        if (displayValue !== defaultDisplayValue) {

            if (numberOne != DEFAULT_NUMBER && numberTwo != DEFAULT_NUMBER && operator != DEFAULT_OPERATOR) {
                resultOfOperation();
            }

            let buttonValue = op.textContent;
            operator = buttonValue;
            enteringSecondNumber = true;

            operatorsButton.forEach((button) => {
                button.classList.remove('highlight');
            });

            op.classList.toggle('highlight');

            showIndicator();
            clearDisplayFocus();

        } else {
            return;
        }
    });

});

decimalPoint.addEventListener('click', () => {
    if (isError) {
        clearEverything();
    }

    if (numberOne === calculationOutput && calculationOutput !== null && operator === DEFAULT_OPERATOR) {
        displayValue = "0.";
        updateDisplay();
        numberOne = parseFloat(displayValue);
        calculationOutput = null;
        return;
    }

    if (operator !== DEFAULT_OPERATOR && enteringSecondNumber) {
        enterSecondNumberIfNeeded();
    }

    if (displayValue === defaultDisplayValue || displayValue === "" || displayValue === "0") {
        displayValue = "0.";
        updateDisplay();

        if (operator === DEFAULT_OPERATOR) {
            numberOne = parseFloat(displayValue);
        } else {
            numberTwo = parseFloat(displayValue);
        }
        return;
    }

    if (displayValue.includes(".")) {
        return;
    }

    if (displayValue.length >= MAX_STRING_LENGTH) {
        return;
    }

    displayValue += ".";
    updateDisplay();
    if (operator === DEFAULT_OPERATOR) {
        numberOne = parseFloat(displayValue);
    } else {
        numberTwo = parseFloat(displayValue);
    }
});


deleteButton.addEventListener('click', () => {

    if (isError) {
        clearEverything();
    }

    if (numberOne === calculationOutput && calculationOutput !== null && operator === DEFAULT_OPERATOR) {
        return;
    }

    if (operator === DEFAULT_OPERATOR) {
        if (displayValue === defaultDisplayValue) {
            return;
        }

        displayValue = displayValue.slice(0, -1);

        if (displayValue === "") {
            displayValue = defaultDisplayValue;
            numberOne = DEFAULT_NUMBER;
        } else {
            numberOne = parseFloat(displayValue);
        }

    } else {
        if (numberTwo === DEFAULT_NUMBER && displayValue === String(numberOne)) {
            clearOperator();
            return;
        }

        displayValue = displayValue.slice(0, -1);

        if (displayValue === "") {
            numberTwo = DEFAULT_NUMBER;
            showIndicator();
            clearDisplayFocus();
        } else {
            numberTwo = parseFloat(displayValue);
        }
    }

    updateDisplay();
});


const resultOfOperation = () => {

    let result = operate(numberOne, numberTwo, operator);

    if (result === null) {
        displayValue = 'BAD! BAD!'
        displayValueElement.textContent = displayValue;
        isError = true;
        clearOperator();
        numberOne = DEFAULT_NUMBER;
        numberTwo = DEFAULT_NUMBER;
        hideIndicator();
        displayFocus();
        return;
    }

    calculationOutput = Number(result.toFixed(4));

    numberOne = calculationOutput;
    numberTwo = DEFAULT_NUMBER;
    clearOperator();
    displayValue = numberOne === DEFAULT_NUMBER ? defaultDisplayValue : String(numberOne);
    updateDisplay();
    displayFocus();
    hideIndicator();
}

equalsButton.addEventListener('click', () => {
    if (isError) {
        clearEverything();
    }

    if (numberOne !== DEFAULT_NUMBER && numberTwo !== DEFAULT_NUMBER && operator !== DEFAULT_OPERATOR) {
        resultOfOperation();
    } else {
        return;
    }
});

const clearEverything = () => {
    isError = false;
    displayValue = defaultDisplayValue;
    updateDisplay();
    numberOne = DEFAULT_NUMBER;
    numberTwo = DEFAULT_NUMBER;

    clearOperator();
    console.clear();
    showIndicator();
    clearDisplayFocus();
}

clearButton.addEventListener('click', clearEverything);

const clearOperator = () => {
    operator = DEFAULT_OPERATOR;
    enteringSecondNumber = false;
    operatorsButton.forEach((button) => {
        button.classList.remove('highlight');
    });
}


/* keyboard */

// const keys = document.querySelectorAll('.key');

document.addEventListener('keydown', (e) => {
    let key = e.key;

    const keysPseudonymes = {
        'x': '*',
        'X': '*',
        ',': '.',
        '<': '.',
        '>': '.',
        'C': 'Escape',
        'c': 'Escape',
        'Backspace': 'Delete',
        '=': 'Enter',
    };

    if (keysPseudonymes.hasOwnProperty(key)) {
        key = keysPseudonymes[key];
    } else {
        key;
    }

    const button = document.querySelector(`[data-key="${key}"]`);
    if (button) {
        e.preventDefault();
        button.click();
    }
});
