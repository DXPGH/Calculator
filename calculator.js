//JS Coded along with https://github.com/michalosman/calculator

//Set Variables
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

//Set DOM variables
const currentInput = document.querySelector(".currentInput");
const previousScreen = document.querySelector(".previousScreen");
const numButtons = document.querySelectorAll(".btn");
const opButtons = document.querySelectorAll(".operator");
const eraseBtn = document.querySelector("#erase");
const clearBtn = document.querySelector("#clear");
const evaluateBtn = document.querySelector("#evaluate");
const decimalBtn = document.querySelector(".decimal");

//Set Event Listeners for each button
evaluateBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
eraseBtn.addEventListener("click", deleteNumber);
decimalBtn.addEventListener("click", appendPoint);

numButtons.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.value));
});

opButtons.forEach((btn) => {
  btn.addEventListener("click", () => setOperation(btn.value));
});

//Function to Append a number and a button is clicked
function appendNumber(number) {
  if (currentInput.textContent === "0" || shouldResetScreen) resetScreen();
  currentInput.textContent += number;
}

//Reset screen incase their is new number after an operand has been added
function resetScreen() {
  currentInput.textContent = "";
  shouldResetScreen = false;
}

//Clears the values
function clear() {
  currentInput.textContent = "0";
  previousScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

//Append the decimal and checks if the currentInput already has a "." to inhibit double decimals ex: 12.412.412.31
function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentInput.textContent === "") currentInput.textContent = "0";
  if (currentInput.textContent.includes(".")) return;
  currentInput.textContent += ".";
}

//Deletes the last input of the string
function deleteNumber() {
  currentInput.textContent = currentInput.textContent.toString().slice(0, -1);
}

//Sets the operator and sets the resetScreen to true to clear the currentInput.textContent
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentInput.textContent;
  currentOperation = operator;
  previousScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

//Evaluates the operation calling upon the operate and roundResult function to display the answer and previous operation
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "/" && currentInput.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentInput.textContent;
  currentInput.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  previousScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

//Rounds the result to the thousandths
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

//Adds two operands
function add(a, b) {
  return a + b;
}

//Subtracts two operands
function subtract(a, b) {
  return a - b;
}

//Multiplies two operands
function multiply(a, b) {
  return a * b;
}

//Divides two operands
function divide(a, b) {
  return a / b;
}

//Sets the a, b operands to Numbers and filters the operator to return the correct function(a, b)
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

//Calculator using eval()

//Replace answerScreen to previousScreen

// const currentInput = document.querySelector(".currentInput");
// const answerScreen = document.querySelector(".answerScreen");
// const buttons = document.querySelectorAll("button");
// const eraseBtn = document.querySelector("#erase");
// const clearBtn = document.querySelector("#clear");
// const evaluate = document.querySelector("#evaluate");

// // Calculator Display
// let realTimeScreenValue = [];

// // To Clear
// clearBtn.addEventListener("click", () => {
//   realTimeScreenValue = [""];
//   answerScreen.innerHTML = 0;
// });

// // Get value of any button clicked and display to the screen

// buttons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     // when clicked button is not erased button
//     if (!btn.id.match("erase")) {
//       // To display value on btn press
//       realTimeScreenValue.push(btn.value);
//       currentInput.innerHTML = realTimeScreenValue.join("");

//       // To evaluate answer in real time
//       if (btn.classList.contains("btn")) {
//         answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
//       }
//     }

//     // When erase button is clicked
//     if (btn.id.match("erase")) {
//       realTimeScreenValue.pop();
//       currentInput.innerHTML = realTimeScreenValue.join("");
//       answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
//     }

//     // When clicked button is evaluate button
//     if (btn.id.match("evaluate")) {
//       currentInput.className = "answerScreen";
//       answerScreen.className = "currentInput";
//     }

//     // To prevent undefined error in screen
//     if (typeof eval(realTimeScreenValue.join("")) == "undefined") {
//       answerScreen.innerHTML = 0;
//     }
//   });
// });
