$(document).ready(function () {
    $(".numeric_buttons").click(on_click);
    $(".arithmetic_buttons").click(on_click);
    $(".clear_buttons").click(on_click);
    $(".equal_buttons").click(on_click);
    $(".decimal_buttons").click(on_click);
});
var button_storage_array = [];
var last_operator, last_number;

function on_click() {
    var button_clicked;
    var result;
    var last_index = button_storage_array.length - 1;
    var last_item = button_storage_array[last_index];
    button_clicked = {
        type: find_type($(this).text()),
        value: $(this).text()
    };
    if(button_storage_array.length === 0) {
        if(button_clicked.type === "equalSign") {
            $('.calculator_display').text("Ready");
        } else if(button_clicked.type === "number") {
            button_storage_array.push(button_clicked);
        }
    }
    else if (button_storage_array.length > 0) {
        if (button_clicked.type === "number" && last_item.type === "number"){
            if(last_item.value.indexOf(".") > -1 && button_clicked.value === "."){
                return;
            } else{
                last_item.value += button_clicked.value ;
            }
        }
        else if (button_clicked.type === "operator" && last_item.type === "operator"){
            last_item.value = button_clicked.value;
        }
        else if (button_clicked.type === "equalSign") {
            result = handle_equals(last_index, last_item);
        }
        else if (button_clicked.type === "clear") {
            button_storage_array.pop();
        }
        else {
            button_storage_array.push(button_clicked);
        }
    }
    speak_entry($(this).data("string"));
    handle_clear_or_equals(button_clicked.value, result);
}

function handle_equals(last_index, last_item){
    if (button_storage_array.length === 1 && last_operator !== undefined) {
        button_storage_array.push(last_operator);
        button_storage_array.push(last_number);
    }
    last_index = button_storage_array.length - 1;
   var result = calculate(button_storage_array);
    if (last_item.type === "operator") {
        last_operator = button_storage_array[last_index];
        handle_operator_then_equals(last_operator);
    }
    else {
        last_operator = button_storage_array[last_index - 1];
        last_number = button_storage_array[last_index];
    }
    var result_obj = {
        value: result + "",
        type:"number"
    };
    button_storage_array = [result_obj];
    return result;
}
function handle_operator_then_equals(last_operator){
    if (last_operator.value === "+" || last_operator.value === "-") {
        button_storage_array.pop();
        last_number = {
            value: calculate(button_storage_array),
            type: "number"
        };
    } else {
        last_number = button_storage_array[last_index - 1]
    }
}
function handle_clear_or_equals(button_clicked, result){
    if(button_clicked ==="CE"){
        button_storage_array=[];
        last_operator = undefined;
        last_number = undefined;
        display_result("");
    }else if(button_clicked === "="){
        speak_entry(result);
        display_result(result);
    }else {
        var display_string = "";
        for (var display_index = 0; display_index < button_storage_array.length; display_index++) {
            display_string += button_storage_array[display_index].value;
        }
        display_result(display_string);
    }
}
function display_result(display){
    $('.calculator_display').text(display);
}
function speak_entry(string){
    responsiveVoice.speak(string);
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
            }
            else if (current_value.value === "*" || current_value.value === "/") {
                handle_multiplication(front_number, current_value, i, array, addition_array);
            }
        }
        if (array.length === 1 || (i === array.length -1 && (array[i-1].value === "+" || array[i-1].value === "-"))) {
            addition_array.push(current_value);
        }
    }
    return process(addition_array);
}
function handle_multiplication(front_number, current_value, i, array, addition_array){
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
    };
    addition_array.push(new_multiplication_object);
}
function process(values_array) {
    var result = parseFloat(values_array[0].value);
    for (var j = 0; j < values_array.length; j++) {
        var current_value = values_array[j];
        if (current_value.type === "operator") {
            var back_number;
            if(j + 1 >= values_array.length){
                back_number = result;
            }else{
                back_number = parseFloat(values_array[j + 1].value)
            }
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
    return result + "";
}
