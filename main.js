
// default values for all calculation variables
const DEFAULT_NUMBER = null;
const DEFAULT_OPERATOR = "";
const MAX_STRING_LENGTH = 6;

// variables for inputs
let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;

let enteringSecondNumber = false; // this is using to indicate what number user is entering at the moment.
let isError = false; // this is using when the user is dividing by zero. 
let calculationOutput = 0;
let buttonValue = "";
// let storeCalculationOutput;

const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

const display = document.querySelector("#display");
const defaultDisplayValue = "TYPE NUMBERS";
let displayValue = defaultDisplayValue; // new variable to store strings

// MATH

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

// OPERATION HANDLER

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

// ALL NUMBER BUTTONS SELECTION
const numbersButtons = document.querySelectorAll(".number");

// update display
const updateDisplay = () => {
    display.textContent = displayValue;
}

// validate the number -> !!!rename this
const validateNumber = (value) => {
    if (!isNaN(value)) {
        return value;
    } else {
        return DEFAULT_NUMBER;
    }
}

// parse the Number -> !!!rename this
const parseAndValidate = (value) => {
    const parsedValue = parseFloat(value);
    let num = validateNumber(parsedValue);
    return num;
}

// function for choosing the correct value to work with: numberOne or numberTwo. 
// this function works exactly as all the if/else chain inside chooseNumber() before, but can help to read the code better
const appendDigit = (buttonValue, targetNumber) => {
    if (isError) { clearEverything(); }

    if (targetNumber === "two" && enteringSecondNumber === true) {
        displayValue = "";
        enteringSecondNumber = false;
    }

    const currentNumberIsDefault = (displayValue === defaultDisplayValue);
    displayValue = currentNumberIsDefault ? buttonValue : displayValue + buttonValue;

    updateDisplay();

    const parsed = parseAndValidate(displayValue);
    if (targetNumber === "one") {
        numberOne = parsed;
    } else {
        numberTwo = parsed;
    }
}

// function to choose the value of numberOne or numberTwo
const chooseNumber = () => {
    numbersButtons.forEach((number) => {
        number.addEventListener('click', () => {
            // flag checking -> serve as 'the gate' to all the conditions below:
            if (isError) {
                clearEverything();
            }

            let buttonValue = number.textContent;

            // If numberOne is the same as the calculationOutput and other two variables are on default, then clean everything.
            if (numberOne === calculationOutput && numberTwo === DEFAULT_NUMBER && operator === DEFAULT_OPERATOR) {
                clearEverything();
            }

            // IF we don't choose operator yet, then we move through this chain
            if (operator === DEFAULT_OPERATOR) {

                appendDigit(buttonValue, "one");
                
            } else {

                appendDigit(buttonValue, "two");
            }

            console.log(numberTwo + " is numberTwo");


        }); // end of the listener
    }); // end of the forEach

}; // end of the chooseNumber();

chooseNumber();


// ALL OPERATOR BUTTONS SELECTION
const operatorsButton = document.querySelectorAll(".operator");

operatorsButton.forEach((op) => {
    op.addEventListener('click', () => {
        if (isError) {
            clearEverything();
        }

        if (displayValue !== defaultDisplayValue) {

            // logic for chaining operations
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

const resultOfOperation = () => {

    let result = operate(numberOne, numberTwo, operator);

    if (result === null) {
        displayValue = 'BAD! BAD!'
        display.textContent = displayValue;
        isError = true;
        clearOperator();
        numberOne = DEFAULT_NUMBER;
        numberTwo = DEFAULT_NUMBER;
        return;
    }

    calculationOutput = Number(result.toFixed(4));

    // storeCalculationOutput = Math.trunc(calculationOutput); come back to it when you will do delete button
    numberOne = calculationOutput;
    numberTwo = DEFAULT_NUMBER;
    clearOperator();
    displayValue = numberOne;
    display.textContent = displayValue;
}

const equalsButton = document.querySelector('#equal');
equalsButton.addEventListener('click', () => {
    if (isError) {
        clearEverything();
    }

    if (numberOne != DEFAULT_NUMBER && numberTwo != DEFAULT_NUMBER && operator != DEFAULT_OPERATOR) {
        resultOfOperation();
    } else {
        return;
    }
});

// DISPLAY CLEARING + VARIABLES RESETING
const clearEverything = () => {
    isError = false;
    display.textContent = defaultDisplayValue;
    displayValue = defaultDisplayValue;
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