const add = (numOne, numTwo) => {
    let sum = 0 || null;
    return sum = numOne + numTwo;
}

const subtract = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    return sum = numOne - numTwo;
}

const multiply = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    return sum = numOne * numTwo;
}

const divide = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    return sum = numOne / numTwo;
}

// function with the call to math operations

const operate = (numOne, numTwo, operator) => {
    if (operator === "+") {
        return add(numOne, numTwo, operator);
    }
    if (operator === "-") {
        return subtract(numOne, numTwo, operator)
    }
    if (operator === "*") {
        return multiply(numOne, numTwo, operator)
    }
    if (operator === "/") {
        if (numTwo === 0) {
            let display = document.querySelector('#result');
            display.textContent = 'BAD! BAD!';
            return null; // should do something else.
        }
        return divide(numOne, numTwo, operator)
    }
}

// console.log(operate(10, 5, "*"));



// select display
const display = document.querySelector('#displayInfo');
console.log(display);

// select buttons
const keyOne = document.querySelector("#one");
keyOne.addEventListener('click', () => {
    console.log('key one is pressed');
    display.textContent = keyOne.textContent;
});

// for every key -> but we should't select clear, equals, del. 
const keys = document.querySelectorAll('.key');
keys.forEach((key) => key.addEventListener('click', () => {
    alert(`key is pressed`);
    console.log('key is pressed');
    display.textContent = key.textContent;
}));











/* check various stuff 
let resulting = operate(10, 5, "/");
console.log(typeof resulting);

// quick check
let display = document.querySelector('#result');
display.textContent = operate(132, 2342342, "+");
*/ 
