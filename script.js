document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('input[type="button"]');
    
    //FUNCTION TELLING WHAT IS C , DE AND =
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.value === 'C') {
                display.value = '';
            } else if (this.value === 'DE') {
                display.value = display.value.toString().slice(0, -1);
            } else if (this.value === '=') {
                display.value = evaluateExpression(display.value);
            } else {
                display.value += this.value;
            }
        });
    });

    //FUNCTION TO ALLOW KEYBOARD CONTROL
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const allowedKeys = /[0-9%\/*\-+\.=]|Backspace|Enter|Delete|Escape|\(|\)/;
        
        if (allowedKeys.test(key)) {
            event.preventDefault();
            if (key === 'Backspace') {
                display.value = display.value.slice(0, -1);
            } else if (key === 'Enter' || key === '=') {
                display.value = evaluateExpression(display.value);
            } else if (key === 'Escape') {
                display.value = '';
            } else {
                display.value += key;
            }
        }
    });

    //FUNCTION TO INCLUDE OPERATION WITH BOTH NEGATIVE AND POSITIVE VALUES
    function evaluateExpression(expression) {
        // Replace '×' and '÷' with '*' and '/'
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Handle negative and positive values
        expression = expression.replace(/(\d+)([\-+])(?=\d)/g, '$1 $2');

        // Evaluate expression
        try {
            return eval(expression);
        } catch (error) {
            return 'Error';
        }
    }
});
