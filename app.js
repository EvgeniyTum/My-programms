let input = document.getElementById('input');
let numbers = document.querySelectorAll('.number div');
let operators = document.querySelectorAll('.operator div');
let display = false;

for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener('click', function(e) {
		let intermediateInput = input.innerHTML;
		let lastSymbol = intermediateInput[intermediateInput.length - 1];

		if (display === false) {
			input.innerHTML += e.target.innerHTML;
		} else if (display === true && lastSymbol === '+' || lastSymbol === '-' || lastSymbol === '*' || lastSymbol === '/') {
			display = false;
			input.innerHTML += e.target.innerHTML;
		} else {
			display = false;
			input.innerHTML = '';
			screenWithResult.innerHTML = '';
			input.innerHTML += e.target.innerHTML;
		}
	});
}

for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener('click', function(e) {
		let intermediateInput = input.innerHTML;
		let lastSymbol = intermediateInput[intermediateInput.length - 1];

		if (lastSymbol === '+' || lastSymbol === '-' || lastSymbol === '*' || lastSymbol === '/') {
			 let newIntermediateInput = intermediateInput.substring(0, intermediateInput.length-1)+ e.target.innerHTML;
			 input.innerHTML = newIntermediateInput;
		} else if (intermediateInput === '') {
			alert('Enter a number!');
		} else {
			input.innerHTML += e.target.innerHTML;
		}
	});
}

result.addEventListener("click", function() {
	let intermediateInput = input.innerHTML;
	let arrayNumbers = intermediateInput.split(/\+|\-|\*|\//g);
	let arrayOperators = intermediateInput.replace(/[0-9]|\./g, '').split('');

	let divide = arrayOperators.indexOf('/');
	while (divide != -1) {
		arrayNumbers.splice(divide, 2, (arrayNumbers[divide] / arrayNumbers[divide + 1]));
		console.log(arrayNumbers);
		arrayOperators.splice(divide, 1);
		divide = arrayOperators.indexOf('/');
	}

	let multiply = arrayOperators.indexOf('*');
	while (multiply != -1) {
		arrayNumbers.splice(multiply, 2, (arrayNumbers[multiply] * arrayNumbers[multiply + 1]));
		console.log(arrayNumbers);
		arrayOperators.splice(multiply, 1);
		multiply = arrayOperators.indexOf('*');
	}

	let substraction = arrayOperators.indexOf('-');
	while (substraction != -1) {
		arrayNumbers.splice(substraction, 2, (arrayNumbers[substraction] - arrayNumbers[substraction + 1]));
		console.log(arrayNumbers);
		arrayOperators.splice(substraction, 1);
		substraction = arrayOperators.indexOf('-');
	}

	let addition = arrayOperators.indexOf('+')
	while (addition != -1) {
		arrayNumbers.splice(addition, 2, (parseFloat(arrayNumbers[addition]) + parseFloat(arrayNumbers[addition + 1])));
		console.log(arrayNumbers);
		arrayOperators.splice(addition, 1);
		addition = arrayOperators.indexOf('+');
	}
	console.log(arrayNumbers);
	screenWithResult.innerHTML = arrayNumbers[0];
	display = true;
})

clear.addEventListener("click", function() {
  input.innerHTML = '';
	screenWithResult.innerHTML = '';
});



