let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const currentInput = document.querySelector(".currentInput");
const answerScreen = document.querySelector(".answerScreen");
const numButtons = document.querySelectorAll(".btn");
const opButtons = document.querySelectorAll(".operator");
const eraseBtn = document.querySelector("#erase");
const clearBtn = document.querySelector("#clear");
const evaluateBtn = document.querySelector("#evaluate");
const decimalBtn = document.querySelector(".decimal");

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

function appendNumber(number) {
  if (currentInput.textContent === "0" || shouldResetScreen) resetScreen();
  currentInput.textContent += number;
}

function resetScreen() {
  currentInput.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentInput.textContent = "0";
  answerScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentInput.textContent === "") currentInput.textContent = "0";
  if (currentInput.textContent.includes(".")) return;
  currentInput.textContent += ".";
}

function deleteNumber() {
  currentInput.textContent = currentInput.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentInput.textContent;
    currentOperation = operator;
    answerScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "/" && currentInput.textContent === "0") {
      alert("You can't divide by 0!");
      return;
    }
    secondOperand = currentInput.textContent;
    currentInput.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    answerScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

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