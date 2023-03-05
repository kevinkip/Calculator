class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    percentize(){
        this.currentOperand = this.currentOperand / 100;
    }
    
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.operate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    operate() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const percent = document.querySelector('[data-percent]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

Array.from(numButtons).forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
      console.log(button)
    })
  })

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

percent.addEventListener('click', button => {
    calculator.percentize()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.operate()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// accept input from keyboard

document.addEventListener('keydown', action => {
    let numberPattern = /[0-9]/g;
    let operatorPattern = /[+\-*\/]/g;
    if (action.key.match(numberPattern)){
        action.preventDefault()
        calculator.appendNumber(action.key)
        calculator.updateDisplay()
    }
    if (action.key.match(operatorPattern)){
        action.preventDefault()
        calculator.chooseOperation(action.key)
        calculator.updateDisplay()
    }
    if(action.key === 'Enter' || action.key === '='){
        action.preventDefault()
        calculator.operate()
        calculator.updateDisplay()
    }
    if(action.key === "Backspace"){
        action.preventDefault()
        calculator.delete()
        calculator.updateDisplay()
    }
    if (action.key === 'Delete'){
        action.preventDefault()
        calculator.clear()
        calculator.updateDisplay()
    }
});