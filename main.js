const add = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    if (operator === "+") {
        return sum = numOne + numTwo;
    }
    return sum;
}

console.log(add(1, 2, "+"))

const subtract = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    if (operator === "-") {
        return sum = numOne - numTwo;
    }
    return sum;
}

console.log(subtract(3, 3, "-"));

const multiply = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    if (operator === "*") {
        return sum = numOne * numTwo;
    }
    return sum;
}

console.log(multiply(2, 4, "*"));

const divide = (numOne, numTwo, operator) => {
    let sum = 0 || null;
    if (operator === "/") {
        return sum = numOne / numTwo;
    }
    return sum;
}

console.log(divide(6, 2, "/"));