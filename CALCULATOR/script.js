const display = document.getElementById('displayField');
const buttonElements = document.querySelectorAll('.btn');

// Add click event to all buttons
buttonElements.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    processInput(action);
  });
});

// Handle button input
function processInput(key) {
  const ops = ['add', 'subtract', 'multiply', 'divide', 'percent'];
  let current = display.value;

  switch (key) {
    case 'clear':
      display.value = '';
      break;

    case 'delete':
      display.value = current.slice(0, -1);
      break;

    case 'equals':
      calculateResult();
      break;

    case 'decimal':
      if (!current.includes('.')) display.value += '.';
      break;

    case 'add':
      if (canAppendOperator(current)) display.value += '+';
      break;

    case 'subtract':
      if (canAppendOperator(current)) display.value += '-';
      break;

    case 'multiply':
      if (canAppendOperator(current)) display.value += '*';
      break;

    case 'divide':
      if (canAppendOperator(current)) display.value += '/';
      break;

    case 'percent':
      if (canAppendOperator(current)) display.value += '%';
      break;

    default:
      if (/\d/.test(key)) {
        display.value += key;
      }
      break;
  }
}

// Check if operator can be added
function canAppendOperator(str) {
  if (str.length === 0) return false;
  const lastChar = str.slice(-1);
  const operators = ['+', '-', '*', '/', '%'];
  return !operators.includes(lastChar);
}

// Evaluate the expression
function calculateResult() {
  try {
    const expr = display.value;
    if (expr === '') return;
    const result = Function('"use strict"; return (' + expr + ')')();
    display.value = Number.isFinite(result) ? +result.toFixed(6) : 'Err';
  } catch {
    display.value = 'Err';
  }
}
