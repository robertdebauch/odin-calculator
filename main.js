
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

// delete button
// deleteButton.addEventListener('click', () => {
//     if (display.textContent === defaultDisplayValue || display.textContent.length === 1) {
//         display.textContent = "";

//     } else if (display.textContent === storeCalculationOutput.toString()) {
//         display.textContent = storeCalculationOutput;

//         if (numberTwo === DEFAULT_NUMBER) {
//             display.textContent = storeCalculationOutput.toString();

//             numberOne = storeCalculationOutput;
//             numberTwo = DEFAULT_NUMBER;
//         }

//     } else if (display.textContent !== defaultDisplayValue && numberTwo !== DEFAULT_NUMBER) {
//         let deleted = display.textContent.slice(0, -1);
//         if (deleted.length === 0) {
//             numberTwo = DEFAULT_NUMBER;
//             return;
//         }

//         numberTwo = parseFloat(deleted);
//         console.log(deleted);
//         display.textContent = deleted;
//     }
// });

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

const numberCheck = (value, num) => {
    if (!isNaN(value)) {
        return num = value;
    } else {
        return num = DEFAULT_NUMBER;
    }
}

/* Follow the logic of this: what return what? Think about it: this isn't actually what you want, since we need to += sometimes.
const displayChange = (num) => {
    displayValue = buttonValue;
    display.textContent = displayValue;
    const parsedValue = parseFloat(displayValue);
    num = numberCheck(parsedValue, num);
    return num;
}
*/ 

// function to choose the value of numberOne or numberTwo
const chooseNumber = () => {
    numbersButtons.forEach((number) => {
        number.addEventListener('click', () => {
            if (isError) {
                clearEverything();
            }

            let buttonValue = number.textContent;

            if (numberOne === calculationOutput && numberTwo === DEFAULT_NUMBER && operator === DEFAULT_OPERATOR) {
                clearEverything();
            }

            if (operator === DEFAULT_OPERATOR) {

                if (display.textContent === defaultDisplayValue) {
                    displayValue = buttonValue;
                    display.textContent = displayValue;
                    const parsedValue = parseFloat(displayValue);
                    numberOne = numberCheck(parsedValue, numberOne);
                }

                else {
                    if (displayValue.length <= MAX_STRING_LENGTH) {
                        displayValue += buttonValue;
                        display.textContent = displayValue;
                        const parsedValue = parseFloat(displayValue);
                        numberOne = numberCheck(parsedValue, numberOne);
                    } else {
                        return;
                    }
                }
                console.log(numberOne + " is numberOne");

                // ELSE (operator is chosen) - select numberTwo
            } else if (operator !== DEFAULT_OPERATOR) {

                // switching to the second number
                if (enteringSecondNumber) {
                    displayValue = "";
                    display.textContent = displayValue;
                    enteringSecondNumber = false;
                }

                if (display.textContent === defaultDisplayValue) {
                    displayValue += buttonValue;
                    display.textContent = displayValue;
                    const parsedValue = parseFloat(displayValue);
                    numberTwo = numberCheck(parsedValue, numberTwo);
                }

                else {
                    if (displayValue.length <= MAX_STRING_LENGTH) {
                        displayValue += buttonValue;
                        display.textContent = displayValue;
                        const parsedValue = parseFloat(displayValue);
                        numberTwo = numberCheck(parsedValue, numberTwo);
                    } else {
                        return;
                    }
                }
            }

            console.log(numberTwo + " is numberTwo");
            // return numberTwo;


        });
    });

};

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