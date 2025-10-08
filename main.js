const DEFAULT_NUMBER = null;
const DEFAULT_OPERATOR = "";
const MAX_STRING_LENGTH = 6;

let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;

let enteringSecondNumber = false;
let isError = false;
let isEditionAfterResult = false; 
let calculationOutput = null;

const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector('#equal');
const decimalPoint = document.querySelector('#point');

const display = document.querySelector("#display");
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

const numbersButtons = document.querySelectorAll(".number");

const updateDisplay = () => {
    display.textContent = displayValue;
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
        console.log('check check');
        displayValue = "";
        enteringSecondNumber = false;
    }
};

const appendDigit = (buttonValue, targetNumber) => {
    if (isError) { clearEverything(); }

    if (targetNumber === "two") {
        enterSecondNumberIfNeeded();
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

            if (numberOne === calculationOutput && numberTwo === DEFAULT_NUMBER && operator === DEFAULT_OPERATOR && isEditionAfterResult === false) {
                clearEverything();
            }

            if (operator === DEFAULT_OPERATOR) {

                appendDigit(buttonValue, "one");

            } else {

                appendDigit(buttonValue, "two");
            }

            console.log(numberTwo + " is numberTwo");


        });
    });

};

chooseNumber();

const operatorsButton = document.querySelectorAll(".operator");

operatorsButton.forEach((op) => {
    op.addEventListener('click', () => {

        isEditionAfterResult = false;

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
            console.log(operator);

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
        const calculationToString = String(calculationOutput);
        if (calculationToString.includes('.')) {
            return;
        } else {
            displayValue = calculationToString + '.';
            isEditionAfterResult = true;
            updateDisplay();
            numberOne = parseFloat(displayValue);
            return;
        }
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

const resultOfOperation = () => {

    let result = operate(numberOne, numberTwo, operator);

    if (result === null) {
        displayValue = 'BAD! BAD!'
        display.textContent = displayValue;
        console.log(display.textContent);
        isError = true;
        clearOperator();
        numberOne = DEFAULT_NUMBER;
        numberTwo = DEFAULT_NUMBER;
        return;
    }

    calculationOutput = Number(result.toFixed(4));

    numberOne = calculationOutput;
    numberTwo = DEFAULT_NUMBER;
    clearOperator();
    displayValue = numberOne === DEFAULT_NUMBER ? defaultDisplayValue : String(numberOne);
    console.log(`the result is: ${displayValue}`);
    updateDisplay();
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
    isEditionAfterResult = false;
    displayValue = defaultDisplayValue;
    updateDisplay();
    numberOne = DEFAULT_NUMBER;
    numberTwo = DEFAULT_NUMBER;

    clearOperator();
    console.clear();
}

clearButton.addEventListener('click', clearEverything);

const clearOperator = () => {
    operator = DEFAULT_OPERATOR;
    operatorsButton.forEach((button) => {
        button.classList.remove('highlight');
    });
}