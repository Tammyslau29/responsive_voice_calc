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
    };
    var last_index = button_storage_array.length - 1;
    if (button_storage_array.length > 0 && button_clicked.type === "number" && button_storage_array[last_index].type === "number"){
        button_storage_array[last_index].value += button_clicked.value;
        console.log(button_storage_array)
    } else if (button_storage_array.length > 0 && button_clicked.type === "operator" && button_storage_array[last_index].type === "operator") {
        button_storage_array[last_index].value = button_clicked.value;
        console.log(button_storage_array)
    } else if (button_storage_array.length > 0 && button_clicked.type === "equalSign") {
        var calculate_result = calculate(button_storage_array);
    } else if (button_storage_array.length > 0 && button_clicked.type === "clear"){
        button_storage_array.pop();
    } else if(button_storage_array.length > 0 || button_clicked.type === "number"){
        if(button_clicked.type === "number" && button_clicked.value !== "."){
            button_clicked.value = parseFloat(button_clicked.value);
        }
        button_storage_array.push(button_clicked);
        console.log(button_storage_array)
    }
    for(var display_index = 0; display_index < button_storage_array.length; display_index++){
        if(button_clicked.value ==="CE"){
            $('.calculator_display').text("");
            button_storage_array=[];
        }else if(button_clicked.type === "equalSign"){
            $('.calculator_display').text(calculate_result);
        }else {
            $('.calculator_display').text(button_storage_array[display_index].value);
        }
    }
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
        case ".":
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
        case "*":
            type_of_text = "operator";
            break;
        case "=":
            type_of_text = "equalSign";
            break;
        case "CE":
            type_of_text = "clearEverything";
            break;
        case "C":
            type_of_text = "clear";
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
            if (current_value.value === "+" || current_value.value === "-"){
                addition_array.push(front_number, current_value)
            } else if (current_value.value === "*" || current_value.value === "/") {
                var multiplication_array = [];
                multiplication_array.push(front_number);
                var multiply_loop_current_value = current_value;
                while (multiply_loop_current_value.value !== "-" || multiply_loop_current_value.value !== "+") {
                    multiplication_array.push(multiply_loop_current_value);
                    i++;
                    multiply_loop_current_value = array[i];
                    if (i > array.length-1){
                        break;
                    }
                }
                var multiplication_result = process(multiplication_array);
                var new_multiplication_object = {
                    type: "number",
                    value: multiplication_result
                }
                addition_array.push(new_multiplication_object);
                if(array[i] !== undefined){
                    addition_array.push(array[i])
                }
            }
        }
        if (i === array.length -1 && (array[i-1].value === "+" || array[i-1].value === "-")) {
            addition_array.push(current_value);
        }
    }
    return process(addition_array);
}
function process(values_array) {
    var result = parseFloat(values_array[0].value);
    for (var j = 0; j < values_array.length; j++) {
        var current_value = values_array[j];
        if(current_value.type === "operator"){
            var back_number = parseFloat(values_array[j + 1].value);
            switch (current_value.value) {
                case "*":
                    result *= back_number;
                    break;
                case "/":
                    result /= back_number;
                    break;
                case "+":
                    result += back_number;
                    break;
                case "-":
                    result -= back_number;
                    break;
            }
        }
    }
    return result.toFixed(4);
}
