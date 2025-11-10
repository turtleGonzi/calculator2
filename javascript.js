let number1;
let number2;
let operator;
let zamekDispleye = true;

const operate = function (num1, num2, operator) {
  const add = function (num1, num2) {
    return num1 + num2;
  };

  const subtract = function (num1, num2) {
    return num1 - num2;
  };

  const multiply = function (num1, num2) {
    return num1 * num2;
  };

  const divide = function (num1, num2) {
    if (num2 === 0) {
      return "ERROR";
    }
    return num1 / num2;
  };

  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
  }
};

const buttonsNumber = document.querySelectorAll(".numbersBtns button");
const buttonZero = document.querySelector(".zero");
const functionBtns = document.querySelectorAll(".functionBtns button");
const equalBtn = document.querySelector(".equal");
const display = document.querySelector(".display");
const ac = document.querySelector(".clear");
const dotBtn = document.querySelector(".dot");
const back = document.querySelector(".back");

const clearDisplay = function () {
  display.textContent = "";
};

const btnNumberFunction = function (button) {
  if (display.textContent === "0" || zamekDispleye) {
    clearDisplay();
  }
  if (display.textContent.length <= 10 && button.className !== "zero") {
    display.textContent += +button.className;
    zamekDispleye = false;
  } else if (display.textContent.length <= 10 && button.className === "zero") {
    display.textContent += "0";
    zamekDispleye = false;
  }
};

const btnsFunctionFunction = function () {
  const operatorFunc = function (e) {
    if (!number1) {
      number1 = +display.textContent;
      clearDisplay();
      display.textContent = "0";
      operator = e.className;
    } else if (!number2) {
      number2 = +display.textContent;
      number1 = operate(number1, number2, operator);
      if (number1 === "ERROR") {
        display.textContent = number1;
        number1 = null;
        number2 = null;
        operator = null;
        zamekDispleye = true;
      } else {
        number1 = +number1;
        display.textContent = number1;
        number2 = null;
        operator = e.className;
        zamekDispleye = true;
      }
    }
  };

  for (let btn of functionBtns) {
    btn.addEventListener("click", (e) => {
      operatorFunc(btn);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === btn.className) {
        operatorFunc(btn);
      }
    });
  }

  const clear = function () {
    number1 = null;
    number2 = null;
    operator = null;
    zamekDispleye = true;
    display.textContent = "0";
  };

  ac.addEventListener("click", clear);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clear();
    }
  });

  const equal = function () {
    if (!number1 && !operator) {
    } else {
      number2 = +display.textContent;
      display.textContent = operate(number1, number2, operator);
      number1 = null;
      number2 = null;
      operator = null;
      zamekDispleye = true;
    }
  };

  equalBtn.addEventListener("click", equal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "=") {
      equal();
    }
  });

  dotBtnFunc = function () {
    if (display.textContent === "0") {
      display.textContent = "0.";
    } else if (display.textContent.includes(".")) {
    } else if (display.textContent.length <= 10) {
      display.textContent += ".";
      zamekDispleye = false;
    }
  };

  dotBtn.addEventListener("click", dotBtnFunc);
  window.addEventListener("keydown", (e) => {
    if (e.key === ".") {
      dotBtnFunc();
    }
  });

  backFunc = function () {
    if ((display.textContent.length = 1)) {
      display.textContent = "0";
    } else if (display.textContent.length) {
      display.textContent = display.textContent.slice(0, -1);
    }
  };

  back.addEventListener("click", backFunc);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      backFunc();
    }
  });
};

const btnClick = function () {
  for (let button of buttonsNumber) {
    button.addEventListener("click", (e) => {
      btnNumberFunction(button);
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === button.className) {
        btnNumberFunction(button);
      }
    });
  }
  buttonZero.addEventListener("click", (e) => {
    btnNumberFunction(buttonZero);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "0") {
      btnNumberFunction(buttonZero);
    }
  });
  btnsFunctionFunction();
};

btnClick();
