let historyDisplay = document.getElementById("history");
let currentDisplay = document.getElementById("current");
let currentInput = "";
let history = "";

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number.toString();
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "" && history === "") return;
  if (currentInput === "") {
    history = history.slice(0, -1) + operator;
  } else {
    history += currentInput + operator;
    currentInput = "";
  }
  updateDisplay();
}

function clearDisplay() {
  history = "";
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  if (currentInput === "") return;
  try {
    history += currentInput;
    const result = eval(history);
    currentInput = result.toString();
    history = "";
  } catch {
    currentInput = "Error";
    history = "";
  }
  updateDisplay();
}

function updateDisplay() {
  historyDisplay.innerText = history;
  currentDisplay.innerText = currentInput || "0";
}
