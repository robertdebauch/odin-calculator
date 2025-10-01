
// default values for all calculation variables
const DEFAULT_NUMBER = null;
const DEFAULT_OPERATOR = "";

// variables for inputs
let numberOne = DEFAULT_NUMBER;
let numberTwo = DEFAULT_NUMBER;
let operator = DEFAULT_OPERATOR;
let enteringSecondNumber = false; // this is using to indicate what number user is entering at the moment.
let isError = false; // this is using when the user is dividing by zero. 
let calculationOutput = 0;
let storeCalculationOutput;

const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

const display = document.querySelector("#display");
const defaultDisplayValue = "TYPE NUMBERS";



// doesn't work as intended -> can't achieve complete deletion of numberTwo and return to the calculation result
deleteButton.addEventListener('click', () => {
    // somewhere here is a mistake: we still somehow deleting numberOne values;
    // if display is empty - reset to default value
    if (display.textContent === defaultDisplayValue || display.textContent.length === 1) {
        display.textContent = "";

    } else if (display.textContent === storeCalculationOutput.toString()) {
        display.textContent = storeCalculationOutput;

        if (numberTwo === DEFAULT_NUMBER) {
            display.textContent = storeCalculationOutput.toString();

            numberOne = storeCalculationOutput;
            numberTwo = DEFAULT_NUMBER;
            // if we deleting after calculating, we should be able to return to the result of the calculation if we delete all numberTwo
            // and also we shoud reset operator highlght class
        }

    } else if (display.textContent !== defaultDisplayValue && numberTwo !== DEFAULT_NUMBER) {
        let deleted = display.textContent.slice(0, -1);
        if (deleted.length === 0) {
            numberTwo = DEFAULT_NUMBER;
            return;
        }

        numberTwo = parseFloat(deleted);
        console.log(deleted);
        display.textContent = deleted;
    }
});

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

// function to choose the value of numberOne or numberTwo
const chooseNumber = () => {
    numbersButtons.forEach((number) => {
        number.addEventListener('click', () => {
            if (isError) { clearEverything(); }
            let buttonValue = number.textContent;

            if (numberOne === storeCalculationOutput && numberTwo == DEFAULT_NUMBER && operator == DEFAULT_OPERATOR) {
                clearEverything();
            }

            if (operator === DEFAULT_OPERATOR) {

                if (display.textContent === defaultDisplayValue) {
                    display.textContent = "";
                    display.textContent += buttonValue;
                    numberOne = parseFloat(display.textContent);
                }

                else {
                    if (display.textContent.length <= 6) {
                        display.textContent += buttonValue;
                        numberOne = parseFloat(display.textContent);
                    } else {
                        return;
                    }
                }
                console.log(numberOne);
                return numberOne;

                // ELSE (operator is chosen) - select numberTwo
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
                    if (display.textContent.length <= 6) {
                        display.textContent += buttonValue;
                        numberTwo = parseFloat(display.textContent);
                    } else {
                        return;
                    }
                }
            }

            console.log(numberTwo);
            return numberTwo;


        });
    });

};

chooseNumber();


// ALL OPERATOR BUTTONS SELECTION
const operatorsButton = document.querySelectorAll(".operator");

operatorsButton.forEach((op) => {
    op.addEventListener('click', () => {
        if (isError) { clearEverything(); }
        if (display.textContent !== defaultDisplayValue) {

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
        display.textContent = 'BAD! BAD!';
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
    display.textContent = numberOne;
}

const equalsButton = document.querySelector('#equal');
equalsButton.addEventListener('click', () => {
    if (isError) { clearEverything(); }
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