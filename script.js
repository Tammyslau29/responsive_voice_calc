$(document).ready(function () {
    $(".numeric_buttons").click(define_val);
    $(".arithmetic_buttons").click(define_val);
    $(".clear_buttons").click(define_val);
});
// var my_calculator = new calculator(basic_math);
// function basic_math(type, value, item) {
//     $(".calculator_display").text(value);
// };
var button_storage_array = [];
function define_val() {
    // var val = $(this).text();
    // my_calculator.addItem(val);
    var button_clicked = {
        type: find_type($(this).text()),
        value: $(this).text()
    }
    var last_index = button_storage_array.length-1;
    if (button_storage_array.length > 0 && button_clicked.type === "number" && button_storage_array[last_index].type ==="number" ){
     button_storage_array[last_index].value += button_clicked.value
    }else if (button_storage_array.length > 0 && button_clicked.type === "operator" && button_storage_array[last_index].type==="operator"){
        button_storage_array[last_index].type = button_clicked.type
    } else if(button_storage_array.length > 0 || button_clicked.type === "number"){
        button_storage_array.push(button_clicked)
    }
    console.log(button_storage_array)
    // calculate(button_storage_array);
}
function find_type(text){
    var type_of_text;
    switch (text) {
        case "1":
            type_of_text = "number";
            break;
        case "2":
            type_of_text = "number";
            break;
        case "3":
            type_of_text = "number";
            break;
        case "4":
            type_of_text = "number";
            break;
        case "5":
            type_of_text = "number";
            break;
        case "6":
            type_of_text = "number";
            break;
        case "7":
            type_of_text = "number";
            break;
        case "8":
            type_of_text = "number";
            break;
        case "9":
            type_of_text = "number";
            break;
        case "0":
            type_of_text = "number";
            break;
        case "+":
            type_of_text = "operator";
            break;
        case "-":
            type_of_text = "operator";
            break;
        case "/":
            type_of_text = "operator";
            break;
        case "x":
            type_of_text = "operator";
            break;
        case "=":
            type_of_text = "equalSign";
            break;
    }
    return type_of_text
}
function calculate(array){
    var addition_array=[];
    for (var i = 0; i < array.length; i++) {
        var current_value = array[i];
        if (current_value.type === "operator"){
            var front_number = array[i-1];
            var back_number = array[i+1];
            if (current_value.type === "+" || current_value.type === "-"){
                addition_array.push(current_value, front_number)
            } else if (current_value.type === "*" || current_value.type === "/") {
                var multiplication_array = [];
                multiplication_array.push(front_number);
                var multiply_loop_current_value = current_value;
                while (multiply_loop_current_value.type !== "-" || multiply_loop_current_value.type !== "+") {
                    multiplication_array.push(multiply_loop_current_value);
                    i++;
                    multiply_loop_current_value = array[i];
                }

            }
        }
    }
}

function process_multiply(multiplication_array) {
    var result = multiplication_array[0].value;
    for (var j = 0; j < multiplication_array.length; j++) {
        var current_value = multiplication_array[j];
        if(current_value.type === "operator"){
            var back_number = multiplication_array[j + 1].value;
            switch (current_value) {
                case "*":
                    result *= back_number;
                case "/":
                    result /= back_number;
            }
        }

    }
    return result;
}