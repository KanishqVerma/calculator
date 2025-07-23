function operate(a, operation, b){
    switch(operation){
        case '+': 
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default: return null;

    }
}

function allClear(){
    num1 = "";
    num2 = "";
    operation = "";
    result = "";
    operationFlag = false;
    num1Flag = false;
    num2Flag = false; 
    equalFlag = false;
}

function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b){
    return parseFloat(a) / parseFloat(b);
}

function updateDisplay(){
    if (num1.length > 10 || num2.length > 10 || result.length > 24){
        display.textContent = "ERROR | MAX LENGTH REACHED";
        allClear();
        return;
    }
    if (equalFlag){
        display.textContent = result;
    } else if (!num1 && !operation && !num2){
        display.textContent = "0";
    } else{
        display.textContent = `${num1} ${operation} ${num2}`;
    }
}


// Accessing display
const display = document.querySelector(".calculation");

// Accessing node list of buttons
const buttons = document.querySelectorAll("button");

// Declaring empty strings
let num1 = "";
let num2 = "";
let operation = "";
let result = "";

// Declaring flags
let num1Flag = false;
let num2Flag = false;
let operationFlag = false;
let equalFlag = false;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Add to number 1
        if ((btn.textContent == '1' || btn.textContent == '2' || btn.textContent == '3' || btn.textContent == '4' || btn.textContent == '5' || btn.textContent == '6' || btn.textContent == '7' || btn.textContent == '8' || btn.textContent == '9' || btn.textContent == '0') && operationFlag == false){
            num1 += btn.textContent;
            updateDisplay();   
        }
        // Take operation
        if (btn.textContent == '+' || btn.textContent == '-' || btn.textContent == 'x' || btn.textContent == '/'){
            operation = btn.textContent;
            operationFlag = true;
            equalFlag = false;
            updateDisplay();
        }
        // Append to number2
        if ((btn.textContent == '1' || btn.textContent == '2' || btn.textContent == '3' || btn.textContent == '4' || btn.textContent == '5' || btn.textContent == '6' || btn.textContent == '7' || btn.textContent == '8' || btn.textContent == '9' || btn.textContent == '0') && operationFlag == true){
            num2 += btn.textContent;
            updateDisplay();
        }

        if (btn.textContent == '='){
            equalFlag = true;
            result = operate(num1, operation, num2);
            if (isNaN(result)){
                display.textContent = "ERROR";
                allClear();
                return;
            }
            
            num1 = result.toString();
            operation = "";
            operationFlag = false;
            num2 = "";
            updateDisplay();
        }

        // All clear button
        if (btn.textContent == "AC"){
            allClear();
            updateDisplay();
        }

        // Change sign of number
        if (btn.textContent == "+/-"){
            if (!operationFlag && num1){
                num1 = (parseFloat(num1) * -1).toString();
                updateDisplay();
            }
            if (operationFlag && num2){
                num2 = (parseFloat(num2) * -1).toString();
                updateDisplay();
            }
            if (equalFlag){
                result = (parseFloat(result) * -1).toString();
                updateDisplay();
            }
        }

        // Delete the last digit
        if (btn.id == "delete"){
            if (num1){
                num1 = num1.slice(0, -1);
            }
            else if (operation){
                operation = "";
                operationFlag = false;
            } else if (num2){
                num2 = num2.slice(0, -1);
            }
            updateDisplay();
        }

        if (btn.textContent == '.'){
            if (equalFlag && !operationFlag){
                allClear();
                num1 = '0.';
                updateDisplay();
                return;
            }
            // add the . if it doesnt already exist
            if (!operationFlag){
                if(!num1.includes('.')){
                    if (num1){
                        num1 += ".";
                    } else{
                        num1 = "0.";
                    }
                    updateDisplay();
                } 
            }
            else{
                if (!num2.includes('.')){
                    if (num2){
                        num2 += ".";
                    } else {
                        num2 = "0.";    
                    }
                }
                updateDisplay();
            }
        }

        if (btn.textContent == "%"){
            if (!operationFlag && num1){
                num1 = (parseFloat(num1) / 100).toString();
                updateDisplay();
            } else if (operationFlag && num2){
                num2 = (parseFloat(num2) / 100).toString();
                updateDisplay();
            } else if (equalFlag && result){
                result = (parseFloat(result) / 100).toString();
                updateDisplay();
            }
        }
    })
})



// buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//         if (btn.textContent == '='){
//             let result = operate(num1, operation, num2);
//             updateDisplay(num1, num2, result);
//             operationFlag = false;
//         }

//         if (btn.textContent == "AC"){
//             num1 = "";
//             num2 = "";
//             operation = "";
//             operationFlag = false;
//             num1Flag = false;
//             num2Flag = false; 
//             clearFlag = false;
//             updateDisplay();
//         }

//         if ((btn.textContent == '1' || btn.textContent == '2' || btn.textContent == '3' || btn.textContent == '4' || btn.textContent == '5' || btn.textContent == '6' || btn.textContent == '7' || btn.textContent == '8' || btn.textContent == '9' || btn.textContent == '0') && operationFlag == false){
//             num1 += btn.textContent;
//             updateDisplay();
//         }
//         if (btn.textContent == '+' || btn.textContent == '-' || btn.textContent == 'x' || btn.textContent == '/'){
//             operation = btn.textContent;
//             operationFlag = true;
//             updateDisplay();
//         }
//         if ((operationFlag == true) && (btn.textContent == '1' || btn.textContent == '2' || btn.textContent == '3' || btn.textContent == '4' || btn.textContent == '5' || btn.textContent == '6' || btn.textContent == '7' || btn.textContent == '8' || btn.textContent == '9' || btn.textContent == '0')){
//             num2 += btn.textContent;
//             updateDisplay();
//         }
//     })
// })



// function updateDisplay(num1, num2, result){
//     if (result.toString().length > 10){
//         display.textContent = "ERROR, MAX LENGTH = 10";
//         return;
//     }
//     if (num1 == "" && num2 == ""){
//         display.textContent = '0';
//         return;
//     }
//     display.textContent = num1 + " " + operation + " " + num2;
// }







// while numbers being clicked and operation flag ! triggered,
// keep appending to num1
// when operation clicked, operation flag true
// operation = operation clicked
// now, any other number clicked will be num2
// when = pressed, calculate the expression
// replace the expression on display with the resulting expression


// all clear clears the expression completely, num1, num2, operation is replaced as empty string. resets all flags.
// +/- changes the sign of the number on the screen. inserts a (- or +) at the first spot
// delete deletes the number at last value
// . puts a . at the end of the number
// % stores the x% of the number in another variable