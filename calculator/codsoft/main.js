document.addEventListener('DOMContentLoaded', () => {
	const keys = document.querySelectorAll('.key');
	const displayInput = document.querySelector('.display .input');
	const displayOutput = document.querySelector('.display .output');
  
	let input = "";
  
	for (let key of keys) {
	  const value = key.dataset.key;
  
	  key.addEventListener('click', () => {
		if (value === "clear") {
		  input = "";
		  displayInput.textContent = "";
		  displayOutput.textContent = "";
		} else if (value === "backspace") {
		  input = input.slice(0, -1);
		  displayInput.textContent = formatInput(input);
		} else if (value === "=") {
		  let result = eval(prepareInput(input));
		  displayOutput.textContent = formatOutput(result);
		} else if (value === "brackets") {
		  if (
			input.indexOf("(") === -1 ||
			(input.indexOf("(") !== -1 &&
			  input.indexOf(")") !== -1 &&
			  input.lastIndexOf("(") < input.lastIndexOf(")"))
		  ) {
			input += "(";
		  } else if (
			(input.indexOf("(") !== -1 && input.indexOf(")") === -1) ||
			(input.indexOf("(") !== -1 &&
			  input.indexOf(")") !== -1 &&
			  input.lastIndexOf("(") > input.lastIndexOf(")"))
		  ) {
			input += ")";
		  }
  
		  displayInput.textContent = formatInput(input);
		} else {
		  if (validateInput(value)) {
			input += value;
			displayInput.textContent = formatInput(input);
		  }
		}
	  });
	}
  
	function formatInput(input) {
	  // Replace operators with formatted symbols
	  let formattedInput = input.replace(/[*]/g, ' × ');
	  formattedInput = formattedInput.replace(/[+]/g, ' + ');
	  formattedInput = formattedInput.replace(/[-]/g, ' - ');
	  formattedInput = formattedInput.replace(/[/]/g, ' ÷ ');
  
	  return formattedInput;
	}
  
	function formatOutput(output) {
	  // Format the output with commas for thousands separators
	  return output.toLocaleString();
	}
  
	function validateInput(value) {
	  // Simple validation for the dot (.) to prevent consecutive dots
	  if (value === "." && input.endsWith(".")) {
		return false;
	  }
	  return true;
	}
  
	function prepareInput(input) {
	  // Replace percentage symbol with division by 100
	  let preparedInput = input.replace(/%/g, '/100');
	  return preparedInput;
	}
  });
  