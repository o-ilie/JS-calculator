
class Calculator {
	constructor(prevDisplay, currentDisplay) {
		this.prevDisplay = prevDisplay;
		this.currentDisplay = currentDisplay;
		this.clear();
	}

	clear() {
		this.cDisplay = '';
		this.pDisplay = '';
		this.operation = undefined;
	}

	appendNumber(number) {
		if(number === '.' && this.cDisplay.includes('.')) return 0;
		this.cDisplay = this.cDisplay.toString() + number.toString();
	}

	chooseOperation(operation){
		if(this.cDisplay === '' ) return 0;
		if(this.pDisplay !== '') {
			this.compute();
		}
		this.operation = operation;
		this.pDisplay = this.cDisplay;
		this.cDisplay = '';
	}
	

	compute() {
		let computation;
		const prev = parseFloat(this.pDisplay);
		const current = parseFloat(this.cDisplay);

		if(this.operation === '+') {
			computation = prev + current;
		} else if(this.operation === '-') {
			computation = prev - current;
		} else if(this.operation === '*') {
			computation = prev * current;
		} else if(this.operation === '/') {
			computation = prev / current;
		} else if(this.operation === '%') {
			computation = prev/100 * current;
		} else if(this.operation === '^') {
			computation = Math.pow(prev,current);
		} else if(this.operation === '√') {
			computation = Math.sqrt(prev);
		} else {
			return 0;
		}
		
		this.cDisplay = computation;
		this.operation = prev + this.operation + current + '=' + computation;
		this.pDisplay = '';
		addToHistory(this.operation + "\n");
	}

	updateDisplay() {
		
		this.currentDisplay.innerText = this.cDisplay;
		if(this.operation != null) {
			this.prevDisplay.innerText = this.pDisplay + this.operation;
		} else {
			this.prevDisplay.innerText = '';
		}
	}
	
};


const keys = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equal]');
const clear = document.querySelector('[data-clear]');
const prevDisplay = document.querySelector('.prevDisplay');
const currentDisplay = document.querySelector('.currentDisplay');
const calculator = new Calculator(prevDisplay, currentDisplay);

keys.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operation.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});


equals.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

clear.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});


let history = '';
   
function addToHistory(value) {
	
    history += value;
    document.getElementById('history').innerText = history;
	
}